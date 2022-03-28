"use strict";

const basket = {};
const basketWrap = document.querySelector(".basket");
const countMerch = document.querySelector(".cartIconWrap > span");

//Обрабока события клика на значок корзины
const cartIcon = document.querySelector(".cartIcon");
cartIcon.addEventListener("click", () => {
  basketWrap.classList.toggle("hidden");
});

//Обработка события нажатия на значок добавления в корзину
document.querySelector(".featuredItems").addEventListener("click", (event) => {
  if (!event.target.classList.contains("addToBasket")) {
    return;
  }
  console.log(event.target);
  addToCart();
  addMerch();
  //console.log(event.currentTarget);
});

//Функция проверки наличия товаров в корзине
function addMerch() {
  if (!(countMerch.textContent === 0 || countMerch.textContent === "")) {
    countMerch.classList.remove("hidden");
  }
}

//Функция добавления товара в объект basket
function addToCart() {}
