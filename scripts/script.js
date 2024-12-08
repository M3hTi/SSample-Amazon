// Global Variables
const productsContainer = document.querySelector('.products-grid')
const carouselContainer = document.querySelector('.carousel-container');
const hero = document.querySelector('.hero')
const searchInput = document.querySelector('#js-search')
const searchButton = document.querySelector('#js-search-btn')


const shopIcon = document.querySelector('.cart')





// location of imagess of header
const headerImages = ['https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg'
]


function init(){
    fetch("/scripts/products.json")
    .then(response => {
        if(!response.ok) throw new Error("server response error :" + response.statusText)
        return response.json()
    })
    .then(data => {
        console.log(data)
        showImagesOnHeader(headerImages)
        showProducts(data)
        searchButton.addEventListener('click', (e) => searchProduct(e, data))
        searchInput.addEventListener('keydown', (e) => searchProduct(e, data))
        shopIcon.addEventListener('click', showCart)
    })
    .catch(error => {
        console.log(error)
    })      
}

function showProducts(arr) {
    arr.forEach(element => {
        const productCard = document.createElement('div')
        productCard.className = 'product-card'

        const productImage = document.createElement('div')
        productImage.className = 'product-image'
        productCard.appendChild(productImage)
        
        const img = document.createElement('img')
        img.src = element.image
        img.alt = element.name
        productImage.appendChild(img)


        const productInfo = document.createElement('div')
        productInfo.className = 'product-info'
        productCard.appendChild(productInfo)


        const productTitle = document.createElement('h3')
        productTitle.className = 'product-title'
        productTitle.textContent = element.name
        productInfo.appendChild(productTitle)


        const rating = document.createElement('div')
        rating.className = 'rating'
        const stars = element.rating.stars
        const count = element.rating.count
        const imgStars = document.createElement('img')
        imgStars.src = `/images/rating-${stars}.png`
        imgStars.alt = `${stars} stars`
        const span = document.createElement('span')
        span.textContent = `(${count})`
        rating.appendChild(imgStars)
        rating.appendChild(span)
        productInfo.appendChild(rating)



        const priceElement = document.createElement('div')
        priceElement.className = 'price'
        // Convert priceCents directly to number to ensure proper calculation
        const priceNumber = Number(element.priceCents) / 100
        priceElement.textContent = priceNumber.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
        productInfo.appendChild(priceElement)



        const prime = document.createElement('div')
        prime.className = 'prime'
        const primeIcon = document.createElement('i')
        primeIcon.className = 'fab fa-amazon'
        prime.appendChild(primeIcon)
        const primeText = document.createElement('span')
        primeText.textContent = 'Prime'
        prime.appendChild(primeText)
        productInfo.appendChild(prime)
        
        // Add quantity selector
        const quantityContainer = document.createElement('div')
        quantityContainer.className = 'quantity-selector'
        
        const quantityLabel = document.createElement('label')
        quantityLabel.textContent = 'Qty: '
        quantityContainer.appendChild(quantityLabel)
        
        const select = document.createElement('select')
        select.className = 'quantity-select'
        for(let i = 1; i <= 5; i++) {
            const option = document.createElement('option')
            option.value = i
            option.textContent = i
            select.appendChild(option)
        }
        quantityContainer.appendChild(select)
        productInfo.appendChild(quantityContainer)
        
        // Add Buy button
        const buyButton = document.createElement('button')
        buyButton.className = 'buy-button'
        buyButton.textContent = 'Buy'
        productInfo.appendChild(buyButton)

        buyButton.addEventListener('click', () => {
            // console.log(element);
            const id = element.id
            const name = element.name
            const price = element.priceCents
            const image = element.image
            const quantity = select.value
            const product = new Product(name, price, image, quantity, id)
            // console.log(product);
            cart.add(product)
            cart.calculateTotal()
            document.querySelector('.cart-count').textContent = cart.products.length
            // console.log(cart);

            localStorage.setItem('cart', JSON.stringify(cart))
        })
            
        productsContainer.appendChild(productCard)
    });
}


function showImagesOnHeader(arr) {
    const preButton = document.createElement('button')
    preButton.className = 'carousel-btn prev-btn'
    const preIcon = document.createElement('i')
    preIcon.className = 'fas fa-chevron-left'
    preButton.appendChild(preIcon)
    hero.appendChild(preButton)

    preButton.addEventListener('click', showPreviousImage)
    
    
    arr.forEach((element,index) => {
        const img = document.createElement('img')
        img.src = element
        img.alt = `Image ${index + 1}`
        img.className = 'header-image'
        if(index === 0) img.classList.add('active')
        carouselContainer.appendChild(img)
    })

    const nextButton = document.createElement('button')
    nextButton.className = 'carousel-btn next-btn'
    const nextIcon = document.createElement('i')
    nextIcon.className = 'fas fa-chevron-right'
    nextButton.appendChild(nextIcon)
    hero.appendChild(nextButton)

    nextButton.addEventListener('click', showNextImage)

    // console.dir(carouselContainer)


    function showPreviousImage(){
        const currentActive = carouselContainer.querySelector('.active')
        currentActive.classList.remove('active')
        const lastChilderen = carouselContainer.lastElementChild
        carouselContainer.insertBefore(lastChilderen, carouselContainer.firstElementChild)
        lastChilderen.classList.add('active')
    }

    function showNextImage(){
        const firstChilderen = carouselContainer.firstElementChild
        firstChilderen.classList.remove('active')
        const secondChilderen = firstChilderen.nextElementSibling
        secondChilderen.classList.add('active')
        carouselContainer.appendChild(firstChilderen)
    }
}



function searchProduct(e, data) {
    if(e.type === 'click' || e.type === 'keydown' && e.key === 'Enter') {
        const searchValue = searchInput.value
        // console.log(data);
        const matches = data.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()))
        console.log(matches);
        productsContainer.innerHTML = ''
        showProducts(matches)
    }
}


function showCart() {
    // Remove existing cart if present
    // const existingCart = document.querySelector('.cart-container')
    // if (existingCart) existingCart.remove()


    const cartContainer = document.createElement('div')
    cartContainer.className = 'cart-container'

    // Create close button
    const closeButton = document.createElement('button')
    closeButton.className = 'close-cart'
    closeButton.innerHTML = '×'

    closeButton.addEventListener('click', () => {
        document.body.removeChild(cartContainer)
    })
    cartContainer.appendChild(closeButton)

    cart.products.forEach(product => {
        const productCard = document.createElement('div')
        productCard.className = 'product-card'

        // Product Image Container
        const productImageContainer = document.createElement('div')
        productImageContainer.className = 'product-image'
        
        const productImage = document.createElement('img')
        productImage.src = product.image
        productImage.alt = product.name
        productImageContainer.appendChild(productImage)
        productCard.appendChild(productImageContainer)

        // Product Info Container
        const productInfo = document.createElement('div')
        productInfo.className = 'product-info'

        const title = document.createElement('h5')
        title.textContent = product.name
        productInfo.appendChild(title)

        const price = document.createElement('p')
        price.textContent = `$${(product.price / 100).toFixed(2)}`
        productInfo.appendChild(price)

        const quantity = document.createElement('p')
        quantity.textContent = `Quantity: ${product.number}`
        productInfo.appendChild(quantity)

        productCard.appendChild(productInfo)
        cartContainer.appendChild(productCard)
    })

    // Add View Cart link
    const viewCartLink = document.createElement('a')
    viewCartLink.href = 'cart.html'
    viewCartLink.className = 'view-cart-link'
    viewCartLink.textContent = 'View shopping cart'
    cartContainer.appendChild(viewCartLink)

    document.body.appendChild(cartContainer)
}

window.addEventListener('load', init)