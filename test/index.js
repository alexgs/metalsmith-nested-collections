let assert = require( 'assert' );
let collections = require( 'metalsmith-collections' );
let chai = require( 'chai' );
let dirtyChai = require( 'dirty-chai' );
let fs = require( 'fs' );
let Metalsmith = require( 'metalsmith' );
let path = require( 'path' );
let rimraf = require( 'rimraf' );

chai.use( dirtyChai );
let expect = chai.expect;

describe( 'metalsmith-nested-collections', function() {

    context( 'does not affect the behavior of `metalsmith-collections`, which', function() {
        const fixturePath = 'test/collection-fixtures';

        before( function( done ) {
            rimraf( fixturePath + '/*/build', done );
        } );

        it( 'should add collections to metadata', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/basic' );
            metalsmith
                .use( collections( { articles: {} } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let m = metalsmith.metadata();
                    assert.equal( 2, m.articles.length );
                    assert.equal( m.collections.articles, m.articles );
                    done();
                } );
        } );

        it( 'should match collections by pattern', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/pattern' );
            metalsmith
                .use( collections( {
                    articles: {
                        pattern: '*.md'
                    }
                } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    assert.equal( 4, metalsmith.metadata().articles.length );
                    done();
                } );
        } );

        it( 'should take a pattern shorthand string', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/pattern' );
            metalsmith
                .use( collections( {
                    articles: '*.md'
                } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    assert.equal( 4, metalsmith.metadata().articles.length );
                    done();
                } );
        } );

        it( 'should take an array of patterns', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/pattern' );
            metalsmith
                .use( collections( {
                    blogs: [ '*.md', '!one.md', '!two.md', '!four.md' ],
                    pages: { pattern: [ 'four.md' ] }
                } ) )
                .build( function( err, files ) {
                    if ( err ) return done( err );
                    assert.equal( 1, metalsmith.metadata().blogs.length, 'length blogs' );
                    assert.equal( 1, metalsmith.metadata().pages.length, 'length page' );
                    assert.equal( files[ 'three.md' ].collection, 'blogs', 'collection blogs' );
                    assert.equal( files[ 'four.md' ].collection, 'pages', 'collection page' );
                    done();
                } );
        } );

        it( 'should add the collection property to a file', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/pattern' );
            metalsmith
                .use( collections( {
                    articles: '*.md'
                } ) )
                .build( function( err, files ) {
                    if ( err ) return done( err );
                    assert.equal( files[ 'three.md' ].collection, 'articles' );
                    done();
                } );
        } );

        it( 'should accept a "sortBy" option', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/sort' );
            metalsmith
                .use( collections( { articles: { sortBy: 'title' } } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let articles = metalsmith.metadata().articles;
                    assert.equal( 'Alpha', articles[ 0 ].title );
                    assert.equal( 'Beta', articles[ 1 ].title );
                    assert.equal( 'Gamma', articles[ 2 ].title );
                    done();
                } );
        } );

        it( 'should accept a "sortBy" function', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/sort' );
            metalsmith
                .use( collections( { articles: { sortBy: sort } } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let articles = metalsmith.metadata().articles;
                    assert.equal( 'Gamma', articles[ 0 ].title );
                    assert.equal( 'Beta', articles[ 1 ].title );
                    assert.equal( 'Alpha', articles[ 2 ].title );
                    done();
                } );

            function sort( a, b ) {
                a = a.title.slice( 1 );
                b = b.title.slice( 1 );
                return a > b ? 1 : -1;
            }
        } );

        it( 'should accept a "reverse" option', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/sort' );
            metalsmith
                .use( collections( {
                    articles: {
                        sortBy: 'title',
                        reverse: true
                    }
                } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let articles = metalsmith.metadata().articles;
                    assert.equal( 'Alpha', articles[ 2 ].title );
                    assert.equal( 'Beta', articles[ 1 ].title );
                    assert.equal( 'Gamma', articles[ 0 ].title );
                    done();
                } );
        } );

        it( 'should accept a "limit" option', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/limit' ),
                limit = 2;
            metalsmith
                .use( collections( {
                    articles: {
                        limit: limit,
                        sortBy: 'title'
                    }
                } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let articles = metalsmith.metadata().articles;
                    assert.equal( limit, articles.length );
                    assert.equal( 'Alpha', articles[ 0 ].title );
                    assert.equal( 'Beta', articles[ 1 ].title );
                    done();
                } );
        } );

        it( 'should accept a "limit" higher than the collection length', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/limit' );
            metalsmith
                .use( collections( {
                    articles: {
                        sortBy: 'title',
                        limit: 25
                    }
                } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let articles = metalsmith.metadata().articles;
                    assert.equal( 3, articles.length );
                    assert.equal( 'Alpha', articles[ 0 ].title );
                    assert.equal( 'Beta', articles[ 1 ].title );
                    assert.equal( 'Gamma', articles[ 2 ].title );
                    done();
                } );
        } );

        it( 'should add next and previous references', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/references' );
            metalsmith
                .use( collections( { articles: {} } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let articles = metalsmith.metadata().articles;
                    assert( !articles[ 0 ].previous );
                    assert.equal( articles[ 0 ].next, articles[ 1 ] );
                    assert.equal( articles[ 1 ].previous, articles[ 0 ] );
                    assert.equal( articles[ 1 ].next, articles[ 2 ] );
                    debugger;
                    assert.equal( articles[ 2 ].previous, articles[ 1 ] );
                    assert( !articles[ 2 ].next );
                    done();
                } );
        } );

        it( 'should not add references if opts[key].refer === false', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/references-off' );
            metalsmith
                .use( collections( { articles: { refer: false } } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let articles = metalsmith.metadata().articles;
                    assert( !articles[ 0 ].previous );
                    assert( !articles[ 0 ].next );
                    assert( !articles[ 1 ].previous );
                    assert( !articles[ 1 ].next );
                    assert( !articles[ 2 ].previous );
                    assert( !articles[ 2 ].next );
                    done();
                } );
        } );

        it( 'should not fail with empty collections', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/empty' );
            metalsmith
                .use( collections( {
                    articles: {
                        sortBy: 'date',
                        reverse: true
                    }
                } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let articles = metalsmith.metadata().articles;
                    assert.equal( articles.length, 0 );
                    done();
                } );
        } );

        it( 'should add metadata objects to collections', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/basic' );
            metalsmith
                .use( collections( {
                    articles: {
                        metadata: { name: 'Batman' }
                    }
                } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let m = metalsmith.metadata();
                    assert.equal( 'Batman', m.articles.metadata.name );
                    done();
                } );
        } );

        it( 'should load collection metadata from a JSON file', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/basic' );
            metalsmith
                .use( collections( {
                    articles: {
                        metadata: fixturePath + '/metadata/metadata.json'
                    }
                } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let m = metalsmith.metadata();
                    assert.equal( 'Batman', m.articles.metadata.name );
                    done();
                } );
        } );

        it( 'should load collection metadata from a YAML file', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/basic' );
            metalsmith
                .use( collections( {
                    articles: {
                        metadata: fixturePath + '/metadata/metadata.yaml'
                    }
                } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let m = metalsmith.metadata();
                    assert.equal( 'Batman', m.articles.metadata.name );
                    done();
                } );
        } );

        it( 'should allow multiple collections', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/multi' );
            metalsmith
                .use( collections( { articles: {}, posts: {}, drafts: {} } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let m = metalsmith.metadata();
                    assert.equal( 2, m.articles.length );
                    assert.equal( 1, m.drafts.length );
                    assert.equal( 1, m.posts.length );
                    assert.equal( m.collections.articles, m.articles );
                    assert.equal( m.collections.drafts, m.drafts );
                    assert.equal( m.collections.posts, m.posts );
                    done();
                } );
        } );

        it( 'should allow collections through metadata alone', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/noconfig' );
            metalsmith
                .use( collections( { movies: {} } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let m = metalsmith.metadata();
                    assert.equal( 2, m.books.length );
                    assert.equal( 1, m.movies.length );
                    assert.equal( m.collections.books, m.books );
                    assert.equal( m.collections.movies, m.movies );
                    done();
                } );
        } );

        it( 'should allow collections by pattern and front matter', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/multi' );
            metalsmith
                .use( collections( {
                    articles: {},
                    posts: {},
                    drafts: {},
                    blog: '*.md'
                } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let m = metalsmith.metadata();
                    assert.equal( 3, m.blog.length );
                    assert.equal( 2, m.articles.length );
                    assert.equal( 1, m.drafts.length );
                    assert.equal( 1, m.posts.length );
                    assert.equal( m.collections.blog, m.blog );
                    assert.equal( m.collections.articles, m.articles );
                    assert.equal( m.collections.drafts, m.drafts );
                    assert.equal( m.collections.posts, m.posts );
                    done();
                } );
        } );

        it( 'should add file path', function( done ) {
            let metalsmith = Metalsmith( fixturePath + '/sort' );
            metalsmith
                .use( collections( {
                    articles: {
                        sortBy: 'title'
                    }
                } ) )
                .build( function( err ) {
                    if ( err ) return done( err );
                    let articles = metalsmith.metadata().articles;
                    assert( articles[ 0 ].path );
                    assert.equal( articles[ 0 ].path, 'one.md' );
                    done();
                } );
        } );

    } );

    context.only( 'provides functionality that', function() {
        const fixtureRoot = path.resolve( __dirname, 'nested-fixtures' );

        before( function( done ) {
            rimraf( fixtureRoot + '/*/build', done );
        } );

        it( 'adds "nextInCollection" and "prevInCollection" to file metadata', function( done ) {
            let fixturePath = path.resolve( fixtureRoot, 'basic' );
            let metalsmith = Metalsmith( fixturePath );
            metalsmith
                .use( collections( {
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
                } ) )
                .build( function( err, files ) {
                    if ( err ) return done( err );
                    let metadata = metalsmith.metadata();

                    // Save file and collection metadata to JSON files
                    let metadataCollection = {
                        files: files,
                        collections: metadata
                    };
                    saveMetadata( fixturePath, metadataCollection );

                    // Test
                    let names = Object.keys( metadata );
                    for ( let name of names ) {
                        let collection = metadata[ name ];
                        expect( Array.isArray( collection ) ).to.be.true();
                        collection.forEach( file => {
                            expect( file ).to.have.ownProperty( 'nextInCollection' );
                            expect( file ).to.have.ownProperty( 'prevInCollection' );
                        } );
                    }

                    done();
                } );
        } );

    } );

} );

const metalsmithReplacer = function( key, value ) {
    if ( key === 'contents' || key === 'stats' ) {
        return '...';
    }

    if ( key === 'next' ) {
        return ( value && value.title ) ? value.title : '[[ Next ]]';
    }

    if ( key === 'previous' ) {
        return ( value && value.title ) ? value.title : '[[ Prev ]]';
    }

    // Default
    return value;
};

const saveMetadata = function( outputDir, metadataObject ) {
    let keys = Object.keys( metadataObject );
    for ( let key of keys ) {
        let json = JSON.stringify( metadataObject[ key ], metalsmithReplacer, 2 );
        let filename = key + '.json';
        let filePath = path.resolve( outputDir, filename );
        fs.writeFileSync( filePath, json );
    }
};
