const cartPage = document.querySelector('.cart-page-container')

function initCheckout(){
    const cart = JSON.parse(localStorage.getItem('cart'))
    console.log(cart);

    const products = cart.products
    const total = cart.total

    showCart(products,total)
}

function showCart(arr, total){
    const cartContent = document.createElement('div')
    cartContent.className = 'cart-content'
    
    arr.forEach(product => {
        const cartProduct = document.createElement('div')
        cartProduct.className = 'cart-product'
        cartContent.appendChild(cartProduct)

        const cartProductImage = document.createElement('div')
        cartProductImage.className = 'cart-product-image'
        cartProduct.appendChild(cartProductImage)

        const img = document.createElement('img')
        img.src = product.image
        img.alt = product.name
        cartProductImage.appendChild(img)

        const cartProductInfo = document.createElement('div')
        cartProductInfo.className = 'cart-product-info'
        cartProduct.appendChild(cartProductInfo)

        const cartProductTitle = document.createElement('h3')
        cartProductTitle.textContent = product.name
        cartProductInfo.appendChild(cartProductTitle)

        const cartProductPrice = document.createElement('p')
        cartProductPrice.className = 'price'
        cartProductPrice.textContent = ((product.price) / 100).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
        cartProductInfo.appendChild(cartProductPrice)

        const cartProductQuantity = document.createElement('p')
        cartProductQuantity.className = 'quantity'
        cartProductQuantity.textContent = `Quantity: ${product.number}`
        cartProductInfo.appendChild(cartProductQuantity)
    })


    const cartTotal = document.createElement('div')
    cartTotal.className = 'cart-total'
    cartContent.appendChild(cartTotal)

    const cartTotalText = document.createElement('p')
    cartTotalText.textContent = 'Total:'
    cartTotal.appendChild(cartTotalText)

    const cartTotalAmount = document.createElement('span')
    cartTotalAmount.textContent = (total / 100).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    cartTotal.appendChild(cartTotalAmount)


    const checkoutButton = document.createElement('button')
    checkoutButton.className = 'checkout-button'
    checkoutButton.textContent = 'Proceed to Checkout'
    cartContent.appendChild(checkoutButton)
   
    cartPage.appendChild(cartContent)
    
}

















window.addEventListener('load', initCheckout)