function generateLayout(products) {
    const hook = document.getElementById("hook");

    if (!hook) {
        console.error("Element with ID 'hook' not found.");
        return;
    }

    hook.innerHTML = ""; // Clear existing content
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className =
            "flex flex-col justify-self-center h-[450px] w-[300px] bg-slate-500 rounded-xl p-2";

        const imageDiv = document.createElement("div");
        imageDiv.className = "h-[55%] w-[100%] bg-slate-900 rounded-xl  mb-2";
        const image = document.createElement('img');
        image.setAttribute('src', '')
        image.className = 'h-[100%] w-[100%] bg-slate-900 rounded-xl object-cover mb-2'
        imageDiv.appendChild(image)
        productDiv.appendChild(imageDiv);

        const infoDiv = document.createElement("div");
        infoDiv.className = "h-[43%] w-[100%] bg-slate-900 rounded-xl flex flex-col p-1";

        const nameAndPriceDiv = document.createElement("div");
        nameAndPriceDiv.className = "flex justify-between";

        const productName = document.createElement("h1");
        productName.className = "text-md font-bold ml-2 text-white";
        productName.textContent = product.name;
        nameAndPriceDiv.appendChild(productName);

        const productPrice = document.createElement("h2");
        productPrice.className = "text-lg mr-2 text-yellow-500";
        productPrice.textContent = `$${product.price}`;
        nameAndPriceDiv.appendChild(productPrice);

        infoDiv.appendChild(nameAndPriceDiv);

        const descriptionDiv = document.createElement("div");
        descriptionDiv.className =
            "max-w-full ml-2 h-full overflow-clip text-sm font-thin text-white";
        descriptionDiv.textContent = product.description;
        infoDiv.appendChild(descriptionDiv);

        const addToCartButton = document.createElement("button");
        addToCartButton.type = "button";
        addToCartButton.className = "add-to-cart w-full h-8 bg-slate-50 mb-2 rounded-lg text-center";
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.setAttribute("pid", product.id)
        infoDiv.appendChild(addToCartButton);

        productDiv.appendChild(infoDiv);
        hook.appendChild(productDiv);
    });
}


// Example data array of objects
const productsData = [
    {
        name: "Product 1",
        price: 799,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        id: 1,
    },
    {
        name: "Product 2",
        price: 799,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        id: 2,
    },

    // Add more products as needed
];

generateLayout(productsData);

document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsList = document.getElementById("cart-items");
    const cartItems = [];

    addToCartButtons.forEach(button => {
        button.addEventListener("click", event => {
            const productId = event.target.getAttribute("pid");
            const productName = event.target.parentElement.querySelector("h1").textContent;
            const productPrice = event.target.parentElement.querySelector("h2").textContent;

            if (!cartItems.includes(productId)) {
                cartItems.push(productId);


                // Display the product in the cart

                const cartItem = document.createElement("li");
                cartItem.textContent = productName;
                cartItemsList.appendChild(cartItem);
            }
        });
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsList = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");
    const cartItems = [];

    addToCartButtons.forEach(button => {
        button.addEventListener("click", event => {
            const productId = event.target.getAttribute("pid");
            const productName = event.target.parentElement.querySelector("h1").textContent;
            const productPrice = parseFloat(
                event.target.parentElement.querySelector("h2").textContent.replace("$", "")
            );

            const existingCartItem = cartItems.find(item => item.productId === productId);

            if (existingCartItem) {
                existingCartItem.quantity++;
                updateCartDisplay();
            } else {
                cartItems.push({ productId, productName, productPrice, quantity: 1 });
                updateCartDisplay();
            }
        });
    });

    function updateCartDisplay() {
        cartItemsList.innerHTML = "";
        let total = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement("li");
            cartItem.className = 'flex w-full h-[100px] justify-around mb-6'
            cartItem.innerHTML =
                `<div class = 'flex justify-evenly items-center'>
                                        <p class= ' text-md font-bold mr-8 '>${item.productName}</p>
                                        <p class= ' text-md font-bold mr-8 '>- $${item.productPrice.toFixed(2)}</p>
                                        <p class= ' text-md font-bold mr-8 '> x ${item.quantity}</p>
                                    </div>
            <button class="remove-item border w-[150px] border-teal-400 rounded-md bg-blue-700 text-white" data-productid="${item.productId}">Remove</button>`;
            cartItemsList.appendChild(cartItem);
            total += item.productPrice * item.quantity;
        });

        cartTotalElement.textContent = `$${total.toFixed(2)} `;

        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach(removeButton => {
            removeButton.addEventListener("click", event => {
                const productId = event.target.getAttribute("data-productid");
                const itemIndex = cartItems.findIndex(item => item.productId === productId);
                if (itemIndex !== -1) {
                    cartItems.splice(itemIndex, 1);
                    updateCartDisplay();
                }
            });
        });
    }

    checkoutButton.addEventListener("click", () => {
        console.log("Proceeding to checkout:", cartItems);
    });
});

const closeCartBtn = document.getElementById('close-cart');
const showCartBtn = document.getElementById('show-cart')
const cartScreen = document.getElementById('cart-screen');

closeCartBtn.addEventListener('click', () => {
    cartScreen.classList.add('invisible')
})
showCartBtn.addEventListener('click', () => {
    cartScreen.classList.remove('invisible')
})