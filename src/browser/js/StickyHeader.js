'use strict'

$(document).ready(function() {
    var stickyRibbonTop = $('trix-toolbar').offset().top

    $(window).scroll(function(){
        if ($(window).scrollTop() > stickyRibbonTop) {
            $('trix-toolbar').addClass('sticky-trix-toolbar')
            $('trix-toolbar').css({
                borderTopWidth: 0,
                position: 'fixed', 
                top: '0px',
                width: '100%',
                padding: '0 6rem 0 8rem'
            })
        } else {
            $('trix-toolbar').removeClass('sticky-trix-toolbar')
            $('trix-toolbar').css({
                borderTopWidth: '1px',
                position: 'static', 
                top: '0px',
                width: 'auto',
                padding: '0 6rem'
            })
        }
    })
})
