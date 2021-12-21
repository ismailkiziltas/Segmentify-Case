var mocks = data.responses[0][0].params;
var sliderContainer = document.querySelector('[slider]');
var menu = document.getElementById('menu');
var alert = document.querySelector('[alert]');

function setCategories() {
    mocks.userCategories.forEach(function (item, index) {
        var menuItem = '<li class="menu-item ' + (index === 0 ? 'active' : '') + '"  onclick="categoryClickHandler(\'' + item + '\',this)">' + item + '</li>';
        menu.innerHTML += menuItem;
    });
}
function closeAlert() {
    alert.style.display = "none";
}

function showAlert() {

    if (alert.style.display === "flex") {
        return false;
    }
    else {
        alert.style.display = "flex";
        setTimeout(() => {
            alert.style.display = "none";
        }, 3000);
    }
}

function setSliderItems(products) {
    sliderContainer.innerHTML = '';
    mocks.recommendedProducts[products].forEach(function (item) {
        var sliderItem = '<div class="swiper-slide">';
        sliderItem+='<div class="product">';
        sliderItem += '<img class="img-fluid lazy"  loading="lazy" src="' + item.image + '" alt="' + item.name + '">';
        sliderItem += '<h3 class="product-name">' + item.name + '</h3>';
        sliderItem += '<h1 class="product-price">' + item.priceText + '</h1>';
        sliderItem += '<h6 class="cargo-text"> <img src="/icons/cargo-bus.svg" /> <span>Ücretsiz Kargo</span></h6>';
        sliderItem += '<button onclick="showAlert()" class="add-cart-btn"><span>Sepete Ekle</span></button>';
        sliderItem +='</div>';
        sliderItem += '</div>';
        sliderContainer.innerHTML += sliderItem;
    });
}

function categoryClickHandler(category, element) {

    setSliderItems(category)
    var menuItems = document.getElementsByClassName('menu-item');
    if (menuItems && menuItems.length > 0) {

        menuItems = Array.prototype.slice.call(menuItems);
        menuItems.forEach(function (item) {
            item.classList.remove('active');
        });

        element.classList.add('active');
    }
}

window.addEventListener('load', function () {
    new Swiper('.swiper', {
        slidesPerView: "auto",
        spaceBetween: 0
    });

    setCategories();
    setSliderItems(mocks.userCategories[0]);
});

