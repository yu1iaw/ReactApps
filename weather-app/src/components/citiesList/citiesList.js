import React from "react";
import Requests from "../services/Requests";

import day from "../../images/day.svg";
import sunny from "../../images/cloudy-day-1.svg";
import thunder from "../../images/thunder.svg";
import rain from "../../images/rainy-3.svg";
import midRain from "../../images/rainy-5.svg";
import heavyRain from "../../images/rainy-7.svg";
import clouds from "../../images/cloudy.svg";
import someClouds from "../../images/cloudy-day-3.svg";
import snow from "../../images/snowy-6.svg";

class CitiesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			citiesArr: [],
		};
		this.weather = new Requests();
	}

	componentDidMount() {
		this.weather.getAllCities().then((res) => {
			res.sort((a, b) => b.name.length - a.name.length);
			let pop = res.pop();
			res.splice(3, 0, pop);
			this.setState({ citiesArr: res });
		});
	}

	render() {
		const { citiesArr } = this.state;
		console.log(citiesArr);

		const items = citiesArr.map((item, index) => {
			let digits = Math.round(+item.temp),
				descr = item.description,
				icon;

			if (descr === "Light rain" || descr === "Drizzle") {
				icon = rain;
			}
			else if (descr === 'Moderate rain' || descr === 'Freezing rain') {
			    icon = midRain;
			}
			else if (descr === 'Heavy rain' || descr === 'Shower rain' || descr === 'Heavy shower rain') {
			    icon = heavyRain;
			}
			else if (descr === 'Thunderstorm with rain' || descr === 'Thunderstorm with heavy rain' || descr === 'Thunderstorm with drizzle') {
			    icon = thunder;
			}
			else if (descr === 'Snow' || descr === 'Light snow' || descr === 'Heavy snow' || descr === 'Snow shower') {
			    icon = snow;
			}
			else if (descr === "Scattered clouds" || descr === "Few clouds") {
				icon = someClouds;
			}
			else if (descr === "Broken clouds" || descr === "Overcast clouds") {
				icon = clouds;
			}
			else if (descr === "Clear sky") {
				icon = day;
			}
			else {
				icon = sunny;
			}

			return (
				<li key={index}>
					{item.name}{" "}
					<span>
						{digits}
						<sup>o</sup>C
					</span>
					<img src={icon} alt={item.name} style={{ display: "block", margin: '0 auto'}}></img>
				</li>
			);
		});
        

		return <ul>{items}</ul>;
	}
}

export default CitiesList;
