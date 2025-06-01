// Variables globales
const cartItems = [];
const cartItemsContainer = document.getElementById("cart-items");
const totalCostElement = document.getElementById("total-cost");
const checkoutButton = document.getElementById("checkout");

// Modal y formulario
const modal = document.getElementById("modal-pedido");
const closeBtn = document.querySelector(".close-button");
const pedidoForm = document.getElementById("pedido-form");
const confirmacion = document.getElementById("confirmacion");

// Función para actualizar el carrito
function updateCart() {
    cartItemsContainer.innerHTML = "";

    let total = 0;
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button class="remove-item" data-index="${index}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    totalCostElement.textContent = total.toFixed(2);

    // Agregar evento a los botones eliminar
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = parseInt(e.target.getAttribute("data-index"));
            removeItemFromCart(index);
        });
    });
}

// Agregar producto al carrito
function addToCart(name, price) {
    cartItems.push({ name, price });
    updateCart();
}

// Eliminar producto del carrito
function removeItemFromCart(index) {
    if (index >= 0 && index < cartItems.length) {
        cartItems.splice(index, 1);
        updateCart();
    }
}

// Evento para agregar al carrito (delegado)
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        const productElement = e.target.closest(".carousel-item");
        const productName = productElement.querySelector("h3").textContent;
        const productPrice = parseFloat(productElement.querySelector("p").textContent.replace("$", ""));
        addToCart(productName, productPrice);
    }
});

// Evento para mostrar modal al hacer clic en Finalizar Compra
checkoutButton.addEventListener("click", () => {
    if (cartItems.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de continuar.");
        return;
    }
    modal.classList.remove("hidden");
});

// Cerrar modal al hacer clic en la X
closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// Enviar formulario con fetch a FormSubmit y manejar confirmación
pedidoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("https://formsubmit.co/ajax/sandrapaolarodriuguez@gmail.com", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
            confirmacion.style.display = "block";
            this.reset();
            cartItems.length = 0;  // Vaciar carrito
            updateCart();

            setTimeout(() => {
                confirmacion.style.display = "none";
                modal.classList.add("hidden");
            }, 3000);
        } else {
            alert("Ocurrió un error al enviar el pedido. Intenta de nuevo.");
        }
    })
    .catch(() => {
        alert("Error de conexión. Intenta más tarde.");
    });
});

// Carrusel
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

function updateCarousel() {
    const itemWidth = items[0].clientWidth;
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);
