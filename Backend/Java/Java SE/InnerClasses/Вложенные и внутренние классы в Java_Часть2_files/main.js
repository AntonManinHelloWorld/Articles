( function( $ ) {
	$( function() {
		$( '#main-nav-search-link' ).on( 'click', function( event ) {
            event.stopPropagation();
			var wrapper = $( '.main-nav-search-form' );

            if (wrapper.css('display') !== 'none') {
                wrapper.fadeOut( 'fast' );
            } else {
                wrapper.fadeIn( 'fast' );
            }
		} );

		$( '.main-nav-search-form' ).on( 'click', function( event ) {
            event.stopPropagation();
		} );

		$( document ).on( 'click', function( event ) {
            var wrapper = $( '.main-nav-search-form' );
                wrapper.fadeOut( 'fast' );
		} );

		$( document ).on( 'mousemove', function( e ) {
            var amountMovedX = 60 * ( (e.pageX + 1) / $( document ).width() );
            var amountMovedY = 60 * ( (e.pageY + 1) / $( window ).height() );

            $( '.site-header' ).css( 'background-position', amountMovedX + 'px ' + amountMovedY + 'px' );
		} );
	} );
} )( jQuery );