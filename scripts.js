const urlAPI = "http://localhost:3001/facturas";
const filadummy = document.querySelector(".dummy").cloneNode(true);

const facturas = fetch(urlAPI).then(respuesta => respuesta.json()).then(dato => dato);

async function nuevaFila() {
  let nuevaFila;
  const tabla = document.querySelector(".facturas");
  for (const factura of await facturas) {
    nuevaFila = filadummy.cloneNode(true);
    nuevaFila.classList.remove("ocultado", "dummy");
    tabla.append(nuevaFila);
  }
}
(async () => {
  await nuevaFila();
}
)();

filadummy.classList.add("ocultado");
