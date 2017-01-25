'use strict';

module.exports = function( key, value ) {
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
