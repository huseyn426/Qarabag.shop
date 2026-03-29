// script.js

// Загружаем товары и язык из памяти
let products = JSON.parse(localStorage.getItem('qarabag_products')) || [];
let currentLang = localStorage.getItem('qarabag_lang') || 'az';

const translations = {
    az: {
        nav_products: "Məhsullar",
        hero_subtitle: "Qarabağ FK-nın əsl azarkeşləri üçün premium geyimlər.",
        hero_btn: "Kolleksiyaya bax",
        filter_all: "Hamısı",
        filter_hoodies: "Hudi",
        filter_tshirts: "Köynəklər",
        filter_scarfs: "Şərflər",
        filter_other: "Digər",
        footer_rights: "Bütün hüquqlar qorunur."
    },
    ru: {
        nav_products: "Продукция",
        hero_subtitle: "Экипировка для истинных фанатов ФК Карабах.",
        hero_btn: "В каталог",
        filter_all: "Все",
        filter_hoodies: "Худи",
        filter_tshirts: "Футболки",
        filter_scarfs: "Шарфы",
        filter_other: "Другое",
        footer_rights: "Все права защищены."
    },
    en: {
        nav_products: "Products",
        hero_subtitle: "Premium gear for true Qarabag fans.",
        hero_btn: "Shop Now",
        filter_all: "All",
        filter_hoodies: "Hoodies",
        filter_tshirts: "T-shirts",
        filter_scarfs: "Scarfs",
        filter_other: "Other",
        footer_rights: "All rights reserved."
    }
};

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateLanguageUI();
    renderProducts(products);
});

// Открытие/закрытие меню языков
function toggleLangDropdown() {
    const drop = document.getElementById('lang-dropdown');
    drop.classList.toggle('show');
}

// Смена языка
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('qarabag_lang', lang); // Сохраняем выбор
    updateLanguageUI();
    toggleLangDropdown();
    renderProducts(products); // Перерисовываем, если нужно обновить тексты в карточках
}

// Функция обновления всех текстов на странице
function updateLanguageUI() {
    // Обновляем текст кнопки
    document.getElementById('current-lang-text').innerText = currentLang.toUpperCase();
    
    // Ищем все элементы с атрибутом data-key и меняем текст
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });
}

// Закрытие дропдауна при клике в любое другое место
window.onclick = function(event) {
    if (!event.target.closest('.lang-switcher')) {
        document.getElementById('lang-dropdown').classList.remove('show');
    }
}

// Функция рендера (отрисовки) товаров
function renderProducts(items) {
    const grid = document.getElementById('shop-grid');
    if (!grid) return;
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.img}" class="product-image">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="product-price">${p.price} AZN</p>
            </div>
        </div>
    `).join('');
}

function filterProducts(category, element) {
    // 1. Подсветка кнопки (двигаем "черный фон")
    if (element) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        element.classList.add('active');
    }

    // 2. Логика фильтрации
    // Берем актуальные товары из памяти
    const allProducts = JSON.parse(localStorage.getItem('qarabag_products')) || [];
    
    // Если "all", берем всё, иначе фильтруем по категории
    const filtered = category === 'all' 
        ? allProducts 
        : allProducts.filter(p => p.category === category);
    
    // 3. Отображаем результат
    renderProducts(filtered);
}

