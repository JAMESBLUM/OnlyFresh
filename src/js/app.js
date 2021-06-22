/*============== VARIABLES GLOBALES ==============*/
const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer'); //Contenedor donde se agregaran los items del carrito
/*======================================================================*/
const addShoppingCart = document.querySelectorAll('.addToCart'); //Boton de agregar al carrito
addShoppingCart.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartCliked);
});

function addToCartCliked(e) {
    //====== CAPTURA EL EVENTO DEL TARGET ====== 
    const button = e.target;
    const item = button.closest('.producto'); // Cuando das click en el btn toma todo el elemento con clase ".producto" que tenga mas cerca

    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-imagen').src;
    guardar_localStorage(itemTitle, itemPrice, itemImage);    
}
function guardar_localStorage(itemTitle, itemPrice, itemImage){
   localStorage.setItem("srcImagen",itemImage);
   localStorage.setItem("tituloProducto",itemTitle);
   localStorage.setItem("PrecioProducto",itemPrice);
   obtener_localStorage();
}
function obtener_localStorage(){
   const titulo = localStorage.getItem("tituloProducto");
   const precio = localStorage.getItem("PrecioProducto")
   const imagen = localStorage.getItem("srcImagen");
   addItemToShoppingCart(imagen, titulo, precio);
}


function addItemToShoppingCart(imagen, titulo, precio){
    const shoppingCartRow = document.createElement('DIV');
    const shoppingCartContent = `
    <div class="carritoComprar-Item shoppingCartItems">
        <div class="carritoComprar-Image">
            <div><img src=${imagen} alt=""></div>
            <h6>${titulo}</h6>
        </div>
        <div class="carritoComprar-price">
            <h6 class="shoppingCartItemPrice">${precio}</h6>
            </div>
        <div class="carritoComprar-cantidad">
            <input type="number" min="1" max="20" value="1" class="shoppingCartItemQuantity">
            <button type="button" class="btn-delete">X</button>
        </div>
        <div>

        </div>
    </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);
    updateShoppingCartTotal();
}; 
function updateShoppingCartTotal(){
    let total = 0; 
    const shoppingCartTotal = document.querySelector(".shoppingCartTotal");

    const shoppingCartItems = document.querySelectorAll(".shoppingCartItems")
    shoppingCartItems.forEach(shoppingCartItem =>{
       const shoppingCartItemPriceElement = shoppingCartItem.querySelector(".shoppingCartItemPrice");
       const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$','',).replace('kg',''));

       const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
       const shoppingCartItemQuantity =Number(shoppingCartItemQuantityElement.value);

       total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `<div class="shoppingCartTotal">
                                        <div><p>Total:</p></div>
                                        <div><p>$${total.toFixed(2)}</p></div>
                                    </div>`;
}

