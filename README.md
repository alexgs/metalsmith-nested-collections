# Nested Collections

**Nested Collections** is a drop-in replacement for the ["Metalsmith Collections" plugin][1]. This means you can start using it today without any changes to your build process!

It's as easy as

```javascript
let collections = require( 'metalsmith-nested-collections' );
```

[1]: https://github.com/segmentio/metalsmith-collections

## Links by Collection

Let's say your collections are configured like this:

```javascript
const collections = {
    posts: {
        pattern: 'posts/**/*.md',
        sortBy: 'date',
        reverse: true
    },
    'metalsmith-tutorial': {
        pattern: 'posts/metalsmith-tutorial/*.md',
        sortBy: 'date',
        reverse: true
    },
    'shocking-secret': {
        pattern: 'posts/shocking-secret/*.md',
        sortBy: 'date',
        reverse: true
    }
};
```

Depending on the date order of the files in each collection, "Metalsmith Collections" may not link correctly between them. Moreover, you might want to provide links between each article in a series, while also having links between posts in pure chronological order.

**Nested Collections** adds new metadata fields to each file, `prevInCollection` and `nextInCollection`, that provide objects keyed to each collection that an file is in.

For example, the file at `posts/metalsmith-tutorial/part-2.md` is in both the "posts" collection and the "metalsmith-tutorial" collection. Its `prevInCollection` property looks like this:

```javascript
"prevInCollection": {
    "metalsmith-tutorial": { /* "Metalsmith Tutorial, Part 3" */ },
    "posts": { /* Lorem Ipsum */ }
}
```

For examples, take a look at the tests or [my example Metalsmith site][2].

[2]: https://github.com/philgs/metalsmith-example-site

## License

Copyright (c) 2017 Phil Gates-Shannon

<i>3-Clause BSD License</i>

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
