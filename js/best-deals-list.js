import * as catalogue from './products-catalogue.js'

const slides = []
let currentSlide = 0
const nextButton = document.querySelector('.best-deals__arrowL')
nextButton.addEventListener('click', nextSlide)
const prevButton = document.querySelector('.best-deals__arrowR')
prevButton.addEventListener('click', prevSlide)

renderProduct(catalogue.products)

function renderProduct(products) {
    const productsContainer = document.querySelector('.best-deals__products');
    productsContainer.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
        if (products[i].bestDeal) {
            const wineId = products[i].code.toString()
            const content = `
            <div class="best-deals__product product">
                <a class="id-${products[i].code}" href="store-product.html"><img src="${products[i].images[0]}" alt="${products[i].name}"></img></a>
                <a href="store-product.html" class="product__name id-${products[i].code}">${products[i].name}</a>
                <p class="product__price">${products[i].price.toFixed(2)}${products[i].currency}</p>
                <div class="button add-btn">
                    <span class="wine-id" style="display: none">${wineId}</span>
                    <strong>Add to cart</strong>
                    <span class="qty" style="display: none">1</span>
                </div>
            </div>`
            slides.push(content)
        }
    }
    renderSlide()
}

function localStorageHandler() {
    for (let i = 0; i < catalogue.products.length; i++) {
        const selectedProductNodes = document.querySelectorAll(`.id-${catalogue.products[i].code}`)
        selectedProductNodes.forEach(el => {
            el.addEventListener('click', () => {
                const selectedProduct = catalogue.products[i]
                if (JSON.parse(localStorage.getItem('selectedProductData'))) {
                    localStorage.removeItem('selectedProductData')
                }
                localStorage.setItem('selectedProductData', JSON.stringify(selectedProduct))
            })
        })
    }
}
function renderSlide() {
    const productsContainer = document.querySelector('.best-deals__products');
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
    localStorageHandler();
}

function prevSlide() {
    currentSlide = currentSlide + 1 >= slides.length ? 0 : currentSlide + 1
    renderSlide()
}


function nextSlide() {
    currentSlide = currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1
    renderSlide()
}


window.addEventListener('resize', renderProduct)

function renderIndicators() {
    const indicatorsContainer = document.querySelector('.best-deals__carousel-indicators');
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < slides.length; i++) {
        indicatorsContainer.innerHTML += `<button class="best-deals__carousel-indicator ${i === currentSlide ? 'best-deals__carousel-indicator--active' : ''}"></button>`;
    }
    const indicators = document.querySelectorAll('.best-deals__carousel-indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            renderSlide();
            renderIndicators(slides, currentSlide);
        });
        indicator.addEventListener('mouseover', () => {
            indicator.classList.add('best-deals__button--hover');
        });
        
        indicator.addEventListener('mouseout', () => {
            indicator.classList.remove('best-deals__button--hover');
        });
    });

    
}

document.addEventListener('DOMContentLoaded', function() {
    // Тут ви можете викликати вашу функцію renderIndicators()
    renderIndicators();
});