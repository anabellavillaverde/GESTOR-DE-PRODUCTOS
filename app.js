const formulario = document.getElementById("formulario");
const nombreInput = document.getElementById("nombre");
const categoriaInput = document.getElementById("categoria");
const precioInput = document.getElementById("precio");
const tabla = document.getElementById("tabla-productos");

let productos = JSON.parse(localStorage.getItem("productos")) || [];

//muestra los productos en la tabla
function mostrarProductos() {
  tabla.innerHTML = "";

  productos.forEach((producto, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${producto.nombre}</td>
      <td>${producto.categoria}</td>
      <td>$${producto.precio}</td>
      <td><button onclick="eliminarProducto(${index})">🗑️</button></td>
    `;

    tabla.appendChild(fila);
  });
}

//localStorage
function guardarEnLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

//elimina un producto
function eliminarProducto(indice) {
  productos.splice(indice, 1);
  guardarEnLocalStorage();
  mostrarProductos();
}

//formulario
formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const categoria = categoriaInput.value;
  const precio = parseFloat(precioInput.value);

  if (nombre === "" || categoria === "" || isNaN(precio)) {
    alert("Por favor completá todos los campos correctamente.");
    return;
  }

  const producto = {
    nombre,
    categoria,
    precio
  };

  //array
  productos.push(producto);
  guardarEnLocalStorage();
  mostrarProductos();

  formulario.reset();
});

mostrarProductos();
