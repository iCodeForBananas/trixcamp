'use strict'

$(document).ready(function() {
    var stickyRibbonTop = $('trix-toolbar').offset().top

    $(window).scroll(function(){
        if ($(window).scrollTop() > stickyRibbonTop) {
            $('trix-toolbar').css({
                position: 'fixed', 
                top: '0px',
                width: '100%',
                padding: '0 8rem'
            })
        } else {
            $('trix-toolbar').css({
                position: 'static', 
                top: '0px',
                width: 'auto',
                padding: '0 6rem'
            })
        }
    })
})
