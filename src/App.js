import './App.css';
import DropDown from './components/DropDown';
import axios from "axios";
import React, {useState, useEffect} from 'react';
import Table from './components/Table';
import 'animate.css';

const baseUrl = "https://swapi.dev/api/films"

function App() {
  const [movieArray, setMovieArray] = useState([])
  const [movieTitle, setMovieTitle] = useState([])
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({})
  const [endpoints, setEndpoints] = useState(null)
  const [movieIndex, setMovieIndex] = useState(0)
  const [loading, SetLoading] = useState(false)
  

  useEffect(()=>{
    console.log("sending request.....")
    axios.get(baseUrl).then((res)=>{
      setMovieArray(res.data.results)
      setMovieTitle(getTitles(res.data.results))
      console.log('response recieved')
    })
  },[])


  // map the array to get just the title
  const getTitles = (array) =>{
    const newArray = array.map((item)=> ({
      'value': item.title,
      'label': item.title,
    }))
    return newArray
  }

  //get selected value from dropdown and call handleCharacters function
  const handleSelectedOption = (value) =>{
    setSelectedOption(value)
    var movieObject = movieArray.find(m => m.title === value.value)
    setSelectedMovie(movieObject)
    setMovieIndex(movieArray.findIndex(m => m.title === value.value) + 1) 
    SetLoading(true)
    setEndpoints(selectedMovie.characters)
  }

 
  return (
    <div className="cont text-white">
      <DropDown movieTitle={movieTitle} handleSelectedOption={handleSelectedOption}/>
      <marquee className="crawl text-center m-4 text-lg">{selectedMovie.opening_crawl}</marquee>
      <Table movieIndex={movieIndex} SetLoading={SetLoading} loading={loading}/>
    </div>
  );
}

export default App;


// animate__slideOutLeft
// animate__bounce