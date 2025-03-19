// Sample restaurant menu API data
const menuData = {
    categories: [
        { id: 1, name: 'Appetizers' },
        { id: 2, name: 'Main Courses' },
        { id: 3, name: 'Desserts' },
        { id: 4, name: 'Drinks' }
    ],
    items: {
        1: [
            { id: 101, name: 'Spring Rolls' },
            { id: 102, name: 'Garlic Bread' }
        ],
        2: [
            { id: 201, name: 'Grilled Chicken' },
            { id: 202, name: 'Pasta Carbonara' }
        ],
        3: [
            { id: 301, name: 'Cheesecake' },
            { id: 302, name: 'Chocolate Mousse' }
        ],
        4: [
            { id: 401, name: 'Coke' },
            { id: 402, name: 'Lemonade' }
        ]
    }
};

// Get DOM elements
const homeView = document.getElementById('home-view');
const categoriesView = document.getElementById('categories-view');
const itemsView = document.getElementById('items-view');
const categoriesList = document.getElementById('categories-list');
const itemsList = document.getElementById('items-list');
const goToCategoriesLink = document.getElementById('go-to-categories');
const backToHomeLink = document.getElementById('back-to-home');
const backToCategoriesLink = document.getElementById('back-to-categories');

// Function to show a specific view
function showView(view) {
    homeView.classList.add('hidden');
    categoriesView.classList.add('hidden');
    itemsView.classList.add('hidden');
    view.classList.remove('hidden');
}

// Render categories list
function renderCategories() {
    categoriesList.innerHTML = '';
    menuData.categories.forEach(category => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#category-${category.id}`;
        link.textContent = category.name;
        link.onclick = () => showItemsForCategory(category.id);
        li.appendChild(link);
        categoriesList.appendChild(li);
    });
}

// Render items for a specific category
function renderItems(categoryId) {
    itemsList.innerHTML = '';
    const items = menuData.items[categoryId];
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        itemsList.appendChild(li);
    });
}

// Show items when a category is clicked
function showItemsForCategory(categoryId) {
    renderItems(categoryId);
    showView(itemsView);
    window.history.pushState({ categoryId }, '', `#category-${categoryId}`);
}

// Event listeners
goToCategoriesLink.onclick = () => {
    renderCategories();
    showView(categoriesView);
    window.history.pushState({}, '', '#categories');
};

backToHomeLink.onclick = () => {
    showView(homeView);
    window.history.pushState({}, '', '#');
};

backToCategoriesLink.onclick = () => {
    renderCategories();
    showView(categoriesView);
    window.history.pushState({}, '', '#categories');
};

// Handle browser back/forward button
window.onpopstate = (event) => {
    if (event.state) {
        if (event.state.categoryId) {
            showItemsForCategory(event.state.categoryId);
        } else {
            showView(homeView);
        }
    } else {
        showView(homeView);
    }
};

// Initial view
showView(homeView);
