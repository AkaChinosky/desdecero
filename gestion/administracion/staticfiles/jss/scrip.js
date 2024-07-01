document.addEventListener("DOMContentLoaded", function() {
    var addToCartButtons = document.querySelectorAll(".agregar-carrito");

    addToCartButtons.forEach(function(button) {
        button.addEventListener("click", addToCartClicked);
    });

    function addToCartClicked(event) {
        var button = event.target;
        var product = button.parentElement.parentElement.parentElement;
        var productImage = product.querySelector(".zoom-img").getAttribute("src");
        var productName = product.querySelector("h1").innerText;
        var productPrice = product.querySelector("p").innerText;

        agregarAlCarrito(productName, productPrice, productImage);
    }

    function agregarAlCarrito(nombre, precio, imagen) {
        var cartRow = document.createElement("tr");
        cartRow.innerHTML = `
            <td><img src="${imagen}" width="50"></td>
            <td>${nombre}</td>
            <td>${precio}</td>
        `;
        document.getElementById("lista-carrito").appendChild(cartRow);
        actualizarTotal();
    }

    function actualizarTotal() {
        var carritoItemContainer = document.getElementById("lista-carrito");
        var cartRows = carritoItemContainer.getElementsByTagName("tr");
        var total = 0;
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i];
            var precioElemento = cartRow.getElementsByTagName("td")[2];
            var precio = parseFloat(precioElemento.innerText.replace("$", ""));
            total += precio;
        }
        document.getElementsByClassName("total-carrito")[0].innerText = "$" + total.toFixed(2);
    }
});

   
function cerrarSesion() {
    var respuesta = confirm("¿Desea cerrar sesión?");
    if (respuesta) {
        window.location.href = "index.html";
    }
    return false; 
}

function abrirImagen(urlImagen, descripcion) {
    var modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
        <img src="${urlImagen}" alt="Imagen Ampliada">
        <p>${descripcion}</p>
    `;

    document.body.appendChild(modal);

    modal.onclick = function() {
        modal.style.display = "none";
        document.body.removeChild(modal); 
    };
}

function guardarDireccion(event) {
    event.preventDefault();
    var nombre = document.getElementById("nombreDireccion").value;
    var calleNumero = document.getElementById("calleNumero").value;
    var comuna = document.getElementById("comuna").value;
    var telefono = document.getElementById("telefono").value;

    var nuevaDireccion = document.createElement("div");
    nuevaDireccion.classList.add("perfil-info");
    nuevaDireccion.innerHTML = `
        <div class="info-label">Nombre Dirección:</div>
        <div class="info-value">${nombre}</div>
        <div class="info-label">Calle-Nro:</div>
        <div class="info-value">${calleNumero}</div>
        <div class="info-label">Comuna:</div>
        <div class="info-value">${comuna}</div>
        <div class="info-label">Nro Fono:</div>
        <div class="info-value">${telefono}</div>
    `;

    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("eliminar-direccion");
    botonEliminar.onclick = function() {
        eliminarDireccion(nuevaDireccion);
    };
    nuevaDireccion.appendChild(botonEliminar);

    var contenedorDirecciones = document.querySelector('.direcciones-container');
    contenedorDirecciones.appendChild(nuevaDireccion);

    document.getElementById("formulario").style.display = "none";
}

function eliminarDireccion(direccion) {
    direccion.parentNode.removeChild(direccion);
}
