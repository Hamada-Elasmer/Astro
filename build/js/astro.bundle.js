$(function (){
    'use strict';

    // :: 0.1 Preloader Active Code
    $(window).on('load', function () {
        $('#preloader').fadeOut('1000', function () {
            $(this).remove();
        });
    });
    // :: 0.2 Scrollup Active Code
    if ($.fn.scrollUp) {
        $(window).scrollUp({
            // scrollSpeed: 500,
            scrollText: '<i class="fa fa-angle-up"</i>'
        });
    }
    // :: 0.3 Prevent Default 'a' Click
    $('a[href="#"]').on('click', function ($) {
        $.preventDefault();
    });

});
//# sourceMappingURL=astro.bundle.js.map
