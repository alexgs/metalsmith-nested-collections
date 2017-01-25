let debug = require( 'debug' )( 'metalsmith-nested-collections' );

let plugin = function plugin() {

    return function( files, metalsmith, done ) {
        setImmediate( done );

        let metadata = metalsmith.metadata();
        let names = Object.keys( metadata.collections );
        for ( let name of names ) {
            let collection = metadata[ name ];
            collection = collection.map( file => {
                file.nextInCollection = [ ];
                file.prevInCollection = [ ];
                return file;
            } );
            metadata[ name ] = collection;
            metadata.collections[ name ] = collection;
        }
    }
};

module.exports = plugin;
