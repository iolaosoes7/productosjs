console.log("app.js funcionando");

document.addEventListener('DOMContentLoaded', () => {
    const categoriasContainer = document.getElementById('categoriasRow');
    const productosContainer = document.getElementById('productosRow');
    const productsDesc = document.getElementById('productsDesc');
    const productModal = new bootstrap.Modal(document.getElementById('descProductModal'));


    // Función para obtener categorías y productos
    const obtenerCategorias = async () => {
        try {
            const data = await fetch('https://fakestoreapi.com/products/categories')
                            .then(res=>res.json());
                    
            //console.log(data);
            // Iterar sobre las categorías y crear tarjetas
            data.forEach(categoria => {
                //console.log(categoria.toUpperCase())
                const categoriaCard = createCategoryCard(categoria);
                categoriasContainer.appendChild(categoriaCard);
            });
        } catch (error) {
            console.error('No se pudo obtener las categorias:', error);
        }
    };

    // Función para crear una tarjeta de categoría
    const createCategoryCard = (categoria) => {
        
        const card = document.createElement('div');
        card.className = 'col-md-3';

        card.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <div class="card-body">
                    <div class="d-grid gap-2">    
                        <button class="btn btn-success btn-lg" onclick="showProducts(&quot;${categoria}&quot;)">${categoria.toUpperCase()}</button>
                    </div>
                </div>
            </div>
        `;

        return card;
    };

    // Función para mostrar productos 
    window.showProducts = async (categoria) => {
        //console.log(categoria);
        try {
            // Escapamos la categoría para que sea segura en la URL
            const encodedCategoria = encodeURIComponent(categoria);

            // Construimos la URL con la categoría escapada
            const url = `https://fakestoreapi.com/products/category/${categoria}`;
            //console.log(url);
            
            const productos = await fetch(url)
                                .then(res=>res.json());             

            // Limpiar el contenedor de productos
            productosContainer.innerHTML = '';

            // Iterar sobre los productos y crear tarjetas
            productos.forEach(producto => {
                //console.log(producto);
                const productoCard = createProductCard(producto);
                productosContainer.appendChild(productoCard);
            }); 

        } catch (error) {
            console.error('Error fetching products:', error);
        } 
    };

    // Función para crear una tarjeta de producto
    const createProductCard = (product) => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';

        card.innerHTML = `
            <div class="card mb-4 shadow-sm product-card">
                <div class="card-header text-end">
                    Stock:</strong> ${product.rating.count}
                </div>
                <img src="${product.image}" class="card-img-top product-image" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <hr>
                    <p class="card-text"><strong>Precio:</strong> $${product.price}</p>
                    <p class="card-text"><strong>Impuesto:</strong> $${product.rating.rate}</p>
                    <div class="d-grid gap-2">    
                        <button class="btn btn-success btn-lg" onclick="showProductsDesc(${product.id})">Descripción</button>
                    </div>
                </div>
            </div>
        `;

        return card;
    };

    // Función para mostrar la descripcion del producto en un modal  
    window.showProductsDesc = async (producId) => {
        
        try {
            const data = await fetch(`https://fakestoreapi.com/products/${producId}`)
                            .then(res=>res.json());
            
            const modalCard = createProductDescCard(data);
            productsDesc.innerHTML = modalCard;

        } catch (error) {
            console.error('No se pudo obtener el Producto:', error);   
        }

        productModal.show();

    };

    const createProductDescCard = (product) => {

        //console.log(product);
        const tarjetaProducto = `
            <div class="col-md-12"
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <br>
                        <p class="card-text">${product.description}</p>
                        <br>
                        <p class="card-text"><strong>Precio:</strong> $${product.price}</p>
                    </div>
                </div>
            </div>
        `;  

        return tarjetaProducto;
    };
    // Llamar a la función para obtener y mostrar las categorías y productos
    obtenerCategorias();
});
