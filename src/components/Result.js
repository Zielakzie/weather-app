import React from 'react';
import './Result.css';

const Result = (props) => {

    const { date, city, sunrise, sunset, temp, pressure, wind, err } = props.weather

    let content = null;


    if (!err && city) {

        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
        const tempRounded = Math.round(temp);

        //.toLowerCase() then Capitalize with css
        const cityLowerCase = city.toLowerCase();

        content = (
            <>
                <div className='divider'></div>
                <h1>Wyniki wyszukiwania dla <em>{cityLowerCase}</em></h1>
                <p>Dane dla dnia i godziny: {date}</p>
                <p>Aktualana temperatura: {tempRounded} &#176;C</p>
                <p>Wschód słońca dzisiaj o {sunriseTime}</p>
                <p>Zachód słońca dzisiaj o {sunsetTime}</p>
                <p>Aktualna siła wiatru {wind} m/s</p>
                <p>Aktualne ciśnienie {pressure} hPa</p>

            </>
        )
    }

    return (
        <div className="result">
            {err ? `Nie mamy w bazie ${city}` : content}
        </div>

    );
}

export default Result;