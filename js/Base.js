    //Sara: function to add to/remove from favorites
    function toggleFavorite(name) {
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
        console.log(favorites)
    }