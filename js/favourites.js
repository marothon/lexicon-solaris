//Sara: Add eventlistener to ensure that the DOM is fully loaded before the script runs.
document.addEventListener("DOMContentLoaded", () => {
    renderFavorites();

    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', goBack);

    //Sara: function to go back to the homepage
    function goBack() {
        window.location.href = 'index.html';
    }

    //Sara: create a mapping of planet Ids to image URLs
    const planetImages = {
        0: 'assets/sun.jpg',
        1: 'assets/mercury.jpg',
        2: 'assets/venus.jpg',
        3: 'assets/earth.jpg',
        4: 'assets/mars.jpg',
        5: 'assets/jupiter.jpg',
        6: 'assets/saturn.jpg',
        7: 'assets/uranus.jpg',
        8: 'assets/neptune.jpg',
    };

    //Sara: function to render favorites list
    function renderFavorites() {
        const favoritesList = document.getElementById('favorites-list');
        favoritesList.innerHTML = '';

        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        favorites.forEach(planet => {
            const itemRow = document.createElement('section');
            itemRow.classList = 'favorite-item';

            const itemImage = document.createElement('img');
            itemImage.classList = 'item-img';
            const imageUrl = planetImages[planet.id];
            itemImage.src = imageUrl;
            itemImage.alt = `${planet.name}`;
            itemImage.title = "Klicka för att läsa mer"; // Add tooltip
            itemImage.addEventListener('click', () => viewPlanet(planet.id));

            const itemContent = document.createElement('section');
            itemContent.classList = 'item-content';

            const itemName = document.createElement('h2');
            itemName.classList = 'item-name';
            itemName.innerText = `${planet.name}`;
            itemName.title = "Klicka för att läsa mer";
            itemName.addEventListener('click', () => viewPlanet(planet.id));

            const itemDesc = document.createElement('p');
            itemDesc.classList = 'item-desc';
            itemDesc.innerText = `${planet.desc.substring(0, 200)}...`;
            itemDesc.title = "Klicka för att läsa mer";
            itemDesc.addEventListener('click', () => viewPlanet(planet.id));

            const favIconContent = document.createElement('section');
            favIconContent.classList = 'favorite-icon-container';

            const favSpan = document.createElement('span');
            favSpan.classList = 'heart favorited';
            favSpan.id = 'favSpan';
            favSpan.addEventListener('click', () => AddOrRemoveFavorite(planet.name));

            const favIcon = document.createElement('i');
            favIcon.classList = 'fas fa-heart';

            favSpan.appendChild(favIcon);
            favIconContent.appendChild(favSpan);

            itemContent.appendChild(itemName);
            itemContent.appendChild(itemDesc);

            itemRow.appendChild(itemImage);
            itemRow.appendChild(itemContent);
            itemRow.appendChild(favIconContent);

            favoritesList.appendChild(itemRow);
        });
    }

    // Sara: function to go to the single planet page to view planet details
    function viewPlanet(id) {
        window.location.href = `planet.html?id=${id}`;
    }

    //Sara: function to add to/remove from favorites
    function AddOrRemoveFavorite(name) {
        const index = favorites.findIndex(planet => planet.name === name);
        if (index !== -1) {
            // Remove from favorites
            favorites.splice(index, 1);
        } else {
            // Add to favorites
            const planet = planets.find(planet => planet.name === name);
            if (planet) {
                favorites.push(planet);
            }
        }
        renderFavorites();
        console.log(favorites)
    }
});