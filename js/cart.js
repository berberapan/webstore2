const clearButton = document.getElementById('clear')
clearButton.addEventListener('click', function(){
    localStorage.clear('shopCart')
    initCart()
})

function addRemove() {
    const items = JSON.parse(localStorage.getItem('shopCart'))
    if(items === null) {
        return
    }
    const numItems = items.length
    for (let i = 0; i < numItems; i++) {
        const btnMinus = document.getElementById(`${i}-minus`)
        const btnPlus = document.getElementById(`${i}-plus`)
        const btnRemove = document.getElementById(`${i}-remove`)
        btnMinus.addEventListener('click', function(){
            const cart = JSON.parse(localStorage.getItem('shopCart'))
            cart[i].quantity -= 1
            if (cart[i].quantity === 0) {
                cart.splice(i, 1)
            }
            if (cart.length === 0) {
                localStorage.clear('shopCart')
            } else {
                localStorage.setItem('shopCart', JSON.stringify(cart))
            }
            initCart()
        })
        btnPlus.addEventListener('click', function(){
            const cart = JSON.parse(localStorage.getItem('shopCart'))
            cart[i].quantity += 1
            localStorage.setItem('shopCart', JSON.stringify(cart))
            initCart()
        })
        btnRemove.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('shopCart'))
            cart.splice(i, 1)
            if (cart.length === 0) {
                localStorage.clear('shopCart')
            } else {
                localStorage.setItem('shopCart', JSON.stringify(cart))
            }
            initCart()
        })
    }
}

function sumAllProducts() {
    let sum = 0
    if (localStorage.getItem('shopCart') === null) {
      return sum
    } else {
      const cartItems = JSON.parse(localStorage.getItem('shopCart'))
      cartItems.forEach(item => {
        sum += Number(item.price * item.quantity)
      })
      return sum.toFixed(2)
    }
}

function addedItemsCart() {
    const cartItems = JSON.parse(localStorage.getItem('shopCart'))
    const cartList = document.getElementById('added')
    if (cartItems === null) {
      cartList.textContent = ""  
      return
    }
    cartList.textContent =  ""
    cartItems.forEach((item, index) => {
      const product = document.createElement('div')
      product.innerHTML = `
      <div class="row">
      <div id=${index} class="col-9 mb-2">
        ${item.name}
      </div>
      <div class="col-3">$${(item.price * item.quantity).toFixed(2)}
      </div>
      </div>
      <div>
      Antal: ${item.quantity}<hr></hr>
      </div>`
      cartList.appendChild(product)
    })
}

function addedItemsBody() {
    const cartItems = JSON.parse(localStorage.getItem('shopCart'))
    const cartList = document.getElementById('bodyAdded')
    if (cartItems === null) {
      cartList.textContent = ""
      return
    }
    cartList.textContent =  ""
    cartItems.forEach((item, index) => {
      const product = document.createElement('div')
      product.innerHTML = `
      <div class="row">
      <div id=${index} class="col-9 mb-2">
        <b>${item.name}</b>
      </div>
      <div class="col-3">$${(item.price * item.quantity).toFixed(2)}
      </div>
      </div>
      <div class="row">
      <div class="col-9">
      Antal:
      <button id="${index}-minus" class="btn btn-primary border-0 btn-sm">-</button>
      ${item.quantity}
      <button id="${index}-plus" class="btn btn-primary border-0 btn-sm">+</button>
      </div>
      <div class="col-3">
      <button id="${index}-remove" class="btn btn-link btn-sm"><img src="trash.svg"></button>
      </div>
      </div>
      <hr></hr>
      </div>`
      cartList.appendChild(product)
    })
}


function counter() {
    if (localStorage.getItem('shopCart') === null) {
        document.getElementById('badge').innerHTML = ""
    } else {
        const cartItems = JSON.parse(localStorage.getItem('shopCart'))
        const quantities = cartItems.map(item => item.quantity)
        const quantity = quantities.reduce((acc, cv) => acc + cv, 0)
        if (quantity < 10) {
          document.getElementById('badge').innerHTML = `${quantity}`
        } else {
          document.getElementById('badge').innerHTML = "9+" 
        }
    }
}

function sumCart() {
    const getStorage = JSON.parse(localStorage.getItem('shopCart'))
    if (getStorage === null) {
      document.getElementById('sum').classList.add('text-center')
      document.getElementById('sum').innerHTML = "Din kundvagn är tom."
    } else {
      document.getElementById('sum').classList.remove('text-center')
      document.getElementById('sum').innerHTML = "<b>Summa</b>: " + `$${sumAllProducts()}`
    }
}

function sumCartBody() {
    const getStorage = JSON.parse(localStorage.getItem('shopCart'))
    if (getStorage === null) {
      document.getElementById('space').classList.remove('col-9')
      document.getElementById('bodySum').classList.remove('col-3')
      document.getElementById('bodySum').classList.add('text-center')
      document.getElementById('bodySum').classList.add('mb-2')
      document.getElementById('bodySum').innerHTML = "Din kundvagn är tom."
    } else {
      document.getElementById('bodySum').classList.remove('text-center')
      document.getElementById('space').classList.add('col-9')
      document.getElementById('bodySum').classList.add('col-3')
      document.getElementById('bodySum').classList.add('mb-2')
      document.getElementById('bodySum').innerHTML = "<b>Totalt</b>: " + `$${sumAllProducts()}`
    }
}

function initCart() {
    counter()
    sumCart()
    addedItemsCart()
    addedItemsBody()
    sumCartBody()
    addRemove()
}
 
initCart()

document.getElementById('cRyear').innerHTML = new Date().getFullYear()