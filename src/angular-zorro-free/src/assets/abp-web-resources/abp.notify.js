var abp = abp || {};
(function () {

    /* DEFAULTS *************************************************/

    var defaultOptions = {
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        padding: 0,
        toast: true,
        animation: false,
        backdrop: false
    };

    /* NOTIFICATION *********************************************/

    var showNotification = function (type, message, title, options) {
        var icon = options.imageClass ? '<i style="margin-right: 10px; margin-left: -10px;" class="m--font-light ' + options.imageClass + '"></i>' : '';

        if (title) {
            options.title = icon + '<span class="m--font-light">' + title + '</span>';
        }

        options.html = (title ? '' : icon) + '<span class="m--font-light">' + message + '</span>';
        var combinedOptions = Object.assign(options, defaultOptions);
        
        swal(combinedOptions);
    };

    abp.notify.success = function (message, title, options) {
        showNotification('success', message, title,
            Object.assign({
                background: '#34bfa3',
                imageClass: 'fa fa-check-circle'
            }, options));
    };

    abp.notify.info = function (message, title, options) {
        showNotification('info', message, title, Object.assign({
            background: '#36a3f7',
            imageClass: 'fa fa-info-circle'
        }, options));
    };

    abp.notify.warn = function (message, title, options) {
        showNotification('warning', message, title, Object.assign({
            background: '#ffb822',
            imageClass: 'fa fa-exclamation-triangle'
        }, options));
    };

    abp.notify.error = function (message, title, options) {
        showNotification('error', message, title, Object.assign({
            background: '#f4516c',
            imageClass: 'fa fa-exclamation-circle'
        }, options));
    };

})();
