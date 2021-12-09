$(function () {
  $('.slider').slick({
    prevArrow: '<button type="button" class="slick-btn slick-prev"><img src="images/prevarrow.svg" alt=""></button>',
    nextArrow: '<button type="button" class="slick-btn slick-next"><img src="images/nextarrow.svg" alt=""></button>',
    fade: true,
    autoplay: 1000,
  });
});

//Каталог товаров
let body = document.querySelector('.body');
let catalogBtn = document.querySelector('.catalog-btn');

catalogBtn.addEventListener('click', function () {
  let catalogList = document.querySelector('.catalog__list');
  this.classList.toggle('catalog-btn--active');

  if (this.classList.contains('catalog-btn--active')) {
    catalogBtn.style.borderBottomRightRadius = '0';
    catalogBtn.style.borderBottomLeftRadius = '0';
    catalogList.style.opacity = '1';
  }

  else {
    catalogBtn.style.borderBottomRightRadius = '6px';
    catalogBtn.style.borderBottomLeftRadius = '6px';
    catalogList.style.opacity = '0';
  }
}

) //Появление корзины
let userNavLink = document.querySelector('.user__nav-link--cart'),
  cart = document.querySelector('.cart');

userNavLink.addEventListener('click', function () {
  cart.classList.add('cart--active');
  body.style.overflow = 'hidden';
});

//Закрытие корзины
let cartClose = document.querySelector('.cart__close');
cartClose.addEventListener('click', function () {
  cart.classList.remove('cart--active');
  body.style.overflow = 'auto';
});


// let productCart = {
//   'pineapple': {
//     'count': 0,
//   },
//   'lemon': {
//     'count': 0,
//   },
//   'dragon_fruit': {
//     'count': 0,
//   },
//   'ketchup': {
//     'count': 0,
//   },
//   'carrot': {
//     'count': 0
//   },
//   'juice': {
//     'count': 0,
//   },
//   'coffee': {
//     'count': 0,
//   },
//   'papric': {
//     'count': 0,
//   },
// }

// let count = document.querySelector('.count');
// document.addEventListener('click', function (e) {
//   if (e.target.classList.contains('count__btn--plus')) {
//     plus(e.target.dataset.id);
//   }
//   if (e.target.classList.contains('count__btn--minus')) {
//     minus(e.target.dataset.id);
//   }
// });

// //Добавление товара в корзину
// function plus(id) {
//   productCart[id]['count']++;
//   renderCart();
//   count.innerHTML = productCart['count'];
// }

// //Убавление товара из корзины
// function minus(id) {
//   if (productCart[id]['count'] - 1 == 0) {
//     deleteCart(id);
//     return true;
//   }
//   productCart[id]['count']--;
//   renderCart();
// }

// //Удаление товара из корзины
// function deleteCart(id) {
//   delete productCart[id]['count'];
//   renderCart();
// }

// function renderCart(id) {
//   console.log(productCart);
// }

let price = 0;
const priceWithout = (str) => {
  return str.replace(/\s/g, '');
}

const normilePrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

function plusPrice(currentPrice) {
  return price += currentPrice;
}

function minusPrice(currentPrice) {
  return price -= currentPrice;
}

function printFullPrice() {
  fullPrice.textContent = `${normilePrice(price)} p`;
}

const productItemCarts = document.querySelectorAll('.product__item-cart'),
  productList = document.querySelector('.cart__content-list'),
  cartNumder = document.querySelector('.cart__number'),
  fullPrice = document.querySelector('.fullprice');


productItemCarts.forEach(productItemCart => {
  productItemCart.addEventListener('click', function (e) {
    let self = e.currentTarget;
    let parent = self.closest('.product__item');
    let id = parent.dataset.id;
    let img = parent.querySelector('.product__item-img img');
    let title = parent.querySelector('.product__item-title').textContent;
    let priceNumber = parseInt(priceWithout(parent.querySelector('.product__item-price-new').textContent));
    console.log(price);
  })
});


var mixer = mixitup('.product__list');