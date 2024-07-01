document.getElementById('sign-in').addEventListener('click', function() {
    window.location.href = 'custom_admin';  // Reemplaza '/custom_admin' con la URL correcta si es diferente
});

document.getElementById('sign-up').addEventListener('click', function() {
    fetch('/url_para_guardar_datos', {
        method: 'POST',
        body: new FormData(document.querySelector('.form-register')) 
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'indexlog.html';  
        } else {
        }
    })
    .catch(error => console.error('Error al enviar datos:', error));
});