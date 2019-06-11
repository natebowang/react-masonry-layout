// getFirstLabelByInnerHTMLPattern will get this element
// if the pattern is /Window Inner Width: */
// <label>
//    {'Window Inner Width: '}
//    <span>{wiw.toString()}</span>
// </label>
export default (pattern) => {
    return Array.from(document.querySelectorAll('label')).find(el => pattern.test(el.innerHTML));
};
