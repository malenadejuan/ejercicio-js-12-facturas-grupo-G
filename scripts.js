const urlAPI = "http://localhost:3001/facturas";
const filadummy = document.querySelector(".dummy").cloneNode(true);

const facturas = fetch(urlAPI).then(respuesta => respuesta.json()).then(dato => dato);

async function nuevaFila() {
  let nuevaFila;
  const tabla = document.querySelector(".facturas");
  for (const factura of await facturas) {
    if (factura.tipo === "ingreso") {
      nuevaFila = filadummy.cloneNode(true);
      nuevaFila.querySelector(".numero").textContent = factura.numero;
      nuevaFila.querySelector(".fecha").textContent = factura.fecha;
      nuevaFila.querySelector(".concepto").textContent = factura.concepto;
      nuevaFila.querySelector(".base").textContent = factura.base;
      nuevaFila.querySelector(".iva").textContent = factura.tipoIva;
      /* nuevaFila.querySelector(".total").textContent = ; */
      nuevaFila.querySelector(".estado").textContent = factura.abonada;
      nuevaFila.querySelector(".vence").textContent = factura.vencimiento;
      nuevaFila.classList.remove("dummy");
      tabla.append(nuevaFila);
    }
  }
}
(async () => {
  await nuevaFila();
}
)();
