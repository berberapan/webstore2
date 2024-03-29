function counter() {
    if (localStorage.getItem('shopCart') === null) {
        document.getElementById('badge').innerHTML = ""
    } else {
        const cartItems = JSON.parse(localStorage.getItem('shopCart'))
        document.getElementById('badge').innerHTML = `${cartItems.length}`
    }
}

addEventListener('storage', function(event){
    if (event.key === 'shopCart') {
        counter()
    }
})

