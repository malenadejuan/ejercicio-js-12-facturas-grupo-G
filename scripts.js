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
      const precioConIVA = `${Math.round((factura.tipoIva * factura.base) / 100)} € (21%)`;
      nuevaFila.querySelector(".iva").textContent = precioConIVA;
      const totalConIVA = `${Math.round(factura.base + ((factura.base * factura.tipoIva) / 100))} €`;
      nuevaFila.querySelector(".total").textContent = totalConIVA;
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
