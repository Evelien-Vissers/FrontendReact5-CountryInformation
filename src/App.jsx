import './App.css';
import worldMap from './assets/world_map.png'
import { getColorByRegion} from "./helpers/getColorByRegion.jsx";
import {useState} from "react";

//'countries' is als state variabele opgehaald om de opgehaalde landeninformatie op te slaan
//'isFetched' is opgehaald om bij te houden of de informatie al is opgeslagen
function App() {
    const [countries, setCountries] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const fetchCountries = async () => {
        try {
            //Gebruik de juiste fields om regio-informatie ook op te halen
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,flags,region');
            const data = await response.json();

            // Sorteren van landen op populatie (van laag naar hoog)
            const sortedCountries = data.sort((a,b) => a.population - b.population);

            setCountries(sortedCountries);
            setIsFetched(true);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    return (
        <div className="App">
            <h1>Country Information</h1>
            <img src={worldMap} alt="WorldMap" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
            {!isFetched && (
                <button onClick={fetchCountries}>Fetch Countries</button>)}

            <div className="countries-container">
                {countries.map((country) => (
                    /*Voor het identificeren van landen in deze .map functie wordt de unieke cca3 code die elk land heeft gebruikt. Dit zorgt ervoor dat React efficienter met de lijst omgaat. */
                    <div key={country.cca3}>
                        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="100" />
                        <p style={{ color: getColorByRegion(country.region) }}>{country.name.common}</p>
                        <p>Has a population of {country.population.toLocaleString()} people</p>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default App
