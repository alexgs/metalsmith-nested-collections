'use strict';

module.exports = function( metadata ){
    let names = Object.keys( metadata.collections );
    for ( let name of names ) {
        let collection = metadata[ name ];
        let collectionMetadata = collection.metadata;
        collection = collection.map( file => {
            file.nextInCollection = [];
            file.prevInCollection = [];
            return file;
        } );
        collection.metadata = collectionMetadata;
        metadata[ name ] = collection;
        metadata.collections[ name ] = collection;
    }
};
