// Datos para los gráficos
var salesData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
        label: 'Total de Ventas',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000, 2000000, 2200000] // Valores mensuales de las ventas
    }]
};

var expensesData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
        label: 'Gastos',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: [2000000, 2050000, 2100000, 2150000, 2200000, 2250000, 2300000, 2350000, 2400000, 2450000, 2500000, 2550000] // Valores mensuales de los gastos
    }]
};

var incomeData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
        label: 'Ingresos',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        data: [3500000, 4000000, 4500000, 5000000, 5500000, 6000000, 6500000, 7000000, 7500000, 8000000, 8500000, 9000000] // Valores mensuales de los ingresos
    }]
};

// Opciones comunes para los gráficos con tooltips
var optionsWithTooltip = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                callback: function(value, index, values) {
                    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }
            }
        }]
    },
    tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                });
                return '$' + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        }
    }
};

// Crear los gráficos con tooltips
var salesChart = new Chart(document.getElementById('salesChart').getContext('2d'), {
    type: 'line',
    data: salesData,
    options: optionsWithTooltip
});

var expensesChart = new Chart(document.getElementById('expensesChart').getContext('2d'), {
    type: 'line',
    data: expensesData,
    options: optionsWithTooltip
});

var incomeChart = new Chart(document.getElementById('incomeChart').getContext('2d'), {
    type: 'line',
    data: incomeData,
    options: optionsWithTooltip
});

