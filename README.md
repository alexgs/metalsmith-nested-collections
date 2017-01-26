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

The content of this repository is licensed under the [3-Clause BSD license][4]. Please see the enclosed [license file][5] for specific terms.

[4]: https://opensource.org/licenses/BSD-3-Clause
[5]: https://github.com/philgs/metalsmith-nested-collections/blob/master/LICENSE.md
