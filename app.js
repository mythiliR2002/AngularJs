const menuData = {
  chicken: [
    { name: 'Chicken Biriyani', price: 270 },
    { name: 'Chicken Fried Rice', price: 130 },
    { name: 'Chicken Noodles', price: 130 },
    { name: 'Chicken Kabab', price: 100 }
  ],
  mutton: [
    { name: 'Mutton Biriyani', price: 270 },
    { name: 'Mutton Fried Rice', price: 130 },
    { name: 'Mutton Noodles', price: 130 },
    { name: 'Mutton Kabab', price: 100 }
  ]
};

const submitBtn = document.getElementById('submitBtn');
const foodInput = document.getElementById('foodInput');
const menuList = document.getElementById('menuList');

submitBtn.addEventListener('click', function() {
  const foodType = foodInput.value.toLowerCase();
  menuList.innerHTML = ''; // Clear previous results

  if (menuData[foodType]) {
    menuData[foodType].forEach(item => {
      const menuItem = document.createElement('li');
      menuItem.classList.add('menu-item');

      menuItem.innerHTML = `
        <span>${item.name} - ${item.price} Rupees</span>
        <button onclick="hideItem(this)">I don't want this</button>
      `;

      menuList.appendChild(menuItem);
    });
  } else {
    menuList.innerHTML = '<li>No menu items found for this type of food!</li>';
  }
});

function hideItem(button) {
  button.parentElement.style.display = 'none';
}
