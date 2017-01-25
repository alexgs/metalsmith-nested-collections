let debug = require( 'debug' )( 'metalsmith-nested-collections' );
let collections = require( 'metalsmith-collections' );

let plugin = function plugin( options ) {

    let oldWorker = collections( options );

    return function( files, metalsmith, done ) {
        setImmediate( done );

        let newWorker = function() {
            let metadata = metalsmith.metadata();
            let names = Object.keys( metadata.collections );
            for ( let name of names ) {
                let collection = metadata[ name ];
                let colMetadata = collection.metadata;
                collection = collection.map( file => {
                    file.nextInCollection = [];
                    file.prevInCollection = [];
                    return file;
                } );
                collection.metadata = colMetadata;
                metadata[ name ] = collection;
                metadata.collections[ name ] = collection;
            }
        };

        oldWorker( files, metalsmith, newWorker );
    }
};

module.exports = plugin;
