import Notificacion from "./classes/Notificacion.js";

const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  // Validar formulario
  const ciudad = formulario.querySelector("#ciudad").value;
  const pais = formulario.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    // Mostrar mensaje de error
    new Notificacion({
      texto: "Todos los campos son obligatorios",
      tipo: "error",
      elementoPadre: container,
    });
    return;
  }

  consultarAPI(ciudad, pais);
}

function consultarAPI(ciudad, pais) {
  const appId = "PEGAR_AQUÍ"; // Aquí debes colocar tu API Key

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  Spinner();

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      // console.log("Datos: ", datos);
      limpiarHtml();

      if (datos.cod === "404") {
        // Mostrar mensaje de error
        new Notificacion({
          texto: "Ciudad no encontrada",
          tipo: "error",
          elementoPadre: container,
        });
        return;
      }

      mostrarclima(datos);
    });
}

function mostrarclima(datos){
  const { name, main: { temp, temp_min, temp_max} } = datos;

  const  centigrados = kelvinACelsius(temp);
  const min = kelvinACelsius(temp_min);
  const max = kelvinACelsius(temp_max);

  const nombreCiudad = document.createElement("P");
  nombreCiudad.classList.add("font-bold", "text-2xl");
  nombreCiudad.innerHTML = `Clima en: <span class="font-normal">${name}</span>`;

  const actual = document.createElement("P");
  actual.classList.add("text-6xl", "font-bold", "mb-2");
  actual.innerHTML = `${centigrados} &#8451;`;

  const tempMin = document.createElement("P");
  tempMin.classList.add("text-xl");
  tempMin.innerHTML = `Min: ${min} &#8451;`;

  const tempMax = document.createElement("P");
  tempMax.classList.add("text-xl");
  tempMax.innerHTML = `Max: ${max} &#8451;`;

  const divResultado = document.createElement("DIV");
  divResultado.classList.add("text-center", "text-white");

  divResultado.appendChild(nombreCiudad);
  divResultado.appendChild(actual);
  divResultado.appendChild(tempMin);
  divResultado.appendChild(tempMax);

  resultado.appendChild(divResultado);
}

const kelvinACelsius = grados => parseInt(grados - 273.15);

function limpiarHtml() {
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner(){
  limpiarHtml();
  const spinner = document.createElement('SPAN');
  spinner.classList.add("loader");

  resultado.appendChild(spinner);
}