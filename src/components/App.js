import React, { Component } from 'react';
import './App.css';
import Form from './Form'
import Result from './Result';

//Klucz do API
const APIKey = '288e1c9d0cba83c2dac642f0ff52fc55'

class App extends Component {

  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    err: false
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleCitySubmit = (e) => {
    e.preventDefault()
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response
        }
        throw Error('Nie udało się')
      })
      .then(response => response.json())
      .then(data => {
        const time = new Date().toLocaleString()
        this.setState(prevState => ({
          err: false,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          city: prevState.value,
        }))
      })
      .catch(err => {
        console.log(err);
        this.setState(prevState => ({
          err: true,
          city: prevState.value
        }))
      })
  }
  render() {
    return (
      <div className="app">
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />
        <Result weather={this.state} />
      </div>
    );

  }
}

export default App;
