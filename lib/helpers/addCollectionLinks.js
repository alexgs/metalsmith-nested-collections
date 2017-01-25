'use strict';

module.exports = function( metadata ){
    let names = Object.keys( metadata.collections );
    for ( let name of names ) {
        let collection = metadata[ name ];
        let collectionMetadata = collection.metadata;
        collection = collection.map( ( file, index, array ) => {
            if ( index > 0 ) {
                let prevIndex = index - 1;
                file.prevInCollection = file.prevInCollection || { };
                file.prevInCollection[ name ] = array[ prevIndex ];
            }

            if ( index < ( array.length - 1 ) ) {
                let nextIndex = index + 1;
                file.nextInCollection = file.nextInCollection || {};
                file.nextInCollection[ name ] = array[ nextIndex ];
            }

            return file;
        } );
        collection.metadata = collectionMetadata;
        metadata[ name ] = collection;
        metadata.collections[ name ] = collection;
    }
};
