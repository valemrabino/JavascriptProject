document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('bot').addEventListener('click', function () {
        Swal.fire({
            title: 'Hola 😎',
            text: '¡Tu compra fue exitosa! Gracias por confiar 💘',
            icon: 'success',
            confirmButtonText: '¡Ok!',
            customClass: {
                confirmButton: 'botok'
            }
        });
    });
});
