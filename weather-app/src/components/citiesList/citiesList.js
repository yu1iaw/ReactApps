import React from "react";
import Requests from "../services/Requests";
import styled from 'styled-components'

import day from "../../images/day.svg";
import night from "../../images/night.svg";
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

	modifiedList = (arr) => {
		const items = arr.map((item, index) => {
			let digits = Math.round(+item.temp),
				descr = item.description,
				hours = new Date(item.time).getHours(),
				icon;

			switch (item.timezone) {
				case "Asia/Colombo":
					hours += 6;
					break;
				case "Asia/Bangkok":
					hours += 8;
					break;
				case "Europe/Kiev":
					hours += 3;
					break;
				default:
					hours += 2;
			}

			if (hours > 20 || hours < 5) {
				icon = night;
			} else if (descr === "Light rain" || descr === "Drizzle") {
				icon = rain;
			} else if (descr === "Moderate rain" || descr === "Freezing rain") {
				icon = midRain;
			} else if (descr === "Heavy rain" || descr === "Shower rain" || descr === "Heavy shower rain") {
				icon = heavyRain;
			} else if (descr === "Thunderstorm with rain" || descr === "Thunderstorm with heavy rain" || descr === "Thunderstorm with drizzle") {
				icon = thunder;
			} else if (descr === "Snow" || descr === "Light snow" || descr === "Heavy snow" || descr === "Snow shower") {
				icon = snow;
			} else if (descr === "Scattered clouds" || descr === "Few clouds") {
				icon = someClouds;
			} else if (descr === "Broken clouds" || descr === "Overcast clouds") {
				icon = clouds;
			} else if (descr === "Clear sky") {
				icon = day;
			} else {
				icon = sunny;
			}

			return (
				<li key={index}>
					{item.name === "Kiev" ? (item.name = "Kyiv") : item.name}{" "}
					<span>
						{digits}
						<sup>o</sup>C
					</span>
					<img src={icon} alt={descr} style={{ display: "block", margin: "0 auto" }}></img>
				</li>
			);
		});

		return <ul>{items}</ul>;
	};

	render() {
		const { citiesArr } = this.state;
		console.log(citiesArr);
		const item = this.modifiedList(citiesArr);

		return citiesArr.length > 0 ? <>{item}</> : <Banner/>;
	}
}

const Banner = () => {
	return (
		<Wrapper>
			<h1 style={headingStyle}>No money<br/> no party.</h1>
			<svg className="first" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.4 17 3.6-3.6 3.6 3.6 1.4-1.4-3.6-3.6L17 8.4 15.6 7 12 10.6 8.4 7 7 8.4l3.6 3.6L7 15.6Zm3.6 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>
			<svg className="sec" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.4 17 3.6-3.6 3.6 3.6 1.4-1.4-3.6-3.6L17 8.4 15.6 7 12 10.6 8.4 7 7 8.4l3.6 3.6L7 15.6Zm3.6 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>
			<svg className="third" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.4 17 3.6-3.6 3.6 3.6 1.4-1.4-3.6-3.6L17 8.4 15.6 7 12 10.6 8.4 7 7 8.4l3.6 3.6L7 15.6Zm3.6 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>
			<svg className="fourth" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.4 17 3.6-3.6 3.6 3.6 1.4-1.4-3.6-3.6L17 8.4 15.6 7 12 10.6 8.4 7 7 8.4l3.6 3.6L7 15.6Zm3.6 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>
		</Wrapper>		
	)
}

const headingStyle = {
	textAlign: 'center',
	color: 'orangered',
	fontFamily: 'Monoton',
	fontSize: '34px',
	fontWeight: 'unset',
	lineHeight: '43px',
	wordSpacing: '5px',
	margin: 0,
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)'
}

const Wrapper = styled.div`
width: 450px;
height: 150px;
position: relative;
top: 124px;
left: 49%;
transform: translateX(-50%) rotate(-39deg);
border-radius: 10px;
background-color: #f1f1f1;
box-shadow: -10px -5px 7px rgb(0 0 0 / 20%), 5px -2px 6px rgb(0 0 0 / 30%), 6px 6px 5px white inset, -6px -6px 5px white inset;
`

export default CitiesList;
