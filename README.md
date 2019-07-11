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
                    +-------------------------------------------------------------------+
                    |                                       +-------------------------+ |
                    |                                       |                         | |
                    |    Main                               |   view                  | |
                    |                                       |                         | |
+---------------+   |   +---------+       dispatch          | +--------------------+  | |
| serviceWorker +<----->+ reducer +<------------------------+ | ItemsUpdateHandler |  | |
+---------------+   |   +----+----+                         | +--------------------+  | |
                             |                              |                         | |
   Move time        |        |                              | +---------------------+ | |
   consuming        |        |                              | | WindowResizeHandler | | |
   tasks to         |        |      React.useContext        | +---------------------+ | |
   serviceWorker    |        |      asynchronously updates  |                         | |
                    |        |      functional components   | +------------------+    | |
                    |        |      because it has to       | |   MasonryTable   |    | |
                    |        |      preserve CPU time       | | +--------------+ |    | |
                    |        v      for 16.7ms pressure     | | |itemApiAdaptor| |    | |
                    |    +---+---+  tasks like animation    | | |.renderItem   | |    | |
                    |    | store +------------------------->+ | +--------------+ |    | |
                    |    +-------+                          | +------------------+    | |
                    |                                       |                         | |
                    |                                       +-------------------------+ |
                    +-------------------------------------------------------------------+
```
