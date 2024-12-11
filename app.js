const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })   
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })   
}

let users = JSON.parse(localStorage.getItem("usersData")) || [];

function singup() {
    const adminEmail="admin@gmail.com"
    const arrObj = {
        fname: document.getElementById("signup-fname").value.trim(),
        lname: document.getElementById("signup-lname").value.trim(),
        email: document.getElementById("signup-email").value.trim(),
        password: document.getElementById("signup-password").value.trim(),
    };


    if (!arrObj.fname || !arrObj.lname || !arrObj.email || !arrObj.password) {
        alert("Please fill all fields correctly.");
        return;
    }
    if (arrObj.email === adminEmail) {
        alert("This email is reserved for admin. Please use a different email.");
        return;
    }
    
    if (users.some(user => user.email === arrObj.email)) {
        alert("Email already exists. Please choose a different Email.");
        return;
    }

    // Add User and Save to LocalStorage
    users.push(arrObj);
    localStorage.setItem("usersData", JSON.stringify(users));
    alert("Signup successful!");
    window.location.href = "./login.html";
}


function login() {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "123";
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    let loginSuccess = false;
    let isAdmin = false;
    let userName = "";

    if (email === adminEmail && password === adminPassword) {
        loginSuccess = true;
        isAdmin = true;
        userName = "Admin";
    } else {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            loginSuccess = true;
            userName = `${user.fname} ${user.lname}`;
        }
    }

    if (loginSuccess) {
        alert("Login successful!");
        localStorage.setItem("currentLogin", JSON.stringify({ name: userName, email: email, password: password }));

        if (isAdmin) {
            window.location.href = "./admin.html";
        } else {
            window.location.href = "./ecommerce/e.html";
        }
    } else {
        alert("Invalid email or password. Please try again.");
    }
}


function logout() {
    alert("Logout successful!");
    window.location.href = "./../login.html";
}


function loadUsers() {
    const usersTableBody = document.getElementById("usersTable").getElementsByTagName("tbody")[0];
    usersTableBody.innerHTML = ""; 

    for (let index = 0; index < users.length; index++) {
        const user = users[index];
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.fname}</td>
            <td>${user.lname}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>
                <button class="btn btn-edit" onclick="editUser(${index})">Edit</button>
                <button class="btn btn-delete" onclick="deleteUser(${index})">Delete</button>
            </td>
        `;

        usersTableBody.appendChild(row);
    }
}

function editUser(index) {
    const user = users[index];

    
    document.getElementById("editFirstName").value = user.fname;
    document.getElementById("editLastName").value = user.lname;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editPassword").value = user.password;

   
    document.getElementById("editUserForm").style.display = "block";
    document.getElementById("usersTable").style.display = "none";

   
    document.getElementById("editUserForm").onsubmit = function(event) {
        if (event) event.returnValue = false; 
        saveEdit(index);
    };
}

// Save Edited User
function saveEdit(index) {
    const updatedFname = document.getElementById("editFirstName").value;
    const updatedLname = document.getElementById("editLastName").value;
    const updatedEmail = document.getElementById("editEmail").value;
    const updatedPassword = document.getElementById("editPassword").value;

    if (updatedFname && updatedLname && updatedEmail && updatedPassword) {
        users[index] = { fname: updatedFname, lname: updatedLname, email: updatedEmail, password: updatedPassword };
        localStorage.setItem("usersData", JSON.stringify(users)); 
        loadUsers();

        alert("User updated successfully.");

        cancelEdit(); 
    } else {
        alert("All fields are required.");
    }
}


function cancelEdit() {
    document.getElementById("editUserForm").style.display = "none";
    document.getElementById("usersTable").style.display = "table";
}


function deleteUser(index) {
    if (confirm("Are you sure you want to delete this user?")) {
        users.splice(index, 1);
        localStorage.setItem("usersData", JSON.stringify(users));
        loadUsers();
        alert("User deleted successfully.");
    }
}


function loadOrders() {
    const ordersTableBody = document.getElementById("ordersTable").getElementsByTagName("tbody")[0];
    ordersTableBody.innerHTML = ""; 

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const userOrders = JSON.parse(localStorage.getItem(`${user.email}-orders`)) || [];

        for (let j = 0; j < userOrders.length; j++) {
            const order = userOrders[j];
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${user.email}</td>
                <td>${order.name}</td>
                <td>${order.quantity}</td>
                <td>${order.totalPrice} PKR</td>
            `;

            ordersTableBody.appendChild(row);
        }
    }
}



function addNewUser(event) {
    if (event) event.returnValue = false;

    const fname = document.getElementById("firstName").value;
    const lname = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (fname && lname && email && password) {
        const newUser = { fname, lname, email, password };
        users.push(newUser);
        localStorage.setItem("usersData", JSON.stringify(users));
        loadUsers();


        document.getElementById("addUserForm").reset();
        alert("User added successfully.");
    } else {
        alert("All fields are required.");
    }
}

function initializeDashboard() {
    if (window.location.href.indexOf("admin.html") !== -1) {
        loadUsers(); 
        loadOrders(); 


        document.getElementById("addUserForm").onsubmit = addNewUser;
    }
}

initializeDashboard();




const products = [
    {
        id: 1,
        brand: "adidas",
        name: "Cartoon Astronaut T-Shirt 1",
        image: "./images/f1.jpg",
        price: 999,
        rating: 5,
    },
    {
        id: 2,
        brand: "adidas",
        name: "Cartoon Astronaut T-Shirt 2",
        image: "./images/f2.jpg",
        price: 999,
        rating: 5,
    },
    {
        id: 3,
        brand: "adidas",
        name: "Cartoon Astronaut T-Shirt 3",
        image: "./images/f3.jpg",
        price: 999,
        rating: 5,
    },
    {
        id: 4,
        brand: "adidas",
        name: "Cartoon Astronaut T-Shirt 4",
        image: "./images/f4.jpg",
        price: 999,
        rating: 5,
    },
    {
        id: 5,
        brand: "adidas",
        name: "Cartoon Astronaut T-Shirt 5",
        image: "./images/f5.jpg",
        price: 999,
        rating: 5,
    },
    {
        id: 6,
        brand: "adidas",
        name: "Cartoon Astronaut T-Shirt 6",
        image: "./images/f6.jpg",
        price: 999,
        rating: 5,
    },
    {
        id: 7,
        brand: "adidas",
        name: "Cartoon Astronaut T-Shirt 7",
        image: "./images/n8.jpg",
        price: 999,
        rating: 5,
    },
    {
        id: 8,
        brand: "adidas",
        name: "Cartoon Astronaut T-Shirt 8",
        image: "./images/f8.jpg",
        price: 999,
        rating: 5,
    },
];

function displayProducts() {
    const container = document.getElementsByClassName("pro-container")[0];
    products.forEach(function (product) {

        const productCard = document.createElement("div");
        productCard.className = "pro";

    
        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;
        productCard.appendChild(productImage);

      
        const description = document.createElement("div");
        description.className = "des";

 
        const brand = document.createElement("span");
        brand.textContent = product.brand;
        description.appendChild(brand);


        const productName = document.createElement("h5");
        productName.textContent = product.name;
        description.appendChild(productName);

 
        const starContainer = document.createElement("div");
        starContainer.className = "star";
        for (let i = 0; i < product.rating; i++) {
            const star = document.createElement("i");
            star.className = "fas fa-star";
            starContainer.appendChild(star);
        }
        description.appendChild(starContainer);

 
        const price = document.createElement("h4");
        price.textContent = `${product.price} PKR`;
        description.appendChild(price);

        productCard.appendChild(description);

        const cartLink = document.createElement("a");
        cartLink.href = "#";
        const cartIcon = document.createElement("i");
        cartIcon.className = "fal fa-shopping-cart cart";
        cartLink.appendChild(cartIcon);
        productCard.appendChild(cartLink);

  
        cartLink.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Product added to your cart!");

          
            const currentUser = JSON.parse(localStorage.getItem("currentLogin"));

            if (currentUser) {
               
                let currentUserData = JSON.parse(localStorage.getItem(currentUser.email)) || { cartProducts: [] };

                
                let productInCart = currentUserData.cartProducts.find(p => p.id === product.id);
                if (productInCart) {
                  
                    productInCart.quantity += 1;
                    productInCart.totalPrice = productInCart.price * productInCart.quantity;
                } else {
                    
                    currentUserData.cartProducts.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1, 
                        totalPrice: product.price, 
                    });
                }

          
                localStorage.setItem(currentUser.email, JSON.stringify(currentUserData));
            } else {
                alert("Please log in to add items to your cart.");
            }
        });

  
        container.appendChild(productCard);
    });
}
window.onload = function () {
    displayProducts();
};

function displayCartItems() {
    const currentUser = JSON.parse(localStorage.getItem("currentLogin"));
    
    if (currentUser) {
       
        let currentUserData = JSON.parse(localStorage.getItem(currentUser.email)) || { cartProducts: [] };
        const cartProducts = currentUserData.cartProducts;

        if (cartProducts.length === 0) {
            document.getElementById("cartItemsContainer").innerHTML = "<p>Your cart is empty.</p>";
            document.getElementById("totalAmount").textContent = "0 PKR";
            return;
        }

        const cartItemsContainer = document.getElementById("cartItemsContainer");
        cartItemsContainer.innerHTML = ""; 
        let totalAmount = 0;

        cartProducts.forEach((product, index) => {
            const row = document.createElement("div");
            row.className = "cart-item";

     
            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.min = 1;
            quantityInput.value = product.quantity;
            quantityInput.dataset.index = index;
            quantityInput.className = "quantity-input";

           
            quantityInput.addEventListener("change", function () {
                const newQuantity = parseInt(this.value);
                if (newQuantity > 0) {
                    product.quantity = newQuantity;
                    product.totalPrice = product.price * newQuantity;
                    localStorage.setItem(currentUser.email, JSON.stringify(currentUserData));
                    displayCartItems(); 
                } else {
                    alert("Quantity must be at least 1.");
                    this.value = product.quantity; 
                }
            });

            
            row.innerHTML = `
                <span>${product.name}</span>
                <span>${product.totalPrice} PKR</span>
            `;
            
            row.insertBefore(quantityInput, row.children[1]);
            cartItemsContainer.appendChild(row);

            totalAmount += product.totalPrice;
        });

        document.getElementById("totalAmount").textContent = `${totalAmount} PKR`;
    } 
    
}

function processCheckout(action) {
    const currentUser = JSON.parse(localStorage.getItem("currentLogin"));

    if (!currentUser) {
        alert("Please log in to proceed.");
        return;
    }

    const userCart = JSON.parse(localStorage.getItem(currentUser.email))?.cartProducts || [];
    if (userCart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    if (action === "proceed") {
        alert("Order processed successfully!");


        const currentOrders = JSON.parse(localStorage.getItem(`${currentUser.email}-orders`)) || [];
        currentOrders.push(...userCart); 

        
        localStorage.setItem(`${currentUser.email}-orders`, JSON.stringify(currentOrders));

       
        localStorage.setItem(currentUser.email, JSON.stringify({ cartProducts: [] }));


        displayCartItems();  
    } else if (action === "cancel") {
        if (confirm("Are you sure you want to cancel your order?")) {
            localStorage.setItem(currentUser.email, JSON.stringify({ cartProducts: [] }));
            alert("Order canceled.");

            displayCartItems();  
        }
    }
}


displayCartItems();




