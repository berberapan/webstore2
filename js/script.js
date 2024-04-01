document.addEventListener('DOMContentLoaded', function () {
  // Hämta produkter från Fake Store API och rendera dem på sidan
  fetch('https://fakestoreapi.com/products')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const productList = document.getElementById('product-list');
      data.forEach(product => {
        // Skapa produktkort
        const productCard = document.createElement('div');
        productCard.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4', 'product-container');
        productCard.setAttribute('data-product', `${product.title}`);
        productCard.setAttribute('data-price', `${product.price}`)
        productCard.setAttribute('data-description', `${product.description}`)
        productCard.innerHTML = `
                <div class="card h-100">
                  <div data-bs-toggle="offcanvas" data-bs-target="#offcanvas-product" aria-controls="offcanvas-product">
                    <img class="card-img-top" src="${product.image}" alt="${product.title}">  
                    <div class="card-body">
                        <h5 class="card-title text-truncate">${product.title}</h5>
                    </div>
                  </div>
                  <div class="d-flex flex-column card-body product-button">
                    <p class="card-text">$${product.price}</p>
                    <button id="buyButton" class="btn btn-primary btn-order">Köp</button>
                  </div>
                </div>
            `;
        productList.appendChild(productCard);
      });
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });

    

  // Hantera klickhändelser
  document.addEventListener('click', function (event) {
    // Hämta produktinformation
    const productName = event.target.closest('[data-product]').getAttribute('data-product');
    const productPrice = event.target.closest('[data-price]').getAttribute('data-price');
    const productDescription = event.target.closest('[data-description]').getAttribute('data-description');

    if (event.target.classList.contains('btn-order')) {
      event.preventDefault();

      let shopItem = {
        name: productName,
        price: productPrice,
        quantity: 1
      }

      if (localStorage.getItem('shopCart') === null){
        const shopCart = []
        shopCart.push(shopItem)
        localStorage.setItem('shopCart', JSON.stringify(shopCart))
        counter()
        sumCart()
        addedItemsCart()
      } else {
        const shopCart = JSON.parse(localStorage.getItem('shopCart'))
        const checkMulti = shopCart.find(item => item.name === shopItem.name)
        if (checkMulti) {
          checkMulti.quantity += 1
        } else {
          shopCart.push(shopItem)
        }        
        localStorage.setItem('shopCart', JSON.stringify(shopCart))
        counter()
        sumCart()
        addedItemsCart()
      }
    } else {
      document.getElementById('offcanvas-product-title').innerHTML = productName
      document.getElementById('offcanvas-product-description').innerHTML = productDescription
    }
  });
});

document.getElementById('cRyear').innerHTML = new Date().getFullYear();
