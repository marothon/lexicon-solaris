//Nunzia: function used to get an arrey for all the planets.
async function allPlanets() {
	let planets = await getPlanets();
	console.log(planets);
}
allPlanets();

//Nunzia: function to get the properties of the planets by their ID
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

//Nunzia: function to change the info on the page depending on the index of the planet.
async function updatePlanetInfo(index) {
	let planets = await getPlanets();
	if (index >= 0 && index < planets.length) {
		let planet = planets[index];
		document.getElementById("planet-name").textContent = planet.name.toUpperCase();
		document.getElementById("planet-description").textContent = planet.desc;
		document.getElementById("planet-latin-name").textContent = planet.latinName.toUpperCase();
    document.getElementById("planet-circumference").textContent = `${formatNumberWithSpaces(planet.circumference)} km`;
		document.getElementById("planet-distance").textContent = `${formatNumberWithSpaces(planet.distance)} km`;
		document.getElementById("planet-max-temp").textContent = `${planet.temp.day} °C`;
		document.getElementById("planet-min-temp").textContent = `${planet.temp.night} °C`;
		document.getElementById("planet-moons").textContent =	planet.moons.length > 0 ? planet.moons.join(", ") : "";
		updateSemicircleColors(index);
	} else {
		console.log("Index not valid.");
	}
}



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
	document.getElementById("semicircle-inner").style.backgroundColor = `${color}`;
	document.getElementById("semicircle-middle").style.backgroundColor = `${color}86`;
	document.getElementById("semicircle-outer").style.backgroundColor = `${color}2e`;
}


//Sara, Max and Nunzia: to get the parameter index be equal to id when searching for a planet
document.addEventListener("DOMContentLoaded", function () {
	const urlParams = new URLSearchParams(window.location.search);
	const planetIndex = urlParams.get("id");

	updatePlanetInfo(planetIndex);
});

//Nunzia: function to have the numbers have a space every three digits 
function formatNumberWithSpaces(number) {
	return number.toLocaleString("en-US").replace(/,/g, " ");
}

