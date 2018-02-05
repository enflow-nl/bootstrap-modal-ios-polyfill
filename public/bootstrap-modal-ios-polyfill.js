var modaliOSPolyfill($modal) {
	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	
	if (!iOS) {
		return;
	}
	
	$('<style>.modal { -webkit-overflow-scrolling: touch; }</style>').appendTo(document.head);
    $('<style>.modal * { -webkit-transform: translate3d(0, 0, 0); }</style>').appendTo(document.head);

    $modal.on('shown.bs.modal', function (e) {
        var $modal = $(this);
        var target = $modal.find('.modal-body')[0];

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

    $modal.on('hide.bs.modal', function (E) {
        // Detatch observer
        var observer = $(this)[0].observer;
        if (observer) {
            observer.disconnect();
        }
    });
};

$(function () {
    var $modal = $('.modal');
	if ($modal.length) {
		modaliOSPolyfill($modal);
	}
});
