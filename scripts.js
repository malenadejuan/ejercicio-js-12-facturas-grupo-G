const urlAPI = "http://localhost:3001/facturas";
let facturas;

(async () => {
  const respuesta = await fetch(urlAPI);
  facturas = await respuesta.json();
}
)();
