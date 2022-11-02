import axios from 'axios';

class Requests {
    getResource = async (url) => {
		let res = await axios.get(url);
		return res;
	};

    getCity = () => {
        return this.getResource('https://api.weatherbit.io/v2.0/current?city_id=292223&key=063eabe9a0434478ae859b859cd39d68');
    }

	getAllCities = async () => {
		const res = await this.getResource('https://api.weatherbit.io/v2.0/current?cities=1250161%2C%201154689%2C%202800866%2C%203081368%2C%20702550%2C%20703448&key=063eabe9a0434478ae859b859cd39d68');
		return res.data.data.map(this._allYouNeed);
	}

	_allYouNeed = (city) => {
		return {
			name: city.city_name,
			temp: city.temp,
			description: city.weather.description,
			time: city.ob_time,
			timezone: city.timezone
		}
	}
}

export default Requests;
