var topItems = [
    'Polera Colo-Colo 1998',
    'Calcetines Blacos-Negro',
    'Short Colo-colo 2006',
    'Polera Colo-colo negra',
    'Zapatillas Deportivas',
    'Gorra de Equipo',
    'Mochila de Viaje',
    'Libreta de Notas',
    'Lápiz de Escritura',
    'Botella de Agua',
    'Camiseta de Equipo',
    'Balón de Fútbol',
    'Pantalón de Entrenamiento',
    'Gorro de Invierno',
    'Bufanda del Equipo',
    'Guantes de Portero',
    'Sudadera con Capucha',
    'Chaqueta Impermeable',
    'Polo de Paseo',
    'Manta de Viaje'
];

var topItemsList = document.getElementById('topItemsList');
var expandButton = document.getElementById('expandButton');


function showFullList() {
    topItemsList.innerHTML = ''; 
    topItems.forEach(function(item, index) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `<i class="material-icons">trending_up</i> ${item} - $50.000`;
        listItem.setAttribute('id', `item-${index + 1}`);
        topItemsList.appendChild(listItem);
    });
}


showFullList();
topItemsList.classList.add('partial');


expandButton.addEventListener('click', function() {
    if (topItemsList.classList.contains('partial')) {
        topItemsList.classList.remove('partial');
        topItemsList.classList.add('full');
        expandButton.textContent = 'Ver menos';
    } else {
        topItemsList.classList.remove('full');
        topItemsList.classList.add('partial');
        expandButton.textContent = 'Ver más';
    }
});

var topClientes = [
    'Juan Perez',
    'María González',
    'Luis Sánchez',
    'Diego López',
    'Paula Fernández',
    'Andrés Gómez',
    'Laura Pérez',
    'Manuel Soto',
    'Felipe Torres',
    'Valentina Ramírez',
    'Martín Castro',
    'Carolina Díaz',
    'Nicolás Silva',
    'Antonia Morales',
    'Sebastián Bravo',
    'Constanza Vargas',
    'Ignacio Rivera',
    'Ana Martínez',
    'Diego López'
];

var topClientesList = document.getElementById('topClientesList');
var expandClientesButton = document.getElementById('expandClientesButton');

function showFullClientesList() {
    topClientesList.innerHTML = ''; 
    topClientes.forEach(function(cliente, index) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `${cliente} - ID: ${index + 1} - Precio: $50.000`;
        listItem.setAttribute('id', `cliente-${index + 1}`);
        topClientesList.appendChild(listItem);
    });
}

showFullClientesList();
topClientesList.classList.add('partial');

expandClientesButton.addEventListener('click', function() {
    if (topClientesList.classList.contains('partial')) {
        topClientesList.classList.remove('partial');
        topClientesList.classList.add('full');
        expandClientesButton.textContent = 'Ver menos';
    } else {
        topClientesList.classList.remove('full');
        topClientesList.classList.add('partial');
        expandClientesButton.textContent = 'Ver más';
    }
});
