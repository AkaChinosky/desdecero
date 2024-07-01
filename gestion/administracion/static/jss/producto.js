let idCount = 1;

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function addProduct() {
    const nombre = document.getElementById("nombre").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);

    const isValid = validateInputs(nombre, precio, stock);

    if (isValid) {
        addProductToTable(idCount, nombre, precio, stock);
        idCount++;
        closeModal();
    }
}

function validateInputs(nombre, precio, stock) {
    const nombreError = document.getElementById("nombreError");
    const precioError = document.getElementById("precioError");
    const stockError = document.getElementById("stockError");

    nombreError.textContent = "";
    precioError.textContent = "";
    stockError.textContent = "";

    let isValid = true;

    if (nombre.length === 0 || nombre.length > 20 || !/^[a-zA-Z\s]+$/.test(nombre)) {
        nombreError.textContent = "Ingrese un nombre válido (máximo 20 caracteres, solo letras y espacios)";
        isValid = false;
    }
    if (isNaN(precio) || precio < 0 || precio > 1000) {
        precioError.textContent = "Ingrese un precio válido (entre 0 y 1000)";
        isValid = false;
    }
    if (isNaN(stock) || stock < 1) {
        stockError.textContent = "Ingrese un stock válido (mayor a 0)";
        isValid = false;
    }

    return isValid;
}

function addProductToTable(id, nombre, precio, stock) {
    const table = document.getElementById("productTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
    newRow.id = `product${id}`;

    newRow.innerHTML = `
        <td>${id}</td>
        <td>${nombre}</td>
        <td>$${precio.toFixed(2)}</td>
        <td>${stock}</td>
        <td>
            <button onclick="editProduct(${id})">Editar</button>
            <button onclick="deleteProduct(${id})">Eliminar</button>
            <button onclick="setOutOfStock(${id})">Sin Stock</button>
        </td>
    `;
}

function editProduct(id) {
    const table = document.getElementById("productTable").getElementsByTagName("tbody")[0];
    const row = table.querySelector(`tr:nth-child(${id})`);
    const nombre = row.cells[1].textContent;
    const precio = parseFloat(row.cells[2].textContent.replace("$", ""));
    const stock = parseInt(row.cells[3].textContent);

    document.getElementById("nombre").value = nombre;
    document.getElementById("precio").value = precio;
    document.getElementById("stock").value = stock;
    document.getElementById("currentProductId").value = id;

    openModal();
}

function saveProduct() {
    const id = parseInt(document.getElementById("currentProductId").value);
    const table = document.getElementById("productTable").getElementsByTagName("tbody")[0];
    const row = table.querySelector(`tr:nth-child(${id})`);
    const nuevoNombre = document.getElementById("nombre").value.trim();
    const nuevoPrecio = parseFloat(document.getElementById("precio").value);
    const nuevoStock = parseInt(document.getElementById("stock").value);

    row.cells[1].textContent = nuevoNombre;
    row.cells[2].textContent = `$${nuevoPrecio.toFixed(2)}`;
    row.cells[3].textContent = nuevoStock;

    closeModal();
}


function deleteProduct(id) {
    const table = document.getElementById("productTable").getElementsByTagName("tbody")[0];
    const row = document.getElementById(`product${id}`);
    table.removeChild(row);
}

function setOutOfStock(id) {
    const row = document.getElementById(`product${id}`);
    row.cells[3].textContent = 0;
}

        