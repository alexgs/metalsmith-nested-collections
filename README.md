# Nested Collections

**Nested Collections** is a drop-in replacement for the ["Metalsmith Collections" plugin][1]. This means you can start using it today without any changes to your build process!

It's as easy as

```javascript
let collections = require( 'metalsmith-nested-collections' );
```

It doesn't do anything fancy at the moment ([v0.1.0][2]), but new features and functionality are coming fast!

[1]: https://github.com/segmentio/metalsmith-collections
[2]: https://github.com/philgs/metalsmith-nested-collections/releases/tag/v0.1.0

## Planned Features

**Nested Collections** will allow you to add files to multiple collections and have next/previous links for each collection.

**Nested Collections** will also add namespaces for collections, making it easier to manage multiple sites from a single repository and build file. This might be useful, for example, if you want to have one site point to the most recent posts on another site.

## License

Copyright (c) 2017 Phil Gates-Shannon

<i>3-Clause BSD License</i>

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
