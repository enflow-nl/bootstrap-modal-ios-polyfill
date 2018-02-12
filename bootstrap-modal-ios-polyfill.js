(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

})(function ($) {
    $(function () {
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        if (!iOS) {
            return;
        }

        $('<style>.modal-body-fixed { position: fixed !important; left: 0 !important; right: 0 !important; }</style>').appendTo(document.head);
        $('<style>.modal { -webkit-overflow-scrolling: touch; }</style>').appendTo(document.head);
        $('<style>.modal-body > * { -webkit-transform: translate3d(0, 0, 0); }</style>').appendTo(document.head);

        $(document).on('show.bs.modal', function (e) {
            var $modal = $(this);
            var target = $modal.find('.modal-content')[0];

            $('body').data('scroll-top', $(window).scrollTop()).css('top', '-' + $(window).scrollTop() + 'px').addClass('modal-body-fixed');

            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    $modal.css('overflow-y', 'hidden');
                    setTimeout(function () {
                        $modal.css('overflow-y', 'scroll');
                        $modal.modal('handleUpdate');
                    }, 1);
                });
            });

            observer.observe(target, {
                attributes: true,
                childList: true,
                characterData: true
            });

            $modal[0].observer = observer;
        });

        $(document).on('shown.bs.modal', function (e) {
            $('body').addClass('modal-open');
        });

        $(document).on('hide.bs.modal', function () {
            $('body').removeClass('modal-body-fixed').css('top', '');
            window.scrollTo(0, $('body').data('scroll-top'));
            $('body').removeAttr('data-scroll-top');

            // Detatch observer
            var observer = $(this)[0].observer;
            if (observer) {
                observer.disconnect();
            }
        });
    });
});
