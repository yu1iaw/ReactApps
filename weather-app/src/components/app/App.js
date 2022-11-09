import React from 'react';
import CityList from '../cityList/cityList';
import CitiesList from '../citiesList/citiesList';

import './App.css';


function App() {
  return (
    <>
      <CitiesList/>
      <CityList src={'https://api.weatherbit.io/v2.0/current?city_id=292223&key=063eabe9a0434478ae859b859cd39d68'}/>
      {/* <CityList src={'https://api.weatherbit.io/v2.0/current?city_id=251833&key=063eabe9a0434478ae859b859cd39d68'}/> */}
      

    </>
  );
}

export default App;
