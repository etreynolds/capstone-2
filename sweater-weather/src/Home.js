import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import "./Home.css";

function Home() {

    const { currentUser } = useContext(UserContext);
    const [zipCode, setZipCode] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [notFoundError, setNotFoundError] = useState(false);
    const navigate = useNavigate();

    // Redirect to login page if no user is signed in
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value);
    };

    const getWeatherData = async () => {
        try {
            const apiKey = 'd134bb024c84e36998b919106cd4c42c';
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${apiKey}`);
            setWeatherData(res.data);
            setNotFoundError(false);
        } catch (error) {
            console.error("Error fetching weather data:", error);

            // Handle 404 error
            if (error.response && error.response.status === 404) {
                setNotFoundError(true);
            }
        }
    };


    const getIconUrl = (iconName) => {
        return `https://openweathermap.org/img/wn/${iconName}@2x.png`
    }

    function handleSubmit(e) {
        e.preventDefault();
        getWeatherData();
    }

    const recommendSweater = () => {
        if (weatherData) {
            const temp = weatherData.main.feels_like;
            const thresholdTemp = 55;
            return temp <= thresholdTemp;
        }
        return false;
    }

    return (
        <div className="Home">
            {currentUser && currentUser.username ? (
                <div>
                    <h2 className="mt-3">Welcome to SweaterWeather, {currentUser.username}!</h2>
                    <h5>Enter a valid US zip code and see if you need a sweater!</h5><br />
                </div>
            ) : null}
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 w-25 mx-auto">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Zip Code"
                            value={zipCode}
                            onChange={handleZipCodeChange}
                        />
                    </div>
                </form>
                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Get Weather</button>
                <br />
                <br />

                {/* Show 404 error if set to true */}
                {notFoundError && (
                    <p style={{ color: 'red' }}><b><i>Incorrect Zip Code! Please try again.</i></b></p>
                )}

                {weatherData && (
                    <div>
                        <h3><i>{weatherData.name}</i></h3>
                        <img src={getIconUrl(weatherData.weather[0].icon)} alt="weather-icon"></img>
                        <p>Currently: <b>{weatherData.main.temp.toFixed(0)}° F</b> with <b>{weatherData.weather[0].description}</b> conditions<br />
                            Wind: <b>{weatherData.wind.speed} mph</b> --- Humidity: <b>{weatherData.main.humidity}%</b><br />
                            Feels Like: <b>{weatherData.main.feels_like.toFixed(0)}° F</b>
                        </p>
                        <h3 className="highlight w-50 mx-auto">{recommendSweater() ? 'You should wear a sweater!' : 'No sweater needed!'} </h3>


                    </div>
                )}

            </div>
        </div>

    );
}

export default Home;