import * as catalogue from './products-catalogue.js'

const slides = []
let currentSlide = 0
const nextButton = document.querySelector('.shop__arrowR');
nextButton.addEventListener('click', nextSlide);
const prevButton = document.querySelector('.shop__arrowL');
prevButton.addEventListener('click', prevSlide)

renderProduct(catalogue.products)

function renderProduct(products) {
    const productsContainer = document.querySelector('.shop__products')
    productsContainer.innerHTML = ''
    for (let i = 0; i < products.length; i++) {
        const content =
            `
            <div class="shop__product product">
                <a href="store-product.html?id=${products[i].code}"><img src="${products[i].images[0]}" alt="${products[i].name}"></img></a>
                <a href="store-product.html" class="product__name">${products[i].name}</a>
                <p class="product__price">${products[i].price.toFixed(2)}${products[i].currency}</p>
                <a class="button add-btn"><strong>Add to cart</strong></a>
            </div>
            `;
        slides.push(content)
    }
    renderSlide()
    activateBuyButton();
}

function renderSlide() {
    const productsContainer = document.querySelector('.shop__products');
    productsContainer.innerHTML = '';

    if (window.matchMedia('(min-width: 990px)').matches) {
        for (let i = currentSlide; i < currentSlide + 3; i++) {
            const slideIndex = i >= slides.length ? i - slides.length : i;
            productsContainer.innerHTML += slides[slideIndex];
        }
    } else if (window.matchMedia('(min-width: 767px)').matches) {
        for (let i = currentSlide; i < currentSlide + 2; i++) {
            const slideIndex = i >= slides.length ? i - slides.length : i;
            productsContainer.innerHTML += slides[slideIndex];
        }
    } else {
        productsContainer.innerHTML = slides[currentSlide];
    }
    renderIndicators();
}

function activateBuyButton() {
    const productsOnPage = document.querySelectorAll('.product__name')
    console.log('Test before slidesOnPage.forEach')
    productsOnPage.forEach((el) => {
        // const tagWithProductName = el.querySelector('a:nth-child(2)')
        const productName = el.innerText
        console.log('productName: ', productName)
        const product = catalogue.products.find((item) => item.name === productName)
        console.log('product: ', console.log(''))
        const parent = el.parentElement
        const buyBtn = parent.lastChild
        buyBtn.addEventListener('click', () => {
            console.log('test 1')
            setOrderingListeners(product.code, 1)
            console.log('test 2')
        })
    })
}

function nextSlide() {
    currentSlide = currentSlide + 1 >= slides.length ? 0 : currentSlide + 1
    renderSlide()
    activateBuyButton();
}


function prevSlide() {
    currentSlide = currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1
    renderSlide()
    activateBuyButton();
}


window.addEventListener('resize', renderProduct)


function renderIndicators() {
    const indicatorsContainer = document.querySelector('.shop__carousel-indicators');
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < slides.length; i++) {
        indicatorsContainer.innerHTML += `<button class="shop__carousel-indicator ${i === currentSlide ? 'shop__carousel-indicator--active' : ''}"></button>`;
    }
    const indicators = document.querySelectorAll('.shop__carousel-indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            renderSlide();
            activateBuyButton();
            renderIndicators(slides, currentSlide);
        });
        indicator.addEventListener('mouseover', () => {
            indicator.classList.add('shop__button--hover');
        });
        
        indicator.addEventListener('mouseout', () => {
            indicator.classList.remove('shop__button--hover');
        });
    });
}

renderIndicators();

