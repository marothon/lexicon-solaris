setup(); 

//Everyone (parseInt used to ensure that ID is a number)
function setup() {
	document.addEventListener("DOMContentLoaded", function () {
		const urlParams = new URLSearchParams(window.location.search);
		const planetIndex = parseInt(urlParams.get("id"));

		updatePlanetInfo(planetIndex);
	});
}

//Nunzia: function to change the info on the page depending on the index of the planet.
async function updatePlanetInfo(index) {
	let planets = await getPlanets();
	setupFavoriteButton(index, planets);
	if (index >= 0 && index < planets.length) {
		let planet = planets[index];
		document.getElementById("planet-name").textContent =
			planet.name.toUpperCase();
		document.getElementById("planet-description").textContent = planet.desc;
		document.getElementById("planet-latin-name").textContent =
			planet.latinName.toUpperCase();
		document.getElementById("planet-circumference").textContent = `${formatNumberWithSpaces(planet.circumference)} km`;
		document.getElementById("planet-distance").textContent = `${formatNumberWithSpaces(planet.distance)} km`;
		document.getElementById("planet-max-temp").textContent = `${planet.temp.day} °C`;
		document.getElementById("planet-min-temp").textContent = `${planet.temp.night} °C`;
		document.getElementById("planet-moons").textContent =	planet.moons.length > 0 ? planet.moons.join(", ") : "";
		updateSemicircleColors(index);
	} else {
		console.log("Index not valid.");
		 const mainContent = document.querySelector("body");
        if (mainContent) {mainContent.innerHTML = `
							<a href="index.html" class="back-button" style="font-size: 25px; margin-block: auto; margin-left: 10vw;"><i class="fas fa-arrow-left"></i> BACKA </a>
                <p style="text-align: center; margin-block: auto; margin-left: 15vw; font-size: 1.5em; color: white;">
                    Kunde inte hitta planeten. Tryck på backa för att gå till hemsidan.
                </p>`;
		}}};

//Nunzia: update the semicircle colors based on the planet ID
function updateSemicircleColors(index) {
	const colors = {
		0: "#FFD029",
		1: "#888888",
		2: "#E7CDCD",
		3: "#428ED4",
		4: "#EF5F5F",
		5: "#E29468",
		6: "#C7AA72",
		7: "#C9D4F1",
		8: "#7A91A7",
	};

	const color = colors[index] || "#FFFFFF";
	//Nunzia: to keep the opacity the same for the 3 semicircles when they change color
	document.getElementById(
		"semicircle-inner"
	).style.backgroundColor = `${color}`;
	document.getElementById(
		"semicircle-middle"
	).style.backgroundColor = `${color}86`;
	document.getElementById(
		"semicircle-outer"
	).style.backgroundColor = `${color}2e`;
}


//Nunzia: function to have the numbers have a space every three digits
function formatNumberWithSpaces(number) {
	return number.toLocaleString("en-US").replace(/,/g, " ");
}

// Everyone: function to add and remove the favourite planet 
function setupFavoriteButton(planetIndex, planets) {
	const favSpan = document.getElementById("favSpan");
	let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
	if (isFavorited(planetIndex)) {
		favSpan.classList.add("favorited");
	}

	function isFavorited(id) {
		return favorites.some((p) => p.id === id);
	}

	favSpan.addEventListener("click", () => {
		toggleFavorite(planetIndex, planets);
		favSpan.classList.toggle("favorited");
		
	});	
}

