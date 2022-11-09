import React from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

import Requests from "../services/Requests";
import snow from "../../images/snowy-6.svg";
import rain from "../../images/rainy-1.svg";
import thunder from "../../images/thunder.svg";
import clouds from "../../images/cloudy.svg";
import day from "../../images/day.svg";

const canvasStyle = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  };

class CityList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			temp: null,
			description: null,
		};

		this.weather = new Requests();
		this.animationInstance = null;
	}

	componentDidMount() {
		this.updateCondition(this.props.src);
	}

	updateCondition = (url) => {
		this.weather.getResource(url).then((res) => {
			console.log(res);
			this.setState({
				name: res.data.data[0].city_name,
				temp: res.data.data[0].temp,
				description: res.data.data[0].weather.description
			});
		});
	};

	makeShot = (particleRatio, opts) => {
		this.animationInstance &&
			this.animationInstance({
				...opts,
				origin: {
                    y: 0.4
                },
				particleCount: Math.floor(120 * particleRatio),
			});
	};

	fire = () => {
		this.makeShot(0.25, {
			spread: 10,
			startVelocity: 95,
			scalar: 0.5,
			drift: -0.1,
			ticks: 333,
			colors: ['#dc143c'],
			shapes: ['circle']
		});

		this.makeShot(0.35, {
			spread: 105,
			scalar: 0.8,
            ticks: 330
		});
	};

	getInstance = (instance) => {
		this.animationInstance = instance;
	};

	render() {
        // eslint-disable-next-line
		const { name, temp, description } = this.state;
        // eslint-disable-next-line
		let num = Math.round(+temp);
        // eslint-disable-next-line
		let icon = day;
		// eslint-disable-next-line
		switch (description) {
			case "Clear sky":
				icon = day;
				break;
			case "Moderate rain":
				icon = rain;
				break;
			case "Scattered clouds":
				icon = clouds;
				break;
			case "Thunderstorm with rain":
				icon = thunder;
				break;
			case "Snow":
				icon = snow;
				break;
		}

		return (
			<>
				<ul onClick={this.fire}>
					<li>
						Dirty bomb
						{/* <p>{name} <span>{num}<sup>o</sup>C</span></p> */}
						{/* <img src={icon} alt={name} style={{display: 'block', margin: '0 auto'}}></img> */}
					</li>
				</ul>
				<ReactCanvasConfetti refConfetti={this.getInstance} style={canvasStyle} />
			</>
		);
	}
}

export default CityList;
