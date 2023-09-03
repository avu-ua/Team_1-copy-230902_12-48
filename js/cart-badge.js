// Коментарі буде видалено. 
import * as catalogue from './products-catalogue.js' // імпортуємо каталог продуктів
                                                     // (можливо, це не потрібно тут, якщо імпорт що у shop-list.js наслідується і тут)

// початкова кількість замовленого товару невизначена
let itemsCount = (sessionStorage.getItem('itemsCount')) ? Number(sessionStorage.getItem('itemsCount')) : 0
console.log('itemsCount on line 7: ', itemsCount)
// if (sessionStorage.getItem('itemsCount')) {
//     itemsCount = Number(sessionStorage.getItem('itemsCount'))
// }

const cartBadge = document.querySelector('.cart-badge');
const cartCounter = document.querySelector('.cart-badge__counter');

// у цьому розділі готуємо пустий масив, що містить key : value пари по кожному товару в каталозі --> ID товара : нульова кількість
let orderData = {}
if (!sessionStorage.getItem('basket')) {
    catalogue.products.forEach(el => {
        orderData[el.code] = 0
    })
} else {
    orderData = JSON.parse(sessionStorage.getItem('basket'))
    for (const [key, value] of Object.entries(orderData)) {
        itemsCount += value
    }
}
let orderJsonData // готуємо змінну для прийняття створеного масиву orderData у якості JSON-стрінги (треба щоби була можливість записувати це в sessionStorage)


function setOrderingListeners() {
    const addBtns = document.querySelectorAll('.add-btn'); // обираємо всі кнопки "Замовити / купити" (в т.ч. при прокрутці карусельки)
    const wineIds = document.querySelectorAll('.wineId');
    console.log('wineIds.length: ', wineIds.length)
    console.log('wineIds[0].textContent: ', wineIds[0].textContent)
    console.log('wineIds[0].innerHTML: ', wineIds[0].innerHTML)
    console.log('wineIds[0].innerText: ', wineIds[0].innerText)
    console.log('wineIds: ', wineIds)
    const qtys = document.querySelectorAll('.qty');
    
    for (let i = 0; i < addBtns.length; i++) {
        const itemId = wineIds[i].textContent
        const quantity = Number(qtys[i].textContent)
        addBtns[i].addEventListener('click', () => { // Збільшуємо лічильник при кожному кліку
            itemsCount += quantity; // Збільшуємо лічильник
            console.log('before "sessionStorage.setItem(\'itemsCount\', itemsCount)"')
            sessionStorage.setItem('itemsCount', itemsCount)
            console.log('itemsCount on click: ', itemsCount)
            updateCartBadge(itemsCount); // Викликаємо функцію для оновлення значка корзини
            updateBasketJsonData(itemId, quantity) // Викликаємо функцію для оновлення JSON-стрінги для Корзини (містить пари "ID товара : кількість")
        });
    }
}

setOrderingListeners()
updateCartBadge(itemsCount)

function updateCartBadge(itemsCount) {
    cartCounter.textContent = itemsCount; // Оновлюємо вміст лічильника
    if (itemsCount && cartBadge.classList.contains('hidden')) {
        cartBadge.classList.remove('hidden');
    } else if (!itemsCount) {
        cartBadge.classList.add('hidden');
    }
}

function updateBasketJsonData(itemId, quantity) {
    orderData[itemId] += quantity
    orderJsonData = JSON.stringify(orderData)
    sessionStorage.setItem('basket', orderJsonData)
    
    // нижче - виключно для тестування
    const test = JSON.parse(sessionStorage.getItem('basket'))
    console.log('Basket retrieved from sessionStorage: ', test)
}




// if (localStorage.getItem('clearLocalStorageOnUnload') === 'true') {
//     localStorage.clear()
// }

// window.addEventListener('beforeunload', () => {
//     localStorage.setItem('clearLocalStorageOnUnload', 'true')
// })

// window.addEventListener('load', () => {
//     localStorage.removeItem('clearLocalStorageOnUnload');
// });