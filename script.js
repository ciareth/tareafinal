// Selección de los elementos del DOM para las monedas y cantidades
const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Función para calcular la conversión de monedas
function calculate() {
  const currency_one = currencyEl_one.value; // Obtener la moneda seleccionada en el primer selector
  const currency_two = currencyEl_two.value; // Obtener la moneda seleccionada en el segundo selector

  // Realizar la solicitud a la API para obtener la tasa de cambio
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(function(response) {
      return response.json(); // Convertir la respuesta a formato JSON
    })
    .then(function(data) {
      console.log(data); // Imprimir los datos recibidos en la consola

      const rate = data.rates[currency_two]; // Obtener la tasa de cambio para la segunda moneda
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`; // Mostrar la tasa de cambio en la interfaz
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2); // Calcular y mostrar la cantidad convertida
    });
}

// Agregar eventos para recalcular la conversión cuando se cambien los valores
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

// Evento para intercambiar las monedas cuando se hace clic en el botón de intercambio
swap.addEventListener('click', function() {
  const temp = currencyEl_one.value; // Almacenar temporalmente el valor de la primera moneda

  currencyEl_one.value = currencyEl_two.value; // Asignar el valor de la segunda moneda al primer selector
  currencyEl_two.value = temp; // Asignar el valor temporal al segundo selector

  calculate(); // Recalcular la conversión
});

// Llamar a la función calculate al cargar la página
calculate();