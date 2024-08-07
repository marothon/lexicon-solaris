//Nunzia function used to get an arrey for all the planets.
async function allPlanets() {
  let planets = await getPlanets();
  console.log(planets)
}
allPlanets();

//create a function to get the properties of the planets by their ID
async function getPlanetInfoByIndex(index) {
	let planets = await getPlanets();
	if (index >= 0 && index < planets.length) {
		let planet = planets[index];
		console.log(`ID: ${index}`);
 		console.log(`Type: ${planet.type}`);
		console.log(`Name: ${planet.name}`);
		console.log(`Latin name: ${planet.latinName}`);
		console.log(`Description: ${planet.desc}`);
		console.log(`Rotation: ${planet.rotation}`);
		console.log(`Circumference: ${planet.circumference} km`);
		console.log(
			`Temp: day - ${planet.temp.day}, Night - ${planet.temp.night} °C`
		);
		console.log(`Distance: ${planet.distance} km`);
		console.log(`Orbital period: ${planet.orbitalPeriod}`);
		console.log(`Månar: ${planet.moons.join(", ")}`);
	} else {
		console.log("Index not valid.");
	}

}
getPlanetInfoByIndex(2); 

// function to change the info on the page depending on the index of the planet.
async function updatePlanetInfo(index) {
    let planets = await getPlanets();
    if (index >= 0 && index < planets.length) {
        let planet = planets[index];
        document.getElementById('planet-name').textContent = planet.name;
        document.getElementById('planet-description').textContent = planet.desc;
        document.getElementById('planet-circumference').textContent = `OMKRETS: ${planet.circumference} km`;
        document.getElementById('planet-distance').textContent = `KM FRÅN SOLEN: ${planet.distance} km`;
        document.getElementById('planet-max-temp').textContent = `MAX TEMPERATUR: ${planet.temp.day}`;
        document.getElementById('planet-min-temp').textContent = `MIN TEMPERATUR: ${planet.temp.night} `;
        document.getElementById('planet-moons').textContent = `MÅNAR: ${planet.moons.join(', ')}`;
    } else {
        console.log("Index not valid.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
	const urlParams = new URLSearchParams(window.location.search);
	const planetIndex = urlParams.get("id");

	updatePlanetInfo(planetIndex);
});
/*
	// on load
	const favSpan = document.getElementById("favSpan"); //Nunzia favSpan is the Id for the span which includes the heart icon that you have in your HTML
	if (isFavorited(planet.name)) {
		favSpan.classList.add("favorited");
	}
	function isFavorited(name) {
		return favorites.some((p) => p.name === name);
	}
	favSpan.addEventListener("click", () => {
		AddOrRemoveFavorite(planet.name);
		favSpan.classList.toggle("favorited");
	}); // Function to update favorites
	function AddOrRemoveFavorite(name) {
		const index = favorites.findIndex((planet) => planet.name === name);
		if (index !== -1) {
			// Remove from favorites
			favorites.splice(index, 1);
		} else {
			// Add to favorites
			const planet = planets.find((planet) => planet.name === name);
			if (planet) {
				favorites.push(planet);
			}
		}
		renderFavorites();
		console.log(favorites);
	}
});


