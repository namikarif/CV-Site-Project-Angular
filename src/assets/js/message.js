function messagegonder() {
    var name = $('input[name="sname"]').val();
    var email = $('input[name="semail"]').val();
    var telephone = $('input[name="stelephone"]').val();
    var message = $('textarea[name="smessage"]').val();
    if (name && email && telephone && message) {
        $.post('message.php', {name: name, email: email, telephone: telephone, message: message}, function (data) {
            if (data == 1) {
                swal('Başarılı!', 'Messageınız gönderildi.', 'success');
                $('input[name="sname"]').val('');
                $('input[name="semail"]').val('');
                $('input[name="stelephone"]').val('');
                $('textarea[name="smessage"]').val('');
            } else if (data == 2)
                swal('Incorrect', 'Important fields are not full.', 'info');
            else if (data == 3)
                swal('Error', 'Sending messages is currently off.', 'info');
        });
    } else
        swal('Incorrect', 'Important fields are not full', 'info');
}

function sendMessage2() {
    var name = $('input[name="name"]').val();
    var email = $('input[name="email"]').val();
    var telephone = $('input[name="telephone"]').val();
    var message = $('textarea[name="message"]').val();
    if (name && email && telephone && message) {
        $.post('message.php', {name: name, email: email, telephone: telephone, message: message}, function (data) {
            if (data == 1) {
                swal('Success!', 'Your message has been sent.', 'success');
                $('input[name="name"]').val('');
                $('input[name="email"]').val('');
                $('input[name="telephone"]').val('');
                $('textarea[name="message"]').val('');
            } else if (data == 2)
                swal('Incorrect', 'Important fields are not full.', 'info');
            else if (data == 3)
                swal('Error', 'Sending messages is currently off.', 'info');
        });
    } else
        swal('Incorrect', 'Important fields are not full', 'info');
}


function get_blog(lastID) {
    $.post('functions.php?process=get_blog', {lastID: lastID}, function (data) {
        $('.yazilarim').append(data);
    });
}
