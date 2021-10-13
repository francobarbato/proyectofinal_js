let carrito = [];

if(localStorage.carrito != null){
    carrito = JSON.parse(localStorage.carrito);
    document.getElementById("contador").innerHTML = carrito.length;
}

class Antiparras{
    constructor(marca, nombre, precio, img) {
        this.marca = marca;
        this.nombre  = nombre;
        this.precio = precio;
        this.img = img;
    }    
}

const producto_uno = new Antiparras("Atomic", "HAWX 130+ ", "399", "../imagenes/hawx130.png");
const producto_dos = new Antiparras("Atomic", "HAWX 120 ", "250", "../imagenes/hawx120.png");
const producto_tres = new Antiparras("Atomic", "HAWX 130", "470", "../imagenes/hawx130.png");

const baseDeDatos = [producto_uno, producto_dos, producto_tres];

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
                    <h4 class="card-title titulos">${productos.nombre}</h4>
                    <p class="card-text parrafos">Hawx es una bota de esquí ligera, deportiva y de horma media con flexibilidad y comodidad para la montaña.</p>
                    <p class="card-text cardparrafo">$${productos.precio} </p>
                    <a href="#" type="button" class="btn btn-primary" id="button" onclick="agregar('${productos.marca}')">Agregar al carrito</a>
                </div>
            </div>
        </div>`
});
document.getElementById("cardsBotas").innerHTML = acumulador;

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