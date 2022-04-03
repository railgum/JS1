"use strict";

const basket = {};
const basketWrap = document.querySelector(".basket");
const countMerch = document.querySelector(".cartIconWrap > span");
const basketContent = document.querySelector(".basketContent");
const basketAmount = document.querySelector(".basketTotalValue");
const basketProductDelete = document.querySelector(".product i");

//Счетчик товаров
let countTotalMerch = 0;

//Обрабока события клика на значок корзины
document.querySelector(".cartIcon").addEventListener("click", () => {
  basketWrap.classList.toggle("hidden");
});

//Обработка события добавления товара в корзину
document.querySelector(".featuredItems").addEventListener("click", (event) => {
  if (!event.target.closest(".addToBasket")) {
    return;
  }
  countTotalMerch++;
  countMerch.textContent = countTotalMerch;
  addToCart(event.target);
  basketSum();
});
//Удаление товара
document.addEventListener("click", (event) => {
  if (!event.target.classList.contains("fa-shopping-basket")) {
    return;
  }
  countTotalMerch -= event.target.dataset.count;

  //addMerch();
  //Удаление значка количества товаров.
  //При вызове функции addMerch почему-то не удаляется!?
  if (countTotalMerch === 0) {
    countMerch.classList.add("hidden");
  }
  event.target.closest(".product").remove();
  delete basket[event.target.dataset.id];
  basketSum();

  countMerch.textContent = countTotalMerch;
  //event.stopImmediatePropagation();
});

//Функция проверки наличия товаров в корзине для значка в меню
function addMerch() {
  //if (countMerch.innerText === 0 || countMerch.innerText === "")
  if (Object.keys(basket).length === 0 && basket.constructor === Object) {
    countMerch.classList.add("hidden");
  } else {
    countMerch.classList.remove("hidden");
  }
}
//Подсчет общей суммы покупок
function basketSum(sum = 0) {
  for (const key in basket) {
    sum += basket[key]["count"] * basket[key]["price"];
  }
  return (basketAmount.textContent = "$" + sum);
}

//Класс продукта
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.count = 0;
  }
  getProductMarkup() {
    return `
		<div class="product">
			<div>${this.name}</div>
			<div>${this.count} pc.</div>
			<div>$${this.price}</div>
			<div>$${this.count * this.price}</div>
			<div><i class="fa fa-shopping-basket" aria-hidden="true" data-id=${
        this.id
      } data-count=${this.count}></i></div>
		</div>
		`;
  }
}

//Функция добавления товара и вывода корзины
function addToCart(merch) {
  const id = merch.closest(".featuredItem").dataset.id;
  const name = merch.closest(".featuredItem").dataset.name;
  const price = merch.closest(".featuredItem").dataset.price;

  //Отдельная функция?
  //Проверка на пустоту корзины и добавление нового продукта
  if (
    (Object.keys(basket).length === 0 && basket.constructor === Object) ||
    basket[id] === undefined
  ) {
    basket[id] = new Product(id, name, price);
  }
  //Добавление счетчика при повторном нажатии продукта
  if (basket[id]["id"] === id) {
    basket[id]["count"]++;
  }
  addMerch();

  //Вывод корзины
  const basketArray = Object.values(basket);
  basketContent.innerHTML = Array.from(basketArray, (product) =>
    product.getProductMarkup()
  ).join("");
}
