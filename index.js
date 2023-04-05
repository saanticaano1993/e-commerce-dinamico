

//1-mostrar y ocultar carrito
//Variable donde se hara click para mostrar u ocultar el carrito
const btnCart = document.querySelector('.container_icon_div');
//Div Contenedor del carrito que mostraremos y ocultaremos
const containerCartProductos = document.querySelector('.container-cart-products');

//Añadimos evento listener al boton cart que ejecutara 
//una funcion cuando se haga click sobre el 
btnCart.addEventListener('click', () => {
    //una vez el usuario ha hecho click en el boton
    //previamente seleccionado se ejecuta la funcion 
    //.classList.toggle y activamos el interruptor
    //en nuestra doble clase previamente asignada con 
    //el display none en este caso Hidden-cart
    
    containerCartProductos.classList.toggle('hidden-cart');

})

//1-mostrar y ocultar el menu
//Variable donde se almacen al boton donde se hara click para mostrar u ocultar el menu
const menu = document.querySelector('.icono_burguer');
//Div Contenedor del menu que mostraremos y ocultaremos
const menuResponsive = document.querySelector('.menu_nav');


//Añadimos evento listener al boton menu que ejecutara 
//una funcion cuando se haga click sobre el
menu.addEventListener('click', () => {
    //una vez el usuario ha hecho click en el boton
    //previamente seleccionado se ejecuta la funcion 
    //.classList.toggle y activamos el interruptor
    //en nuestra doble clase previamente asignada con 
    //el display none en este caso menu-hidden
    menuResponsive.classList.toggle('menu_hidden');

});

//carrito

//Impostante poner .para que seleccione la clase de nuestro html
const cartInfo = document.querySelector('.cart-product');

//div donde insertaremos los diferentes elementos del carrito 
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos

const productsList = document.querySelector('.container_productos');

//variable para el contenedor de productos 


//variable para el texto de carrito vacio

const empty_car = document.querySelector('.empty_car');



console.log(productsList);

//variable de array de productos añadidos al carrito
let allProducts  = []


//variable que trae el total a pagar de nuestro carrito

const valorTotal = document.querySelector('.total-pagar');

//variable que trae el numero de articulos añadidos al articulo 

const countProducts = document.querySelector('.contador_productos');



//atrapamos los clicks del addEventListener inspeccionamos en chrome y le damos a console
//e.target nos toma el elemento concreto de nuestro div
//por ejemplo la imagen o el boton
//e.target.classlist nos dira la clase del evento sobre el que hacemos click
//.contains('btn_add_cart') nos devuelve un booleano diciendonos si contiene la clase 
//se debe añadir una clase al boton previamente

productsList.addEventListener('click',e =>{

  

    //comprobamos si hemos dado click sobre el boton de añadir al carrito 
    //es decir si es true 
    if(e.target.classList.contains('btn_add_cart')){
     
        //accedemos al div padre del boton es decir al div que contiene al producto
        console.log(e.target.parentElement);

        // guardamos el elemento padre en una variable 

        const product = e.target.parentElement;

        //creamos objeto de producto 

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        }

        //cuidado con el simbolo del euro para luego poder operar 
        console.log(infoProduct);

        //de esta manera añado al  array de productos el producto nuevo

        //comprobamos si ya hemos añadido previamente un producto 

        const exists = allProducts.some(product => product.title === infoProduct.title);

        if(exists){
            //si existe mapeamos nuestro array de carrito y modificamos la cantidad 
            // del producto y actualizamos el carrito sin añadir ningun elemento nuevo

            const products = allProducts.map(product =>{
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product;
                }else{
                    return product;
                }
            })
            console.log('esta');
            
            allProducts = [...products];
        }
        else{
            console.log('no esta');
            //si no estaba en nuestro carrito 
            allProducts = [...allProducts, infoProduct];
        }

       
      

       

        
        showHTML();
        //añadimos el html llamando a la funcion ShowHtml
        
        //comprobamos que nos esta agregando productos al array de productos
        console.log(allProducts);



        // -----Sacar Src Img para mostrarla en el carrito----- 
        //accedemos al elemento abuelo del boton que contiene a product y la imagen
        console.log(product.parentElement);
        //guardamos al elemento abuelo en una variable
        const parentProduct = product.parentElement;
        //accedemos al primer hijo figure
        const parentFigure = parentProduct.children[0];
        //accedemos al primer hijo de figure que es img y sacamos el contenid de src
        //para almacenarlo en una variable
        //para  parentProduct.children[0].src
        const img = parentFigure.firstElementChild.src;
        
        
        console.log(img);

    }
    
});

//eliminamos un producto 
//añadimos un evento listener de tipo click a cada row de nuestro producto
//comprobamos si el click se ha hecho en el icono de eliminar producto 
rowProduct.addEventListener('click' ,(e) => {
    if(e.target.classList.contains('icon_close')){
        //nos dirigimos al elemento padre y guardamos el titulo lo logico es tener un id determinado
        const producto = e.target.parentElement;
        //aplicamos .trim() para ocultar espacios en caso de que existan
        //si tenemos espacios no nos podra comparar correctamente en la funcion.filters
        const n_product = producto.querySelector('p').textContent.trim();
        console.log(n_product);
        console.log(n_product.length);
        //
        
        //buscamos en el array el elemento con titulo igual y lo eliminamos de la lista de articulos del carrito
        //lo suyo es que cada  elementos tuviesen un ID unico 
        allProducts = allProducts.filter(
            product => product.title !== n_product
        );

        showHTML();
        console.log(allProducts);
        //llamamos a la funcion showHTML para que vuelva a actualizar los elementos del carrito quitando
        //el articulo que acabamos de eliminar 
        
    }
    
});


//Funcion para añadir html a nuestro carrito con productos nuevos 

const showHTML = () =>{

    //modificamos la propiedad display para mostrar solo el texto de carrito vacio cuando 
    //esta vacio por eso comprobamos que no hay ningun articulo en el carrito

    if(allProducts.length==0){
        empty_car.style.display = 'block';
    }else{
        empty_car.style.display = 'none';
    }
   

    //colocamos texto si no tenemos nada en el carrito
    //comprobamos si esta vacio comprobando que no nuestro array de articulos no tiene elementos

    
    let total = 0; 
    let totalOfProducts = 0;

    //limpiamos el html contenido en rowproduct

    rowProduct.innerHTML = '';
    //recorremos el array de productos con el metodo foreach
    allProducts.forEach(product =>{

        //creamos con el dom un nuevo elemento html de tipo div
        const productoCreado = document.createElement('div');

        //le damos la clase cart-product que es la que hemos añadido al css
        //para darle estilos
        productoCreado.classList.add('cart-product');

        //añadimos la informacion dinamicamente con los elementos de nuestro producto
        //utilizando innerHtml
        //copiamos nuestro div previamente maquetado
        //añadimos la informacion de nuestro elemento dentro del div con ${objeto.variabl}

        productoCreado.innerHTML = `
        <div class="info-cart-product">
             <span class="cantidad-producto-carrito">
                     ${product.quantity}
            </span>
             <p class="titulo-producto-carrito">${product.title}</p>
            <span class="precio-producto-carrito">${product.price}</span>

              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon_close">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
             </svg>

        `

        //añadimos al html nuestro innerHtml con el metodo append
        //para añadirlo usamos rowproduct(que es el contenedor de productos previamente creado
        // en el html  y almacenado en el js )
        

        rowProduct.append(productoCreado);

        total = total + parseInt(product.quantity * product.price.slice(1));

        totalOfProducts = totalOfProducts + product.quantity;


    });

    //modificamos el valor del total a pagar con la suma del coste total de los
    //añadidos al carrito  y el numero total de articulos

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;

};

//llamamos para que nos ordene la primera vez que entramos en la web el carrito
showHTML();