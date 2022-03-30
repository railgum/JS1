"use strict";

const basket = {};
const basketWrap = document.querySelector(".basket");
const countMerch = document.querySelector(".cartIconWrap > span");

//Обрабока события клика на значок корзины
const cartIcon = document.querySelector(".cartIcon");
cartIcon.addEventListener("click", () => {
  basketWrap.classList.toggle("hidden");
});

//Счетчик товаров
let countTotalMerch = 0;

//Обработка события нажатия на значок добавления в корзину
document.querySelector(".featuredItems").addEventListener("click", (event) => {
  if (!event.target.classList.contains("addToBasket")) {
    return;
  }
  countTotalMerch++;
  countMerch.textContent = countTotalMerch;
  addToCart(event.target);
  addMerch();
});

//Функция проверки наличия товаров в корзине
function addMerch() {
  if (!(countMerch.textContent === 0 || countMerch.textContent === "")) {
    countMerch.classList.remove("hidden");
  }
}

//Класс продукта
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.count = 0;
  }
}

//Функция добавления товара в объект basket
function addToCart(merch) {
  const id = merch.closest(".featuredItem").dataset.id;
  const name = merch.closest(".featuredItem").dataset.name;
  const price = merch.closest(".featuredItem").dataset.price;

  //Отдельная функция?
  if (
    (Object.keys(basket).length === 0 && basket.constructor === Object) ||
    basket[id] === undefined
  ) {
    basket[id] = new Product(id, name, price);
  }
  if (basket[id]["id"] === id) {
    basket[id]["count"]++;
  }
  console.log(Object.entries(basket));
  getProductMarkup();
}
