export default class Notificacion {
  constructor({ texto, tipo, elementoPadre }) {
    this.texto = texto;
    this.tipo = tipo;
    this.elementoPadre = elementoPadre;

    this.mostrar();
  }

  mostrar() {
    // eliminar notificaciones previas
    const alertaPrevia = this.elementoPadre.querySelector(".alert");
    alertaPrevia?.remove();
    // crear notificación
    const alerta = document.createElement("DIV");
    alerta.classList.add(
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center",
      "border",
      "alert"
    );

    const titleAlerta = document.createElement("STRONG");
    titleAlerta.classList.add("font-bold");

    if (this.tipo === "error") {
      alerta.classList.add("bg-red-100", "border-red-400", "text-red-700");
      titleAlerta.textContent = "Error: ";
    } else {
      alerta.classList.add(
        "bg-green-100",
        "border-green-400",
        "text-green-700"
      );
      titleAlerta.textContent = "Éxito: ";
    }
    alerta.appendChild(titleAlerta);
    
    const textoAlerta = document.createElement("SPAN");
    textoAlerta.classList.add("block");
    textoAlerta.textContent = this.texto;
    alerta.appendChild(textoAlerta);

    this.elementoPadre.appendChild(alerta);
    // eliminar despues de 3seg
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}
