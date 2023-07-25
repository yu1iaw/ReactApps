import React, { useEffect, useState } from "react";

import useWordle from "./hooks/useWordle";
import { Wordle } from "./components/Wordle";


function App() {
  const [solution, setSolution] = useState(null);
  const { getCitiesData } = useWordle();


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getCitiesData();
        const dataArr = res.filter((city) => city.name.length <= 10 && !/\W/g.test(city.name.trim()));
        setSolution(dataArr[Math.floor(Math.random() * dataArr.length)].name);
        
      } catch (e) {
        console.log(e);
      }
    };
  
    getData();
    // eslint-disable-next-line
  }, []);


	return (
		<div className="App">
      <header>
        <div className="title">
          <h1>Wordle City</h1>
        </div>
      </header>
      { solution && <Wordle solution={solution} setSolution={setSolution} />  }
		</div>
	);
}

export default App;
