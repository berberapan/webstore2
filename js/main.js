
// Form validation. 
function checkInput(userInput, rule) {
    userInput.addEventListener('input', function(){
        if(rule.test(userInput.value)) {
            userInput.classList.remove('is-invalid')
            userInput.classList.add('is-valid')
        } else {
            userInput.classList.remove('is-valid')
            userInput.classList.add('is-invalid')
        }
    })
}

const nameInput = document.getElementById('namn')
const validName = /^[\p{L}\p{M}\-]{2,}\s[\p{L}\p{M}\-]{2,}$/iu
checkInput(nameInput, validName)

const phoneInput = document.getElementById('telefon')
const validPhone = /^[\d()-]{10,}$/
checkInput(phoneInput, validPhone)

const emailInput = document.getElementById('email')
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
checkInput(emailInput, validEmail)

const addressInput = document.getElementById('adress')
const validAddress = /^[\p{L}\p{M}0-9\s-]{2,50}\s[\d]{5,5}\s[\p{L}\p{M}\-]{2,50}$/iu
checkInput(addressInput, validAddress)

// Redirect when closing modal in order.html.
const modalID = document.getElementById('successModal')
modalID.addEventListener('hidden.bs.modal', function(){
    localStorage.clear('shopCart')
    location.replace("produkter.html")
})

const inputs = [nameInput, phoneInput, emailInput, addressInput]
const sendButton = document.getElementById('send')

inputs.forEach(input => {
    input.addEventListener('keyup', function(){
        if(checkField(nameInput) && checkField(phoneInput) && checkField(emailInput) && checkField(addressInput)) {
            sendButton.classList.remove('disabled')
        } else {
            sendButton.classList.add('disabled')
        }
    })
})

function checkField(userInput) {
    return userInput.classList.contains('is-valid') ? true : false
}

const form = document.getElementById('order-form')
form.addEventListener("submit", function (event) {
    event.preventDefault();
    if(checkField(nameInput) && checkField(phoneInput) && checkField(emailInput) && checkField(addressInput)) {
    
        // Hämta användarens uppgifter från formuläret
        const name = document.getElementById("namn").value;
        const phone = document.getElementById("telefon").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("adress").value;

        let productName = ""
        let productPrice = 0
        const cart = JSON.parse(localStorage.getItem('shopCart'))
        cart.forEach(item => {
            productName += `${item.name} x ${item.quantity} <br>`
            productPrice += Number(item.price)
        });
        const price = productPrice.toFixed(2)

        // Fyll i modalfönstret med användarens uppgifter och produktinformation
        document.getElementById("modalProductName").innerHTML = productName;
        document.getElementById("modalProductPrice").textContent = `$${price}`;
        document.getElementById("modalName").textContent = name;
        document.getElementById("modalPhone").textContent = phone;
        document.getElementById("modalEmail").textContent = email;
        document.getElementById("modalAddress").textContent = address;

        // Visa modalfönstret
        const successModal = new bootstrap.Modal(
        document.getElementById("successModal")
        );
        successModal.show();
    }
})
