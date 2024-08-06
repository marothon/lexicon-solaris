// Max: Fetch data from the planet api, store it in localStorage and return it.
// If the data is already in localStorage, return it immediately.
async function getPlanets(){
    const baseUrl = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com';
    let apiKey;
    let planets = localStorage.getItem('planets');
    if(planets === null){
        try {
            const apiKeyResponse = await fetch(`${baseUrl}/keys`, {
                method: 'POST'
            });
            apiKey = await apiKeyResponse.json();
            apiKey = apiKey.key;
        } catch(error){
            console.error(`Unable to fetch API-key: ${error.message}`);
            return [];
        }

        try {
            bodiesResponse = await fetch(`${baseUrl}/bodies`, {
                method: 'GET',
                headers: {'x-zocom': apiKey}
            });
            planets = await bodiesResponse.json();
            localStorage.setItem('planets', JSON.stringify(planets.bodies));
            return planets.bodies;
        } catch(error){
            console.error(`Unable to fetch planet-data: ${error.message}`);
            return [];
        }
    } else {
        return JSON.parse(planets);
    }
}