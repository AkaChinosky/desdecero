document.addEventListener('click', function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

document.getElementById('viewAll').addEventListener('click', function() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';

    var table = document.getElementById('modalTable');
    var tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    var originalTbody = document.querySelector('.recent_order table tbody');
    for (var i = 0; i < originalTbody.rows.length; i++) {
        var newRow = tbody.insertRow(i);
        for (var j = 0; j < originalTbody.rows[i].cells.length - 1; j++) {
            var newCell = newRow.insertCell(j);
            newCell.innerHTML = originalTbody.rows[i].cells[j].innerHTML;
        }

        var actionsCell = newRow.insertCell(originalTbody.rows[i].cells.length - 1);
        var editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = function() {
            editOrder(this);
        };
        actionsCell.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function() {
            deleteOrder(this);
        };
        actionsCell.appendChild(deleteButton);
    }

    var newRow = tbody.insertRow(originalTbody.rows.length);
    for (var j = 0; j < originalTbody.rows[0].cells.length - 1; j++) {
        var newCell = newRow.insertCell(j);
        if (j === 1) { // Product Number
            newCell.innerText = Math.floor(Math.random() * 10000) + 1; // Generate random number
        } else if (j === 2) { // Payments
            var select = document.createElement('select');
            var option1 = document.createElement('option');
            option1.value = 'Pendiente';
            option1.text = 'Pendiente';
            var option2 = document.createElement('option');
            option2.value = 'Aprobado';
            option2.text = 'Aprobado';
            select.add(option1);
            select.add(option2);
            newCell.appendChild(select);
        } else if (j === 3) { // Status
            var select = document.createElement('select');
            var option1 = document.createElement('option');
            option1.value = 'Pendiente';
            option1.text = 'Pendiente';
            var option2 = document.createElement('option');
            option2.value = 'Enviado';
            option2.text = 'Enviado';
            select.add(option1);
            select.add(option2);
            newCell.appendChild(select);
        } else {
            newCell.innerHTML = '<input type="text" placeholder="Nuevo producto">';
        }
    }
    var addCell = newRow.insertCell(originalTbody.rows[0].cells.length - 1);
    var addButton = document.createElement('button');
    addButton.textContent = 'Agregar';
    addButton.onclick = function() {
        addOrder();
    };
    addCell.appendChild(addButton);
});

function editOrder(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');
    for (var i = 0; i < cells.length - 1; i++) {
        var input = document.createElement('input');
        input.type = 'text';
        input.value = cells[i].innerText;
        cells[i].innerText = '';
        if (i === 2) { // Payments
            var select = document.createElement('select');
            var option1 = document.createElement('option');
            option1.value = 'Pendiente';
            option1.text = 'Pendiente';
            var option2 = document.createElement('option');
            option2.value = 'Aprobado';
            option2.text = 'Aprobado';
            select.add(option1);
            select.add(option2);
            select.value = input.value;
            cells[i].appendChild(select);
        } else if (i === 3) { // Status
            var select = document.createElement('select');
            var option1 = document.createElement('option');
            option1.value = 'Pendiente';
            option1.text = 'Pendiente';
            var option2 = document.createElement('option');
            option2.value = 'Enviado';
            option2.text = 'Enviado';
            select.add(option1);
            select.add(option2);
            select.value = input.value;
            cells[i].appendChild(select);
        } else {
            cells[i].appendChild(input);
        }
    }
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.onclick = function() {
        for (var i = 0; i < cells.length - 1; i++) {
            if (i === 2 || i === 3) { // Payments or Status
                cells[i].innerText = cells[i].getElementsByTagName('select')[0].value;
            } else {
                cells[i].innerText = cells[i].getElementsByTagName('input')[0].value;
            }
        }
        updateMainTable();
    };
    cells[cells.length - 1].innerText = '';
    cells[cells.length - 1].appendChild(saveButton);
}

function deleteOrder(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateMainTable();
}

function addOrder() {
    var modalTable = document.getElementById('modalTable');
    var newRow = modalTable.insertRow(modalTable.rows.length - 1);
    for (var i = 0; i < modalTable.rows[0].cells.length - 1; i++) {
        var newCell = newRow.insertCell(i);
        if (i === 1) { // Product Number
            newCell.innerText = Math.floor(Math.random() * 10000) + 1; // Generate random number
        } else if (i === 2) { // Payments
            var select = document.createElement('select');
            var option1 = document.createElement('option');
            option1.value = 'Pendiente';
            option1.text = 'Pendiente';
            var option2 = document.createElement('option');
            option2.value = 'Aprobado';
            option2.text = 'Aprobado';
            select.add(option1);
            select.add(option2);
            newCell.appendChild(select);
        } else if (i === 3) { // Status
            var select = document.createElement('select');
            var option1 = document.createElement('option');
            option1.value = 'Pendiente';
            option1.text = 'Pendiente';
            var option2 = document.createElement('option');
            option2.value = 'Enviado';
            option2.text = 'Enviado';
            select.add(option1);
            select.add(option2);
            newCell.appendChild(select);
        } else {
            newCell.innerHTML = '<input type="text" placeholder="Nuevo producto">';
        }
    }
    var actionsCell = newRow.insertCell(modalTable.rows[0].cells.length - 1);
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.onclick = function() {
        for (var i = 0; i < newRow.cells.length - 1; i++) {
            if (i === 2 || i === 3) { // Payments or Status
                newRow.cells[i].innerText = newRow.cells[i].getElementsByTagName('select')[0].value;
            } else {
                newRow.cells[i].innerText = newRow.cells[i].getElementsByTagName('input')[0].value;
            }
        }
        var editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = function() {
            editOrder(this);
        };
        actionsCell.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function() {
            deleteOrder(this);
        };
        actionsCell.appendChild(deleteButton);

        addOrderToMainTable(newRow);
        addOrder();
    };
    actionsCell.appendChild(saveButton);
}

function addOrderToMainTable(newRow) {
    var mainTable = document.querySelector('.recent_order table tbody');
    var mainRow = mainTable.insertRow(mainTable.rows.length);
    for (var i = 0; i < newRow.cells.length - 1; i++) {
        var newCell = mainRow.insertCell(i);
        if (i === 2 || i === 3) { // Payments or Status
            newCell.innerText = newRow.cells[i].innerText;
        } else {
            newCell.innerText = newRow.cells[i].innerText;
        }
    }
    var actionsCell = mainRow.insertCell(newRow.cells.length - 1);
    var editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.onclick = function() {
        editOrder(this);
    };
    actionsCell.appendChild(editButton);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.onclick = function() {
        deleteOrder(this);
    };
    actionsCell.appendChild(deleteButton);
}

function updateMainTable() {
    var mainTable = document.querySelector('.recent_order table tbody');
    mainTable.innerHTML = '';
    var modalTable = document.getElementById('modalTable');
    var modalRows = modalTable.getElementsByTagName('tr');
    for (var i = 1; i < modalRows.length - 1; i++) {
        var newRow = mainTable.insertRow(mainTable.rows.length);
        var modalCells = modalRows[i].getElementsByTagName('td');
        for (var j = 0; j < modalCells.length - 1; j++) {
            var newCell = newRow.insertCell(j);
            newCell.innerText = modalCells[j].innerText;
        }
        var actionsCell = newRow.insertCell(modalCells.length - 1);
        var editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = function() {
            editOrder(this);
        };
        actionsCell.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function() {
            deleteOrder(this);
        };
        actionsCell.appendChild(deleteButton);
    }
}