// choose policy
export default (request, cacheVersion) => {
    let pathname = new URL(request.url).pathname;
    switch (true) {
        case ['/sw.js'].includes(pathname):
            return networkOnly(request);
        case ['/', '/pwa-manifest.json'].includes(pathname):
            return networkFirst(request, cacheVersion);
        case /^\/search\//.test(pathname):
            return networkFirst(request, cacheVersion);
        case /^\/immutable\//.test(pathname):
            return cacheFirst(request, cacheVersion);
        case /^\/entity\//.test(pathname):
            return cacheFetchRaceFinallyRenew(request, cacheVersion);
        default:
            return networkFirst(request, cacheVersion);
    }
};

// example: /sw.js
// cache-control: no-cache, no-store, max-age=0, must-revalidate
export const networkOnly = (request) => {
    return fetch(request)
    // If failed to fetch, reject promise.
        .catch(fetchError => {
            console.error(`Policy networkOnly failed. (${fetchError} for ${request.url}).`);
        });
};

// example: / /pwa-manifest.json /search/*
// cache-control: no-cache, no-store, max-age=0, must-revalidate
export const networkFirst = (request, cacheVersion) => {
    // 1. fetch request first
    return fetch(request)
    // 2. if 200, put to cache. if not 200, try to delete cache.
        .then(putIf200DeleteIfNot200(cacheVersion)(request))
        .catch(fetchError => {
            console.warn(`${fetchError} for ${request.url}. Try offline page instead.`);
            return caches.open(cacheVersion)
            // 3. if failed to fetch, use cached assets
                .then(cache => cache.match(request))
                .then(cachedResp => {
                    if (cachedResp !== undefined) {
                        return cachedResp;
                    } else {
                        // 4. if no cache(undefined), error log.
                        console.error(`Policy networkFirst failed. (${fetchError} for ${request.url}). And not cached.`);
                    }
                })
        });
};

// example: /immutable/*
// Cache-Control: public, max-age=31536000, immutable
export const cacheFirst = (request, cacheVersion) => {
    // 1. search cache first
    return caches.open(cacheVersion)
        .then(cache => cache.match(request))
        .then(cachedResp => {
            if (cachedResp !== undefined) {
                // 2. if found, return cache.
                return cachedResp;
            } else {
                // 3. If NOT cached(undefined), fetch request.
                return fetch(request)
                // 4. If 200, return response and put to cache. If not 200 try to delete cache.
                    .then(putIf200DeleteIfNot200(cacheVersion)(request))
                    // 5. If failed to fetch, error log.
                    .catch(fetchError => {
                        console.error(`Policy cacheFirst failed. Not cached. And (${fetchError} for ${request.url}).`);
                    })
            }
        })
};

// example: /api/* /entity/*
// Cache-Control: public, max-age=3600, must-revalidate
export const cacheFetchRaceFinallyRenew = (request, cacheVersion) => {
    let fetchedResp = fetch(request)
    // 2. If fetched response is 200, update cache.
        .then(putIf200DeleteIfNot200(cacheVersion)(request))
        // 3. If fetched response is not 200, try to delete cache.
        .catch(fetchError => {
            console.warn(`Policy cacheFetchRaceFinallyRenew warn: ${fetchError} for ${request.url}.`);
        });

    // 1. Return cached or fetched response which is faster(probably cached).
    return caches.open(cacheVersion)
        .then(cache => cache.match(request))
        .then(cachedResp => {
            if (cachedResp !== undefined) {
                return cachedResp;
            } else {
                console.debug('Policy cacheFetchRaceFinallyRenew warn: Not cached.');
                return fetchedResp;
            }
        });
};

const putIf200DeleteIfNot200 = cacheVersion => request => response => {
    if (response.status === 200) {
        console.debug(`Put 200 response: ${request.url}`);
        return caches.open(cacheVersion)
            .then(cache => {
                cache.put(request, response.clone());
                return response;
            });
    } else {
        console.debug(`Delete non 200 response: ${response.status} for ${request.url}`);
        return caches.open(cacheVersion)
            .then(cache => {
                cache.delete(request);
                return response;
            });
    }
};
