const urlAPI = "http://localhost:3001/facturas";
const filadummy = document.querySelector(".dummy").cloneNode(true);
const hoy = luxon.DateTime.now();

const facturas = fetch(urlAPI).then(respuesta => respuesta.json()).then(dato => dato);

async function nuevaFila() {
  let nuevaFila;
  let fechaVencimiento;
  let fecha;
  let totalSumaBase = 0;
  let totalSumaIVA = 0;
  let totalSumaTotal = 0;
  const tabla = document.querySelector(".facturas");
  for (const factura of await facturas) {
    if (factura.tipo === "ingreso") {
      nuevaFila = filadummy.cloneNode(true);
      fechaVencimiento = luxon.DateTime.fromMillis(Number(factura.vencimiento));
      fecha = luxon.DateTime.fromMillis(Number(factura.fecha));
      console.log(hoy.toLocaleString());
      nuevaFila.querySelector(".numero").textContent = factura.numero;
      nuevaFila.querySelector(".fecha").textContent = fecha.toLocaleString();
      nuevaFila.querySelector(".concepto").textContent = factura.concepto;
      nuevaFila.querySelector(".base").textContent = `${factura.base}€`;
      const precioConIVA = Math.round((factura.tipoIva * factura.base) / 100);
      nuevaFila.querySelector(".iva").textContent = `${precioConIVA}€ (21 %)`;
      const totalConIVA = Math.round(factura.base + ((factura.base * factura.tipoIva) / 100));
      nuevaFila.querySelector(".total").textContent = `${totalConIVA}€`;
      nuevaFila.querySelector(".estado").textContent = factura.abonada ? "Abonada" : "Pendiente";
      totalSumaBase += Number(factura.base);
      totalSumaIVA += precioConIVA;
      totalSumaTotal += totalConIVA;
      document.querySelector(".sumaTotalBase").textContent = `${totalSumaBase}€`;
      document.querySelector(".sumaTotalIVA").textContent = `${totalSumaIVA}€`;
      document.querySelector(".sumaTotalTotal").textContent = `${totalSumaTotal}€`;
      if (factura.abonada === true) {
        nuevaFila.querySelector(".vence").textContent = "-";
      } else {
        nuevaFila.querySelector(".estado").classList.add("noAbonada");
        nuevaFila.querySelector(".vence").textContent = fechaVencimiento.toLocaleString();

        if (hoy > fechaVencimiento) {
          const cuantosDiasHace = luxon.DateTime.fromMillis(hoy - fechaVencimiento);
          nuevaFila.querySelector(".vence").classList.add("vencida");
          nuevaFila.querySelector(".vence").textContent = `${fechaVencimiento.toLocaleString()} (Hace ${cuantosDiasHace.day} días)`;
        } else if (hoy <= fechaVencimiento) {
          const cuantosDiasFaltan = luxon.DateTime.fromMillis(fechaVencimiento - hoy);
          nuevaFila.querySelector(".vence").textContent = `${fechaVencimiento.toLocaleString()} (Faltan ${cuantosDiasFaltan.day} días)`;
        }
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
