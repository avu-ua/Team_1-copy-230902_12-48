// Коментарі буде видалено. 
import * as catalogue from './products-catalogue.js' // імпортуємо каталог продуктів
                                                     // (можливо, це не потрібно тут, якщо імпорт що у shop-list.js наслідується і тут)
// у цьому розділі готуємо пустий масив, що містить key : value пари по кожному товару в каталозі --> ID товара : нульова кількість
let orderData = {}
catalogue.products.forEach(el => {
    orderData[el.code] = 0
})
let orderJsonData // готуємо змінну для прийняття створеного масиву orderData у якості JSON-стрінги (треба щоби була можливість записувати це в localStorage)

const cartBadge = document.querySelector('.cart-badge');
const cartCounter = document.querySelector('.cart-badge__counter');
let itemsCount // початкова кількість замовленого товару невизначена

document.addEventListener('DOMContentLoaded', function() {
// function setOrderingListeners() {
    const addBtns = document.querySelectorAll('.add-btn'); // обираємо всі кнопки "Замовити / купити" (в т.ч. при прокрутці карусельки)
    const wineIds = document.querySelectorAll('.wineId');
    const qtys = document.querySelectorAll('.qty');
    
    for (let i = 0; i < addBtns.length; i++) {
        // const itemIdElem = addBtns[i].querySelector('.wineId')
        const itemId = wineIds[i].textContent
        // const quantityElem = addBtns[i].querySelector('.qty')
        const quantity = Number(qtys[i].textContent)
        addBtns[i].addEventListener('click', () => { // Збільшуємо лічильник при кожному кліку
            itemsCount += quantity; // Збільшуємо лічильник
            updateCartBadge(); // Викликаємо функцію для оновлення значка корзини
            console.log('itemId: ', itemId)
            console.log('quantity: ', quantity)
            updateBasketJsonData(itemId, quantity) // Викликаємо функцію для оновлення JSON-стрінги для Корзини (містить пари "ID товара : кількість")
        });
    }
});
    
    // addBtns.forEach((el) => {
    //     const itemIdElem = el.querySelector('.wineId')
    //     const itemId = itemIdElem.textContent
    //     const quantityElem = el.querySelector('.qty')
    //     const quantity = Number(quantityElem.textContent)
    //     btn.addEventListener('click', () => { // Збільшуємо лічильник при кожному кліку
    //         itemsCount += quantity; // Збільшуємо лічильник
    //         updateCartBadge(); // Викликаємо функцію для оновлення значка корзини
    //         console.log('itemId: ', itemId)
    //         console.log('quantity: ', quantity)
    //         updateBasketJsonData(itemId, quantity) // Викликаємо функцію для оновлення JSON-стрінги для Корзини (містить пари "ID товара : кількість")
    //     });
    // }); 

// }

// document.addEventListener('DOMContentLoaded', function() {
//     setOrderingListeners()
// });

function updateCartBadge() {
    cartCounter.textContent = itemsCount; // Оновлюємо вміст лічильника
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