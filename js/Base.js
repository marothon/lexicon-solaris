    //Sara: function to add to/remove from favorites
    function AddOrRemoveFavorite(id) {
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
        console.log(favorites)
    }