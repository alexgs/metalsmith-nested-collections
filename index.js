let debug = require( 'debug' )( 'metalsmith-nested-collections' );
let collections = require( 'metalsmith-collections' );
let addCollectionLinks = require( './lib/helpers/addCollectionLinks' );

let plugin = function plugin( options ) {

    let oldWorker = collections( options );

    return function( files, metalsmith, done ) {
        setImmediate( done );

        let newWorker = function() {
            let metadata = metalsmith.metadata();
            addCollectionLinks( metadata );
        };

        oldWorker( files, metalsmith, newWorker );
    }
};

module.exports = plugin;
