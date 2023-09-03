// Коментарі буде видалено. 
import * as catalogue from './products-catalogue.js' // імпортуємо каталог продуктів
                                                     // (можливо, це не потрібно тут, якщо імпорт що у shop-list.js наслідується і тут)
// у цьому розділі готуємо пустий масив, що містить key : value пари по кожному товару в каталозі --> ID товара : нульова кількість
let orderData = {}
if (!localStorage.getItem('basket')) {
    catalogue.products.forEach(el => {
        orderData[el.code] = 0
    })
} else {
    orderData = JSON.parse(localStorage.getItem('basket'))
}
let orderJsonData // готуємо змінну для прийняття створеного масиву orderData у якості JSON-стрінги (треба щоби була можливість записувати це в localStorage)

const cartBadge = document.querySelector('.cart-badge');
// const cartCounter = document.querySelector('.cart-badge__counter');
let itemsCount // початкова кількість замовленого товару невизначена

function setOrderingListeners() {
    const addBtns = document.querySelectorAll('.add-btn'); // обираємо всі кнопки "Замовити / купити" (в т.ч. при прокрутці карусельки)
    const wineIds = document.querySelectorAll('.wineId');
    const qtys = document.querySelectorAll('.qty');
    
    for (let i = 0; i < addBtns.length; i++) {
        const itemId = wineIds[i].textContent
        const quantity = Number(qtys[i].textContent)
        addBtns[i].addEventListener('click', () => { // Збільшуємо лічильник при кожному кліку
            itemsCount += quantity; // Збільшуємо лічильник
            console.log('itemsCount on click: ', itemsCount)
            updateCartBadge(itemsCount); // Викликаємо функцію для оновлення значка корзини
            updateBasketJsonData(itemId, quantity) // Викликаємо функцію для оновлення JSON-стрінги для Корзини (містить пари "ID товара : кількість")
        });
    }
}

setOrderingListeners()

function updateCartBadge(itemsCount) {
    // cartCounter.textContent = itemsCount; // Оновлюємо вміст лічильника
    if (itemsCount) {
        cartBadge.classList.remove('hidden');
    } else {
        cartBadge.classList.add('hidden');
    }
}

function updateBasketJsonData(itemId, quantity) {
    orderData[itemId] += quantity
    orderJsonData = JSON.stringify(orderData)
    localStorage.setItem('basket', orderJsonData)
    
    // нижче - виключно для тестування
    const test = JSON.parse(localStorage.getItem('basket'))
    console.log('Basket retrieved from localStorage: ', test)
}