setup();

// Max: Start our javascript when the document has loadded
function setup(){
    document.addEventListener('DOMContentLoaded', setupSolarSystem);
}

// Max: Helper function to normalize numbers into 0-1 range.
function normalize(x, xmin, xmax){
    if(typeof x !== 'number' || typeof xmin !== 'number' || typeof xmax !== 'number'){
        throw Error(`Can't normalize non-numbers!`);
    }
    return (x - xmin) / (xmax - xmin);
}

// Max: Render our planets
async function setupSolarSystem(){
    let planets = await getPlanets();
    let sun = planets.shift();

    let planetCircs = planets.map( planet => planet.circumference);
    let minCirc = Math.min(...planetCircs);
    let maxCirc = Math.max(...planetCircs);
    const planetContainer = document.querySelector('.planet-list-container');
    const solarSystemContainer = document.querySelector('.solar-system');


    let sizeFactor = 1;

    //Handle the sun as a special case
    let sunTag = document.createElement('a');
    sunTag.classList.add('sun');
    sunTag.setAttribute('href', `planet.html?id=${sun.id}`);
    solarSystemContainer.insertAdjacentElement('beforeend', sunTag);

    //Mapping between css classes and planet IDs
    let planetCssClasses = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

    for(planet of planets){
        let planetRatio = normalize(planet.circumference, minCirc, maxCirc);
        let planetTag = document.createElement('a');
        planetTag.classList.add('planet');
        planetTag.classList.add(planetCssClasses[planet.id]);
        planetTag.id = planet.id;
        planetTag.setAttribute('name', planet.name);
        planetTag.setAttribute('href', `planet.html?id=${planet.id}`);
        if(planetRatio < 0.1) planetRatio += 0.08;
        if(planetRatio > 0.8) planetRatio -= 0.3;
        let length = planetRatio * sizeFactor;
        planetTag.style.width = `calc(${length} * 15vw)`;
        planetTag.style.height = `calc(${length} * 15vw)`;


        planetContainer.insertAdjacentElement('beforeend', planetTag);
    }

}