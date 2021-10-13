let carrito = [];

if(localStorage.carrito != null){
    carrito = JSON.parse(localStorage.carrito);
    document.getElementById("contador").innerHTML = carrito.length;
}

class Cascos{
    constructor(marca, color, precio, img) {
        this.marca = marca;
        this.color  = color;
        this.precio = precio;
        this.img = img;
    }    
}

const producto1 = new Cascos("Shred", "Negro", "300", "../imagenes/shred1.jpg");
const producto2 = new Cascos("Salomon", "Rojo", "200", "../imagenes/shred2.jpg");
const producto3 = new Cascos("Blizzard", "Blanco", "450", "../imagenes/shred3.jpg");

const baseDeDatos = [producto1, producto2, producto3];

// Tarjetas
function tarjetas() {
    let acumulador=``

    baseDeDatos.forEach((productos)=> {
    acumulador += `
        <div class="col-12 col-md-4 mt-3 mt-md-5">
            <div class="card">
                <img src="${productos.img}" class="card-img-top">
                <div class="card-body">
                    <h3 class="card-title titulos">${productos.marca}</h3>
                    <p class="card-text cardparrafo">$${productos.precio} </p>
                    <a href="#" type="button" class="btn btn-primary" id="button" onclick="agregar('${productos.marca}')">Agregar al carrito</a>
                </div>
            </div>
        </div>`
});
$('#cards').html(acumulador)

}
tarjetas();

function agregar(marca){

    const productoEncontrado = baseDeDatos.find(productos => productos.marca === marca )

    if(productoEncontrado != undefined){
        carrito.push(productoEncontrado);
        guardarCarrito();
    }
     
    document.getElementById("contador").innerHTML = carrito.length;
    
    cradCarrito();

    precioTotal()
}


function cradCarrito() {

    $("#cardCarrito").html(``);
    
    for (let productos of carrito) {
        
        $("#cardCarrito").append(
            `<div class="card" id="${productos.marca}">
            <img src="${productos.img}" class="card-img-top">
            <div class="card-body">
            <h3 class="card-title titulos">${productos.marca}</h3>
            <p class="card-text parrafos">SHRED.wide | Antiparras diseñadas y fabricadas para maximizar tu campo de visión.</p>
            <p class="card-text cardparrafo">$${productos.precio} </p>
            <a href="#" type="button" class="btn btn-primary" id="button" onclick="eliminarDelCarrito('${productos.marca}')">Eliminar producto</a>
            </div>`);
            
        }
        precioTotal();
} 
    
cradCarrito();

function eliminarDelCarrito(marca) {

    carrito = carrito.filter(productos => productos.marca !== marca);

    const cardEliminada = document.getElementById(marca);
    
    cardEliminada.parentNode.removeChild(cardEliminada);  
    
    document.getElementById("contador").innerHTML = carrito.length;
    
    cradCarrito();
    
    guardarCarrito();
    
}
eliminarDelCarrito();

function guardarCarrito() {

    localStorage.carrito = JSON.stringify(carrito);
}

function precioTotal() {

    $("#total").html(``);
    
    for (let productos of carrito) {
        
        $("#total").append(
            `<div class="" id="${productos.marca}">
            <hr>
            <p>Precio total:'${productos.precio}'</p>
            </div>`);
            
        }
} 
        
precioTotal();