# Introduction #
In the extension many of  the user visible tasks are handled by filters that insert visible white spaces, line numbers, and do a lot of other stuff. They often depends on each other works, so they should be called in strict order. On the other hand there should be as less traversal of the parsed tree as possible. In the last versions of extension each filter had integer priority and basically each of them used to go through a tree by itself which resulted in many unnecessary loops and calculations. That's why automatic dependence resolving system got done.

# Implementation #
Filters could be attach listener to few key points of the tree and will be called when tree traversal got to this exactly key point. Key points are file, chunk-pair (pair of old and new chunks), chunk, line. On the other hand listener should be called only after all the listeners in depends on got called already.

So at first we are building dependencies graph.
```
  1f   2l   3c    4cp    8c
  |    |           |
  \    /           5l
    6c
    |
    7l
```
Each filter has type, which shows at what stage of parsing it should be called. On the picture: f - file, l - line, cp - chunk pair, c - chunk.
That graph is easy to build but really hard to use when parsing. SO we should convert it to something else.

```
  files      chunk pairs   chunks   lines
    1            4           3,8      2
                             6        7
```

In those graph every horizontal line means one tree traversal. Of course in case of graph above there are no need to do second traversal for the whole tree, it is enough to just proceed chunks for every file twice.

So how do we convert one graph to another?
Algorithm is rather easy.
```
   get the first type
   for each node of that type from first line of the first graph
     write them as first horizontal line in the correct type section to the second graph
     insert all the children that doesn't have any other parents to the end of the line
     delete node from the line
   do the same for the next type
   start the next horizontal line and do everything again
```

For the working implementation of the above algorithm see the file composite-init.js in the extension source code.