# Amazon Sample Site Implementation Guide

## Overview
This document explains the implementation details of our Amazon sample site, including server setup, data fetching, product display, search functionality, shopping cart, and image carousel features.

## 1. Server Setup and Data Fetching
The site uses Python's local server to serve files. The main functionality starts with the `init()` function that fetches product data:

```javascript
function init(){
    fetch("/scripts/products.json")
    .then(response => {
        if(!response.ok) throw new Error("server response error :" + response.statusText)
        return response.json()
    })
    .then(data => {
        showImagesOnHeader(headerImages)
        showProducts(data)
        searchButton.addEventListener('click', (e) => searchProduct(e, data))
        searchInput.addEventListener('keydown', (e) => searchProduct(e, data))
        shopIcon.addEventListener('click', showCart)
    })
}
```

## 2. Product Display
The `showProducts()` function creates dynamic elements for each product including:
- Product card with image
- Product info (title, rating, price)
- Prime badge
- Quantity selector (1-5)
- Buy button

```javascript
function showProducts(arr) {
    arr.forEach(element => {
        const productCard = document.createElement('div')
        productCard.className = 'product-card'
        // ... product card creation
        
        buyButton.addEventListener('click', () => {
            const product = new Product(name, price, image, quantity, id)
            cart.add(product)
            cart.calculateTotal()
            document.querySelector('.cart-count').textContent = cart.products.length
            localStorage.setItem('cart', JSON.stringify(cart))
        })
    });
}
```

## 3. Search Implementation
The search function filters products based on name:

```javascript
function searchProduct(e, data) {
    if(e.type === 'click' || e.type === 'keydown' && e.key === 'Enter') {
        const searchValue = searchInput.value
        const matches = data.filter(product => 
            product.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        productsContainer.innerHTML = ''
        showProducts(matches)
    }
}
```

## 4. Shopping Cart

### Product Constructor
```javascript
function Product (name, price, image, number, id){
    this.name = name
    this.price = price
    this.image = image
    this.number = number
    this.id = id
}
```

### Cart Object
```javascript
const cart  = {
    products: [],
    total: 0,
    add : function(obj){
        this.products.push(obj)
    },
    calculateTotal : function(){
        this.total = 0
        this.products.forEach(element => {
            this.total += element.price * element.number 
        })
        return this.total
    }
}
```

### Cart Display
The `showCart()` function creates a dynamic cart overlay showing:
- Close button
- Product cards with image, name, price, and quantity
- View Cart link

## 5. Header Image Carousel

### Images Array
```javascript
const headerImages = [
    'https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg'
]
```

### Image Navigation Functions
```javascript
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
```

The carousel works by:
1. Previous button: Takes the last image and moves it to the front
2. Next button: Takes the first image and moves it to the end
3. Active class controls which image is visible

## Running the Application

1. Start the Python local server
2. Open the site in your browser
3. The application will:
   - Load and display products
   - Enable search functionality
   - Allow adding/removing items from cart
   - Display the image carousel with navigation

Remember to handle errors appropriately and ensure all DOM elements exist before accessing them.
