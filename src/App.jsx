import './App.css';
import worldMap from './assets/world_map.png'
import {useState} from "react";

//'countries' is als state variabele opgehaald om de opgehaalde landeninformatie op te slaan
//'isFetched' is opgehaald om bij te houden of de informatie al is opgeslagen
function App() {
    const [countries, setCountries] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,flags');
            const data = await response.json();
            setCountries(data);
            setIsFetched(true);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    return (
        <div className="App">
            <h1>Country Information</h1>
            <img src={worldMap} alt="WorldMap" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
            {isFetched && (
                <button onClick={fetchCountries}>Fetch Countries</button>)}
            <div>
                {countries.map((country) => (
                    <div key={country.name.commong}>
                        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="50" />
                        <p>{country.name.common}</p>
                        <p>Population: {country.population.toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default App
