// SƏhifə yüklənəndə məhsulların localStorage-dan əldə edilməsi və səhifədə göstərilməsi
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

// Məhsul əlavə etmək üçün event listener
document.getElementById("add-product").addEventListener("click", addProduct);

// Məhsul əlavə etmə funksiyası
function addProduct() {
    const productName = document.getElementById("product-name").value;
    const productPrice = parseFloat(document.getElementById("product-price").value);

    if (productName === "" || isNaN(productPrice)) {
        alert("Məhsul adı və qiymətini düzgün daxil edin!");
        return;
    }

    const product = {
        name: productName,
        price: productPrice
    };

    let products = getProducts();
    products.push(product);
    saveProducts(products);
    displayProduct(product);
    updateSummary();

    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
}

// Məhsulu ekranda göstərmək funksiyası
function displayProduct(product) {
    const productList = document.getElementById("product-list");

    const productItem = document.createElement("div");
    productItem.className = "product-item";

    productItem.innerHTML = `
        <span>${product.name} (${product.price} AZN)</span>
        <button onclick="removeProduct('${product.name}')">Sil</button>
    `;

    productList.appendChild(productItem);
}

// Məhsulu silmək funksiyası
function removeProduct(name) {
    let products = getProducts();
    products = products.filter(product => product.name !== name);
    saveProducts(products);
    document.getElementById("product-list").innerHTML = "";
    loadProducts();
    updateSummary();
}

// Məhsulları localStorage-a saxlamaq funksiyası
function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

// Məhsulları localStorage-dan əldə etmək funksiyası
function getProducts() {
    const products = localStorage.getItem("products");
    return products ? JSON.parse(products) : [];
}

// Məhsulları səhifəyə yükləmək funksiyası
function loadProducts() {
    const products = getProducts();
    products.forEach(product => displayProduct(product));
    updateSummary();
}

// Məhsul sayını və ümumi qiyməti yeniləmək funksiyası
function updateSummary() {
    const products = getProducts();
    const totalCount = products.length;
    const totalPrice = products.reduce((total, product) => total + product.price, 0);

    document.getElementById("total-count").textContent = totalCount;
    document.getElementById("total-price").textContent = `${totalPrice} AZN`;
}
