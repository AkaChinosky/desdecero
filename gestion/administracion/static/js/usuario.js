document.addEventListener('DOMContentLoaded', function () {
    let usuarioEspecifico = JSON.parse(localStorage.getItem('usuarioEspecifico'));
    if (!usuarioEspecifico) {
        usuarioEspecifico = {
            correo: 'admin@admin.com',
            contraseña: '1817'
        };
        localStorage.setItem('usuarioEspecifico', JSON.stringify(usuarioEspecifico));
    }

    document.querySelector('.form-login').addEventListener('submit', function (event) {
        event.preventDefault(); 
        
        const correo = this.querySelector('input[name="userEmail"]').value;
        const contraseña = this.querySelector('input[name="userPassword"]').value;

        if (correo === usuarioEspecifico.correo && contraseña === usuarioEspecifico.contraseña) {
            window.location.href = '../adminbenja/admin.html';
        } else {

            
            // Agregar lógica para mostrar mensaje de error
            const errorMensaje = document.createElement('div');
            errorMensaje.classList.add('alerta-error');
            errorMensaje.textContent = 'Credenciales incorrectas';
            this.appendChild(errorMensaje);
            setTimeout(() => {
                errorMensaje.remove();
            }, 3000);
        }
    });

    const links = document.querySelectorAll('.sidebar a');

    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const logoutLink = document.querySelector('.sidebar a[href="login.html"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function() {
            localStorage.removeItem('usuarioEspecifico');
        });
    }
});
