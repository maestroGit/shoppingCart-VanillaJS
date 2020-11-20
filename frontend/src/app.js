// Aún poneindo el <script> del arcihivo js al final de códico html, añadimos event DOMContentLoaded
// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed,
// without waiting for stylesheets, images, and subframes to finish loading

document.addEventListener("DOMContentLoaded", () => {
  getData();
});

const productsContent = document.getElementById("contenedor-productos");
//console.log(productsContent);

const getData = async () => {
  try {
    const res = await fetch("../data/data.json");
    const data = await res.json();
    //console.log(data);
    showData(data);
    detectButtons(data);
  } catch (error) {
    console.log(error);
  }
};

const showData = async (data) => {
    // Con document.createElement() debería crea html y añadir las clases
  const templete = document.querySelector("#template-productos").content;
  console.log(templete);
  const fragment = document.createDocumentFragment();
  
  data.forEach((item) => {
    //console.log(item);
    templete.querySelector('img').setAttribute('src', item.thumbnailUrl);
    templete.querySelector('h5').textContent = item.title;
    templete.querySelector('p span').textContent = item.precio;
    // Al no poder añadir addEventListener incorporo dataset en el button
    templete.querySelector('button').dataset.id = item.id;

    // Node.cloneNode() method returns a duplicate of the node on which this method was called.
    // The newClone has no parent and is not part of the document, 
    // until it is added to another node that is part of the document 
    //(using Node.appendChild() or a similar method). 
    clone = templete.cloneNode(true);
    // Fragment almacena el contenido hasta q lo rendericemos todo junto después de recorrer todo el data con el ciclo forEach
    fragment.appendChild(clone);
  });
    // Una vez almacenado en fragment toda la estrutura la incorporamos al Dom
    productsContent.appendChild(fragment);

};

// Creamos un obj carrito
const carrito = {};

// Detectar el click en el btn y añadir addEventListener
const detectButtons = (data) => {
    const botones = document.querySelectorAll('.card-body button');
    console.log(botones);
    botones.forEach(bot => {
        bot.addEventListener('click', ()=>{
            console.log(bot.dataset.id)
            // Buscamos los datos del objeto q corresponde al btn clicado. 
            const producto = data.find(item => item.id === parseInt(bot.dataset.id));
            console.log(producto)
            // Tenemos q almacenar el producto en carrito 
            // Si exite la propiedad id incrementamos el atributo cantidad q creamos
            producto.cantidad = 1;
            //hasOwnProperty() method returns a boolean indicating whether the obj has the specified property as its own property
            if (carrito.hasOwnProperty(producto.id)){
                //console.log('existe');
                producto.cantidad = carrito[producto.id].cantidad + 1
                console.log('acumala '+producto.cantidad);
            }
            // si no existe lo añadimos al carrito
            carrito[producto.id] = {...producto}; // Hacemos un copia del ojt producto
            console.log(carrito);
            showShoppingCart(data);
        })
    })
}

const tableCart = document.getElementById('table-cart');

// Pinta  el carrito de compra con las compras
const showShoppingCart = () => {
  //Limpiamos tableCart para q no acumule
  tableCart.innerHTML = '';

  // Capturamos template q corresponde id="template-carrito"
  const template = document.getElementById('template-carrito').content;
  // Los cambios realizados en el fragmento no afectan al documento (incluso en el reflujo) ni generan ningún impacto en el rendimiento cuando se realizan cambios.
  const fragment = document.createDocumentFragment();
  // Añadimos en id='table-cart'
  // transformamos obj en array Object.values() method returns an array of a given object's own enumerable property values
  const arrayCarrito = Object.values(carrito);
  console.log(arrayCarrito);
  arrayCarrito.forEach(item => {
    console.log(item);
    template.querySelector('th').textContent = item.id;
    template.querySelectorAll('td')[0].textContent = item.title;
    template.querySelectorAll('td')[1].textContent = item.cantidad;
    template.querySelector('span').textContent =(item.cantidad)*(item.precio)

    clone = template.cloneNode(true);
    // Fragment almacena el contenido hasta q lo rendericemos todo junto después de recorrer todo el data con el ciclo forEach
    fragment.appendChild(clone);
  })
  tableCart.appendChild(fragment);
}


// !!! pendiente ordenar constantes en la parte superior

