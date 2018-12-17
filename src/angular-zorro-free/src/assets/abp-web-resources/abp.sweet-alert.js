var abp = abp || {};
(function () {
    var showMessage = function (type, message, title, isHtml, opts) {

        if (!title) {
            title = message;
            message = undefined;
        }

        opts = opts || {};
        opts.title = title;
        opts.type = type;
        opts.confirmButtonText = opts.confirmButtonText || abp.localization.abpWeb('Ok');

        if (isHtml) {
            opts.html = message;
        } else {
            opts.text = message;
        }

        return swal(opts);
    };

    abp.message.info = function (message, title, isHtml, opts) {
        return showMessage('info', message, title, isHtml, opts);
    };

    abp.message.success = function (message, title, isHtml, opts) {
        return showMessage('success', message, title, isHtml, opts);
    };

    abp.message.warn = function (message, title, isHtml, opts) {
        return showMessage('warning', message, title, isHtml, opts);
    };

    abp.message.error = function (message, title, isHtml, opts) {
        return showMessage('error', message, title, isHtml, opts);
    };

    abp.message.confirm = function (message, titleOrCallback, callback, isHtml, opts) {

        var title = undefined;

        if (typeof titleOrCallback === "function") {
            callback = titleOrCallback;
        }
        else if (titleOrCallback) {
            title = titleOrCallback;
        };

        opts = opts || {};
        opts.title = title ? title : abp.localization.abpWeb('AreYouSure');
        opts.type = 'warning';

        opts.confirmButtonText = opts.confirmButtonText || abp.localization.abpWeb('Yes');
        opts.cancelButtonText = opts.cancelButtonText || abp.localization.abpWeb('Cancel');
        opts.showCancelButton = true;

        if (isHtml) {
            opts.html = message;
        } else {
            opts.text = message;
        }

        return swal(opts).then(function(result) {
            callback && callback(result.value);
        });
    };
})();
