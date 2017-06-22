function notifySuccess(title, message) {
    tempTitle = '<strong>' + title + '</strong>';
    $.notify({
        // options
        icon: 'glyphicon glyphicon-thumbs-up',
        title: tempTitle,
        message: message
    }, {
            // settings
            type: 'success',
            allow_dismiss: false
    });
}

function notifyFailure(title, message) {
    tempTitle = '<strong>' + title + '</strong>';
    $.notify({
            // options
            icon: 'glyphicon glyphicon-warning-sign',

            title: tempTitle,
            message: message
        }, {
            // settings
            type: 'danger', 
            allow_dismiss: false
        });

}