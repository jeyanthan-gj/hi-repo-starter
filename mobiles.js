document.addEventListener("DOMContentLoaded", function() {
    fetch('get_brands.php')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched brands:', data); // Add this line
            const productsContainer = document.getElementById('products-container');
            data.forEach(brand => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <a href="products.php?brand=${brand.brand}">
                        <img src="${brand.brand_logo}" alt="${brand.brand}">
                        <p>${brand.brand}</p>
                    </a>
                `;
                productsContainer.appendChild(productItem);
            });
        })
        .catch(error => console.error('Error fetching brands:', error));
});