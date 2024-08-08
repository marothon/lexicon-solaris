//Sara: function to add to/remove from favorites
    function toggleFavorite(id, planets) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.findIndex(planet => planet.id === id);

        if (index !== -1) {
            // Remove from favorites
            favorites.splice(index, 1);
        } else {
            // Add to favorites
            const planet = planets.find(planet => planet.id === id);
            if (planet) {
                favorites.push(planet);
            }
        }
        
        //Save favorites to local storage 
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log("favorit are:", favorites);
    }