// Variables globales
const cartItems = [];
const cartItemsContainer = document.getElementById("cart-items");
const totalCostElement = document.getElementById("total-cost");
const checkoutButton = document.getElementById("checkout");

// Función para actualizar el carrito
function updateCart() {
    // Limpiar el contenedor del carrito
    cartItemsContainer.innerHTML = "";

    // Agregar cada elemento al carrito
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

    // Actualizar el total
    totalCostElement.textContent = total.toFixed(2);

    // Agregar evento a los botones de eliminar
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            removeItemFromCart(index);
        });
    });
}

// Función para agregar un producto al carrito
function addToCart(name, price) {
    const item = { name, price };
    cartItems.push(item);
    updateCart();
}

// Función para eliminar un producto del carrito
function removeItemFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}
// Detectar clic en "Finalizar Compra"
document.getElementById("checkout").addEventListener("click", function () {
    const carritoItems = document.getElementById("cart-items").children;
    
    // Verificar si el carrito está vacío
    if (carritoItems.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de continuar.");
        return;
    }

    // Ocultar el carrito y mostrar el apartado de método de pago
    document.getElementById("carrito").classList.add("hidden");
    document.getElementById("metodo-pago").classList.remove("hidden");
});

// Procesar el método de pago
document.getElementById("form-pago").addEventListener("submit", function (e) {
    e.preventDefault();

    // Validar si se seleccionó un método de pago
    const metodoSeleccionado = document.querySelector('input[name="pago"]:checked');
    if (!metodoSeleccionado) {
        alert("Por favor, selecciona un método de pago.");
        return;
    }

    // Confirmación y reinicio del carrito
    alert(`Gracias por tu compra. Has elegido pagar con ${metodoSeleccionado.value}.`);
    
    // Ocultar método de pago, limpiar carrito y reiniciar estado
    document.getElementById("metodo-pago").classList.add("hidden");
    document.getElementById("carrito").classList.remove("hidden");
    document.getElementById("cart-items").innerHTML = ""; // Limpiar el carrito
    document.getElementById("total-cost").textContent = "0.00";
});

// Evento para los botones "Agregar al carrito"
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        const productElement = e.target.closest(".carousel-item");
        const productName = productElement.querySelector("h3").textContent;
        const productPrice = parseFloat(productElement.querySelector("p").textContent.replace("$", ""));
        addToCart(productName, productPrice);
    }
});


// Evento para finalizar la compra
checkoutButton.addEventListener("click", () => {
    if (cartItems.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    // Aquí puedes agregar la lógica para procesar el pedido
    alert("Compra realizada con éxito.");
    cartItems.length = 0; // Vaciar el carrito
    updateCart();
});


const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

// Función para actualizar la posición del carrusel
function updateCarousel() {
    const itemWidth = items[0].clientWidth;
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Evento para el botón "anterior"
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    updateCarousel();
});

// Evento para el botón "siguiente"
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

// Ajustar el carrusel al redimensionar la ventana
window.addEventListener('resize', updateCarousel);

document.getElementById("pedido-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch("https://formsubmit.co/ajax/sandrapaolarodriuguez@gmail.com", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("confirmacion").style.display = "block";
            form.reset();
        } else {
            alert("Ocurrió un error al enviar el pedido. Intenta de nuevo.");
        }
    })
    .catch(error => {
        alert("Error de conexión. Intenta más tarde.");
        console.error(error);
    });
});
// Obtener elementos del DOM
const modal = document.getElementById("modal-pedido");
const closeBtn = document.querySelector(".close-button");
const checkoutButton = document.getElementById("checkout");
const pedidoForm = document.getElementById("pedido-form");
const confirmacion = document.getElementById("confirmacion");

// Mostrar el modal al hacer clic en "Finalizar Compra"
checkoutButton.addEventListener("click", () => {
    if (cartItems.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de continuar.");
        return;
    }
    modal.classList.remove("hidden");
});
// Cerrar el modal al hacer clic en la X
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Enviar el formulario y mostrar mensaje de confirmación
pedidoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Aquí puedes agregar lógica para enviar los datos del formulario si es necesario

  confirmacion.style.display = "block";

  // Simula el envío con FormSubmit
  this.submit();

  setTimeout(() => {
    confirmacion.style.display = "none";
    modal.classList.add("hidden");
    this.reset();
    cartItems.length = 0;
    updateCart();
  }, 3000);
});
