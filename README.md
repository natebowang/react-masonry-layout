I use an item with only title and content in this example. 
If you want to render something else, you need to replace all code under itemApiAdaptor.


# Some Definition
| store  | MasonryTable |
|:------:|:------------:|
| matrix | Table        |
| vector | Column       |
| item   | Cell         |

# Code Structure
```
                    +------------------------------------------------------+
                    |                          +-------------------------+ |
                    |                          |                         | |
                    |    Main                  |   view                  | |
                    |                          |                         | |
+---------------+   |   +---------+  dispatch  | +--------------------+  | |
| serviceWorker +<----->+ reducer +<-----------+ | ItemsUpdateHandler |  | |
+---------------+   |   +----+----+            | +--------------------+  | |
                    |        |                 |                         | |
                    |        |                 | +---------------------+ | |
                    |        |                 | | WindowResizeHandler | | |
                    |        |                 | +---------------------+ | |
                    |        |                 |                         | |
                    |        |                 | +------------------+    | |
                    |        |                 | |   MasonryTable   |    | |
                    |        |                 | | +--------------+ |    | |
                    |        v                 | | |itemApiAdaptor| |    | |
                    |    +---+---+             | | |.renderItem   | |    | |
                    |    | store +------------>+ | +--------------+ |    | |
                    |    +-------+             | +------------------+    | |
                    |                          |                         | |
                    |                          +-------------------------+ |
                    +------------------------------------------------------+
```
