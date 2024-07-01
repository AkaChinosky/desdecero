const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{8,20}$/,
    password: /^.{4,12}$/, 
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{9}$/,
    rut: /^\d{7,8}-[\dkK]{1}$/
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false,
}

function validarRut(rutCompleto) {
    const rutLimpio = rutCompleto.replace(/[\.\-]/g, '');
    const rut = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();
    const dvCalc = Array.from(rut)
        .reverse()
        .map((d, i) => Number(d) * (i % 6 + 2))
        .reduce((a, b) => a + b) % 11;
    const dvValido = dv === (dvCalc < 2 ? 11 - dvCalc : 11 - dvCalc === 10 ? 'K' : 11 - dvCalc).toString();

    return dvValido;
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
            break;
        case "password2":
            validarPassword2();
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
        case "rut":
            validarCampo(expresiones.rut, e.target, 'rut');
                break;
        case "fecha_nacimiento":
            validarFechaNacimiento(e.target);
                break;
    }
    if (e.target.name === "terminos" && !e.target.checked) {
        document.getElementById('grupo__terminos').classList.add('formulario__grupo-incorrecto');
        document.getElementById('grupo__terminos').classList.remove('formulario__grupo-correcto');
        campos['terminos'] = false;
    } else if (e.target.name === "terminos" && e.target.checked) {
        document.getElementById('grupo__terminos').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo__terminos').classList.add('formulario__grupo-correcto');
        campos['terminos'] = true;
    }
}

const validarFechaNacimiento = (input) => {
    const fechaNacimiento = new Date(input.value);
    const edad = calcularEdad(fechaNacimiento);
    if (edad < 0 || edad > 110) {
        document.getElementById(`grupo__fecha_nacimiento`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__fecha_nacimiento`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__fecha_nacimiento i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__fecha_nacimiento i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__fecha_nacimiento .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['fecha_nacimiento'] = false;
    } else {
        document.getElementById(`grupo__fecha_nacimiento`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__fecha_nacimiento`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__fecha_nacimiento i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__fecha_nacimiento i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__fecha_nacimiento .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['fecha_nacimiento'] = true;
    }
};

const calcularEdad = (fechaNacimiento) => {
    const diferencia = Date.now() - fechaNacimiento.getTime();
    const edad = new Date(diferencia);
    return Math.abs(edad.getUTCFullYear() - 1970);
};

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password'] = false;
    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password'] = true;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll('#formulario input');
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    document.getElementById('formulario').addEventListener('submit', (e) => {
        e.preventDefault();

        const terminos = document.getElementById('terminos');
        if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
            document.getElementById('formulario').reset();

            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 5000);

            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });
        } else {
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        }
    });
});

