'use strict'

$(document).ready(function() {
    var stickyRibbonTop = $('trix-toolbar').offset().top

    $(window).scroll(function(){
        if ($(window).scrollTop() > stickyRibbonTop) {
            $('trix-toolbar').addClass('sticky-trix-toolbar')
            $('trix-toolbar').css({
                borderTopWidth: 0,
                position: 'fixed',
                height: '37px',
                top: '0px',
                width: '100%'
            })
        } else {
            $('trix-toolbar').removeClass('sticky-trix-toolbar')
            $('trix-toolbar').css({
                borderTopWidth: '1px',
                position: 'static',
                height: '38px',
                top: '0px',
                width: 'auto'
            })
        }
    })
})
