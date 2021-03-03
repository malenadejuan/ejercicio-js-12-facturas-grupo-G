const urlAPI = "http://localhost:3001/facturas";
const filadummy = document.querySelector(".dummy");
filadummy.cloneNode(true);

let facturas;
(async () => {
  const respuesta = await fetch(urlAPI);
  facturas = await respuesta.json();
}
)();

filadummy.textContent = ("");
filadummy.classList.add("ocultado");
