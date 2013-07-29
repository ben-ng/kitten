# Kitten

#### Export Octopress blog posts as JSON

[![Pusheen](https://gs1.wac.edgecastcdn.net/8019B6/data.tumblr.com/tumblr_m5mlt6a0EH1qhy6c9o1_400.gif)](http://pusheen.com)

[![Build Status](https://travis-ci.org/ben-ng/kitten-js.png)](https://travis-ci.org/ben-ng/kitten-js)

## Usage

```
var kitten = require('kitten');

kitten.load('folder/path', cb);

/*
 * {
 * 'post.md': {
 *   title: 'My Blog Post'
 * , layout: 'post'
 * , date: 2112-04-09 23:26
 * , comments: true
 * , categories: [
 *     'Music'
 *   , 'Turtles'
 *   ]
 * }
 *
 */

kitten.load('path/to/post.md', cb);

/*
 * {
 *   title: 'My Blog Post'
 * , layout: 'post'
 * , date: 2112-04-09 23:26
 * , comments: true
 * , categories: [
 *     'Music'
 *   , 'Turtles'
 *   ]
 * }
 */

```

## License

The MIT License (MIT)

Copyright (c) 2013 Ben Ng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
