

let btnSend = $('#btn-send');

btnSend.on('click', requestInscription);

function requestInscription(){
    let email = $('#txt-email').val(),
        rut = $('#txt-rut').val(),
        name = $('#txt-name').val(),
        lastNames = $('#txt-last-names').val(),
        phone = $('#txt-phone').val(),
        address = $('#txt-address').val(),
        license = $('#fl-license');

    console.log(license.prop('files'))
    console.log(license.prop('files')[0])
    let formData = new FormData();
    formData.append('email', email);
    formData.append('rut', rut);
    formData.append('name', name);
    formData.append('lastNames', lastNames);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('license', license.prop('files')[0]);
    $.ajax({
        method: 'POST',
        url: '/user/request-inscription',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
    })
    .done(function(data){
        console.log(data);
    });
}