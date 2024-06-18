document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories');
    const productsContainer = document.getElementById('products');
    const productsModal = new bootstrap.Modal(document.getElementById('productsModal'));

    // Función para obtener categorías y productos
    const fetchCategoriesAndProducts = async () => {
        try {
            const response = await fetch('https://api.ejemplo.com/categorias'); // Reemplaza con tu API real
            const data = await response.json();

            // Iterar sobre las categorías y crear tarjetas
            data.categories.forEach(category => {
                const categoryCard = createCategoryCard(category);
                categoriesContainer.appendChild(categoryCard);
            });
        } catch (error) {
            console.error('Error fetching categories and products:', error);
        }
    };

    // Función para crear una tarjeta de categoría
    const createCategoryCard = (category) => {
        const card = document.createElement('div');
        card.className = 'col-md-4';

        card.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <div class="card-header">
                    <h4 class="my-0 font-weight-normal">${category.name}</h4>
                </div>
                <div class="card-body">
                    <button class="btn btn-primary btn-block" onclick="showProducts(${category.id})">Ver productos</button>
                </div>
            </div>
        `;

        return card;
    };

    // Función para mostrar productos en el modal
    window.showProducts = async (categoryId) => {
        try {
            const response = await fetch(`https://api.ejemplo.com/categorias/${categoryId}/productos`); // Reemplaza con tu API real
            const products = await response.json();

            // Limpiar el contenedor de productos
            productsContainer.innerHTML = '';

            // Iterar sobre los productos y crear tarjetas
            products.forEach(product => {
                const productCard = createProductCard(product);
                productsContainer.appendChild(productCard);
            });

            // Mostrar el modal
            productsModal.show();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Función para crear una tarjeta de producto
    const createProductCard = (product) => {
        const card = document.createElement('div');
        card.className = 'col-md-4';

        card.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>Precio:</strong> $${product.price}</p>
                </div>
            </div>
        `;

        return card;
    };

    // Llamar a la función para obtener y mostrar las categorías y productos
    fetchCategoriesAndProducts();
});
