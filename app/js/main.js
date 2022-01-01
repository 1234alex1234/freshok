$(function () {
  $('.slider-promo__list').slick({
    prevArrow: '<button type="button" class="slick-btn slick-prev"><img src="images/prevarrow.svg" alt=""></button>',
    nextArrow: '<button type="button" class="slick-btn slick-next"><img src="images/nextarrow.svg" alt=""></button>',
    fade: true,
    // autoplay: 1000,
  });
});

//Каталог товаров
let body = document.querySelector('body'),
  catalogBtn = document.querySelector('.dropdawn-menu__btn'),
  catalogArrow = document.querySelector('.dropdawn-menu__arrow'),
  catalogList = document.querySelector('.dropdawn-menu__list'),
  userNavLink = document.querySelector('.user-nav__link--cart'),
  cart = document.querySelector('.cart'),
  cartClose = document.querySelector('.cart__close');

catalogBtn.addEventListener('click', function () {
  this.classList.toggle('dropdawn-menu--active');
  catalogArrow.classList.toggle('dropdawn-menu__arrow--active');

  if (this.classList.contains('dropdawn-menu--active')) {
    catalogBtn.style.borderBottomRightRadius = '0';
    catalogBtn.style.borderBottomLeftRadius = '0';
    catalogList.style.opacity = '1';
  }

  else {
    catalogBtn.style.borderBottomRightRadius = '6px';
    catalogBtn.style.borderBottomLeftRadius = '6px';
    catalogList.style.opacity = '0';
  }
})

//Появление корзины
userNavLink.addEventListener('click', function () {
  cart.classList.add('cart--active');
  body.classList.add('body--active');
  body.style.overflow = 'hidden';
  disableScroll();
});


//Закрытие корзины
cartClose.addEventListener('click', function () {
  cart.classList.remove('cart--active');
  body.classList.remove('body--active');
  body.style.overflow = 'auto';
  enableScroll();
});

//Убираем дерганье при открытии корзины
function disableScroll() {
  let paddingscroll = window.innerWidth - document.body.offsetWidth + 'px';
  document.body.style.paddingRight = '17px';
}

function enableScroll() {
  document.body.style.paddingRight = '0';
}

//Переменные
const productItemCarts = document.querySelectorAll('.product-card__cart'),
  productList = document.querySelector('.cart__content-list'),
  cartNumder = document.querySelector('.cart-number'),
  fullPrice = document.querySelector('.fullprice'),
  articleCloses = document.querySelector('.article__close'),
  btnMinus = document.querySelector('[data-direction = "minus"]'),
  btnPlus = document.querySelector('[data-direction = "plus"]'),
  cartClear = document.querySelector('.cart__clear');

let price = 0;
// let articlePrice = 0;
const priceWithout = (str) => {
  return str.replace(/\s/g, '');
}


const normilePrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

//Сложение цен
function plusPrice(currentPrice) {
  return price += currentPrice;
}

//Вычитание цен
function minusPrice(currentPrice) {
  return price -= currentPrice;
}

function minusPrice2(currentPrice) {
  return price = price - currentPrice;
}

//перемножение счетчика корзины и цены
function cartCulcPrice() {
  const cartList = document.querySelector('.cart__content-list');
  const cartItems = document.querySelectorAll('.cart__content-item');
  let totalPrice = 0;
  cartItems.forEach(cartItem => {
    const count = cartItem.querySelector('.count');
    const articlePrice = cartItem.querySelector('.article__price');
    const currentPrice = parseInt(count.value) * parseInt(articlePrice.textContent);
    console.log("текущая цена", currentPrice);
    totalPrice = totalPrice + currentPrice;
  });
  fullPrice.textContent = `${normilePrice(totalPrice)} p`;
}

//Добавление товара в корзину
function generationPrice(img, title, price, id, counter) {
  return `
    <li class="cart__content-item" data-id="${id}">
    <img src="${img}" alt="">
            <article class="cart__article">
              <div class="article__text">
                <h3 class="article__title">${title}</h3>
                <div class="article__price">${price}</div>
              </div>
              <div class="product__count">
              <button class="count__btn" data-direction="minus" type="button">-</button>
              <input class="count" type="text" value = "${counter}">
              <button class="count__btn" data-direction="plus" type="button">+</button>
            </div>
            </article>
            <a class="article__close" href="#"></a>
          </li>
  `;
}

//Функция удаление товара из корзины
function productDelete(productItem) {
  const count = productItem.querySelector('.count');
  let currentPrice = parseInt(priceWithout(productItem.querySelector('.article__price').textContent)) * parseInt(count.value);
  console.log(currentPrice);
  minusPrice2(currentPrice);
  printFullPrice();
  productItem.remove();
  printQuntity();
}

//Счетчик корзины
function printQuntity() {
  printLength = productList.children.length;
  document.querySelector('.cart-number').textContent = printLength;
}

//Вывод полной цены
function printFullPrice() {
  fullPrice.textContent = `${normilePrice(price)} p`;
}

//Перебор кнопок корзины
productItemCarts.forEach(productItemCart => {
  productItemCart.addEventListener('click', function (e) {
    let self = e.target;
    let parent = self.closest('.top-product__item');
    let id = parent.dataset.id;
    let img = parent.querySelector('.product-card__img img').getAttribute('src');
    let title = parent.querySelector('.product-card__title').textContent;
    let priceNumber = parseInt(priceWithout(parent.querySelector('.product__price--new').textContent));
    let counter = parent.querySelector('.count').value;

    const itemInCart = productList.querySelector(`[data-id= "${id}"]`);
    if (itemInCart) {
      counterElement = itemInCart.querySelector('.count');
      counterElement.value = parseInt(counter) + parseInt(counterElement.value);
      articlePrice = document.querySelector('.article__price').textContent;
    } else {
      // plusPrice(priceNumber)
      // printFullPrice();
      productList.insertAdjacentHTML('afterbegin', generationPrice(img, title, priceNumber, id, counter));
      printQuntity();
    }

    cartCulcPrice();
    parent.querySelector('.count').value = 1;

    //Вызов функций
    // dontAdd(id, counter);
    // plusPrice(priceNumber)
    // printFullPrice();
    // productList.insertAdjacentHTML('afterbegin', generationPrice(img, title, priceNumber, id, counter));
    // printQuntity();
  })
});

//Удаление товара из корзины
productList.addEventListener('click', function (event) {
  if (event.target.classList.contains('article__close')) {
    console.log(event.target);
    productDelete(event.target.closest('.cart__content-item'));
    cartCulcPrice();
  }
})

// счетчик товаров
window.addEventListener('click', function (e) {
  let parent;
  let count;

  if (e.target.dataset.direction == 'minus' || e.target.dataset.direction == 'plus') {
    parent = e.target.closest('.product__count');
    count = parent.querySelector('.count');
  }

  if (e.target.dataset.direction == 'minus') {
    if (parseInt(count.value) > 1) {
      count.value = --count.value;
    }
  }

  if (e.target.dataset.direction == 'plus') {
    count.value = ++count.value;
  }

  if (e.target.closest('.cart__content-list') && e.target.classList.contains('count__btn')) {
    cartCulcPrice();
  }
})

//Удаление всех элементов из корзины
cartClear.addEventListener('click', function (e) {
  productList.querySelectorAll('*').forEach(n => {
    n.remove();
  });
  cartNumder.textContent = 0;
  price = 0;
  printFullPrice();
});

//Закрытие меню в любой точке экрана
document.addEventListener('click', function (e) {
  if (!e.target.closest('.cart') && !e.target.closest('.user-nav__link') && !e.target.closest('.article__close')) {
    cart.classList.remove('cart--active');
    body.classList.remove('body--active');
    body.style.overflow = 'auto';
    enableScroll();
  }
})




var mixer = mixitup('.top-product__list');