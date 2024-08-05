//Sara:
document.addEventListener("DOMContentLoaded", () => {
    renderFavorites();
  });


//Sara: function to render favorites list
function renderFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(planet => {
        const item = document.createElement('section');
        item.className = 'favorite-item';

        item.innerHTML = `
            <img src=" " alt="${planet.name}" onclick="viewPlanet('${planet.name}')">
            <section class="item-content">
                <h2 onclick="viewPlanet('${planet.name}')">${planet.name}</h2>
                <p onclick="viewPlanet('${planet.name}')">${planet.desc}</p>
            </section>
            <section class="favorites-">
                <span class=" " onclick="toggleFavorite('${planet.name}')"><i class="fas fa-heart"></i></span>
            </div>
        `;

        favoritesList.appendChild(item);
    });
}

 // Sara: function to go to the single planet page
function viewPlanet(name) {
    window.location.href = `planet.html?name=${name}`;
}

//Sara: function to go back to the homepage
function goBack() {
    window.location.href = 'index.html';
}

//Sara: function to add to/remove from favorites
function toggleFavorite(name) {
   
}