$(document).ready(function () {
    console.log("Esperando datos...");
    $.getJSON('https://mindicador.cl/api', function (data) {
        $(".spinner-grow").hide();
        $(".spinner-text").hide();

        $("#dolar").text('Dólar (' + data.dolar.nombre + '): $' + data.dolar.valor);
        $("#uf").text('UF: $' + data.uf.valor);
        $("#euro").text('Euro: $' + data.euro.valor);
        $("#utm").text('UTM: $' + data.utm.valor);
    }).fail(function () {
        console.log('Error al consumir la API!');
        $("#dolar").text("No se pudo obtener el valor del dólar");
        $("#uf").text("No se pudo obtener el valor de la UF");
        $("#euro").text("No se pudo obtener el valor del Euro");
        $("#utm").text("No se pudo obtener el valor del UTM");
        $("#dolar, #uf, #euro, #utm").addClass("text-danger h6");
    });
});
