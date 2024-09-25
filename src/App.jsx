import './App.css';
import worldMap from './assets/world_map.png'
import { getColorByRegion} from "./helpers/getColorByRegion.jsx";
import { convertPopulationToMillions} from "./helpers/convertPopulation.jsx";
import {useState} from "react";
import axios from 'axios';

//'countries' is als state variabele opgehaald om de opgehaalde landeninformatie op te slaan
//'isFetched' is opgehaald om bij te houden of de informatie al is opgeslagen
function App() {

    // State voor Opdracht 1 - voor alle landen
    /*
    const [countries, setCountries] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    */

    //State voor Opdracht 2 - zoekfunctionaliteit:
    const [countryData, setCountryData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    //Functie Opdracht 1 - ophalen van alle landen
    /*
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
    */

    //Functie opdracht 2: gegevens ophalen van een specifiek land:
    const fetchCountry = async (name) => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
            const data = response.data();

            console.log(`Country: ${data[0].name.common}, Capital: ${data[0].capital[0]}`);

            if (!data || data.length === 0) {
            setError(`${name} bestaat niet. Probeer het opnieuw.`);
            setCountryData(null);
            } else {
                setCountryData(data[0]);
                setError(''); // Verwijder foutmelding bij succesvolle zoekopdracht
            }
        } catch (error) {
            console.error('Error fetching country:', error);
            setError('Er is een fout opgetreden. Probeer het opnieuw.');
        }
    };


    const handleSearch = async () => {
        if (searchTerm) {
            await fetchCountry(searchTerm);
            setSearchTerm(''); //Leeg het zoekveld na zoekopdracht
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="App">
            <h1>Country Information</h1>
            <img src={worldMap} alt="WorldMap" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />

            {/*} //Functionaliteit Opdracht 1 - weergeven van alle landen
            {!isFetched && (
                <button onClick={fetchCountries}>Fetch Countries</button>)}

            <div className="countries-container">
                {countries.map((country) => (
                    Voor het identificeren van landen in deze .map functie wordt de unieke cca3 code die elk land heeft gebruikt. Dit zorgt ervoor dat React efficienter met de lijst omgaat.
                    <div key={country.cca3}>
                        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="100" />
                        <p style={{ color: getColorByRegion(country.region) }}>{country.name.common}</p>
                        <p>Has a population of {country.population.toLocaleString()} people</p>
                    </div>
                ))}
            </div>
        */}

            {/* Functionaliteit Opdracht 2 */
            }
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for a country..."
                    />
                <button onClick={handleSearch}>Search</button>
            </div>

            {error && <p className="error">{error}</p>}

            {countryData && (
                <div className="country-info">
                    <img src={countryData.flags.svg} alt={`Flag of ${countryData.name.common}`} width="100" />
                    <h2 style={{ color: getColorByRegion(countryData.region) }}>{countryData.name.common}</h2>
                    <p>{countryData.name.common} is situated in {countryData.subregion} and the capital is {countryData.capital[0]}</p>
                    <p>It has a population of {convertPopulationToMillions(countryData.population)} million people and it borders with {countryData.borders ? countryData.borders.length : 0} neighboring countries</p>
                    <p>Websites can be found on {countryData.domains.join(',')} domain&amp;s</p>
                </div>
            )}

        </div>

    )
}

export default App
