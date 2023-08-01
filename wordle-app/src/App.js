import React, { useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";

import useWordle from "./hooks/useWordle";
import { Wordle } from "./components/Wordle";


function App() {
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getCitiesData } = useWordle();
  

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getCitiesData();
        const dataArr = res.filter((city) => city.name.length <= 10 && !/\W/g.test(city.name.trim()));
        setSolution(dataArr[Math.floor(Math.random() * dataArr.length)].name);
        
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
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
      {loading ? (
        <div className="loader-container">
          <GridLoader color="#ff6933" size={window.innerWidth > 850 ? 23 : 14} />
        </div>
      ) : (
        solution && <Wordle solution={solution} setSolution={setSolution} />  
      )}
		</div>
	);
}

export default App;
