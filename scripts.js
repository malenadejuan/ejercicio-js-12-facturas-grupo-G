const urlAPI = "http://localhost:3001/facturas";
const filadummy = document.querySelector(".dummy").cloneNode(true);
const hoy = luxon.DateTime.fromMillis(1542674993410);

const facturas = fetch(urlAPI).then(respuesta => respuesta.json()).then(dato => dato);

async function nuevaFila() {
  let nuevaFila;
  let fechaVencimiento;
  let fecha;
  const tabla = document.querySelector(".facturas");
  for (const factura of await facturas) {
    if (factura.tipo === "ingreso") {
      nuevaFila = filadummy.cloneNode(true);
      fechaVencimiento = luxon.DateTime.fromMillis(Number(factura.vencimiento));
      fecha = luxon.DateTime.fromMillis(Number(factura.fecha));
      nuevaFila.querySelector(".numero").textContent = factura.numero;
      nuevaFila.querySelector(".fecha").textContent = fecha.toLocaleString();
      nuevaFila.querySelector(".concepto").textContent = factura.concepto;
      nuevaFila.querySelector(".base").textContent = factura.base;
      const precioConIVA = `${Math.round((factura.tipoIva * factura.base) / 100)} € (21%)`;
      nuevaFila.querySelector(".iva").textContent = precioConIVA;
      const totalConIVA = `${Math.round(factura.base + ((factura.base * factura.tipoIva) / 100))} €`;
      nuevaFila.querySelector(".total").textContent = totalConIVA;
      nuevaFila.querySelector(".estado").textContent = factura.abonada;
      if (factura.abonada === false) {
        nuevaFila.querySelector(".estado").classList.add("noAbonada");
        nuevaFila.querySelector(".vence").textContent = fechaVencimiento.toLocaleString();
      } else {
        nuevaFila.querySelector(".vence").textContent = "-";
      }
      nuevaFila.classList.remove("dummy");
      tabla.append(nuevaFila);
    }
  }
}
(async () => {
  await nuevaFila();
}
)();
