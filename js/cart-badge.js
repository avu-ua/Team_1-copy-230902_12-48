// Коментарі буде видалено. 
import * as catalogue from './products-catalogue.js' // імпортуємо каталог продуктів
                                                     // (можливо, це не потрібно тут, якщо імпорт що у shop-list.js наслідується і тут)

document.addEventListener('DOMContentLoaded', function () {
    // початкова кількість замовленого товару
    let preorderedItems = 0
    if (sessionStorage.getItem('itemsCount')) preorderedItems = Number(sessionStorage.getItem('itemsCount'))
    let itemsCount = preorderedItems

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
    }

    let jsonOrderData // готуємо змінну для прийняття створеного масиву orderData у якості JSON-стрінги (треба щоби була можливість записувати це в sessionStorage)

    setOrderingListeners()

    console.log('itemsCount right before updateCartBadge(itemsCount): ', itemsCount)
    updateCartBadge(itemsCount)


    function setOrderingListeners() {
        const addBtns = document.querySelectorAll('.add-btn'); // обираємо всі кнопки "Замовити / купити" (в т.ч. при прокрутці карусельки)
        const wineIds = document.querySelectorAll('.wine-id');
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
                itemsCount = itemsCount + quantity; // Збільшуємо лічильник
                sessionStorage.setItem('itemsCount', itemsCount)
                console.log('itemsCount on click: ', itemsCount)
                updateCartBadge(itemsCount); // Викликаємо функцію для оновлення значка корзини
                updateBasketJsonData(itemId, quantity) // Викликаємо функцію для оновлення JSON-стрінги для Корзини (містить пари "ID товара : кількість")
            });
        }
    }

    function updateCartBadge(itemsCount) {
        cartCounter.textContent = itemsCount; // Оновлюємо вміст лічильника
        if (itemsCount) {
            cartBadge.classList.remove('hidden');
        } else if (!itemsCount) {
            cartBadge.classList.add('hidden');
        }
    }

    function updateBasketJsonData(itemId, quantity) {
        orderData[itemId] += quantity
        jsonOrderData = JSON.stringify(orderData)
        sessionStorage.setItem('basket', jsonOrderData)
        
        // нижче - виключно для тестування
        const test = JSON.parse(sessionStorage.getItem('basket'))
        console.log('Basket retrieved from sessionStorage: ', test)
    }
})