import React, {useState, useEffect} from 'react'
import axios from "axios";
import { v4 as uuid } from 'uuid'
import {BiMale} from "react-icons/bi"
import {FaFemale} from "react-icons/fa"
import FilterGender from './FilterGender';
import BounceLoader from 'react-spinners/BounceLoader';


const Table = ({movieIndex,SetLoading, loading}) => {
  const unique_id = uuid();
  const [loader, setLoader] = useState([])
  const [filteredArray, setFilteredArray] = useState([])
  


  useEffect(() =>{
    setLoader([])
    setFilteredArray([])
    axios.get(`https://swapi.dev/api/films/${movieIndex}`).then((res)=>{
        console.log(res.data.characters)
        SetLoading(current => false)
        handleArrays(res.data.characters)
    })
  },[movieIndex])


  const handleArrays = (array) =>{
    var stuff = Object.keys(array).map(key => array[key])
        axios.all(stuff.map((endpoint) => axios.get(endpoint))).then(
            (data) => (
                setLoader(data),
                SumOfHeight(loader)
            )
        )
  }

  //   get the sum of their heights
  const SumOfHeight = (arrayOfObject) =>{
    let newArray = arrayOfObject.map((object) => object.data.height)
    let sum = newArray.reduce((a,b) => parseInt(a)+parseInt(b), 0)
    convertCmTOFeet(sum)
    return sum
  }

  // convert cm to feets
  const convertCmTOFeet = (val) =>{
    let feets = val * 0.0328
    return feets
  }

  // handle filtering
  const handleFilterOption = (inputArray) =>{
    setFilteredArray(inputArray)
  }
  return (
    <div className='flex flex-col justify-center w-full h-full p-4'>
        {
            loading &&
            <div className='mx-auto'>
                <BounceLoader
                    size={150}
                    color={"#FDE309"}
                    loading={loading}
                />
            </div>
            
        }
        {
            loader.length > 0 && filteredArray.length === 0 &&
            <div className='w-[90%] h-[80%] mx-auto rounded-lg bg-black border-2 border-[#FDE309] overflow-auto p-4'>
                <FilterGender characters={loader} handleFilterOption={handleFilterOption}/>
                <div className='flex flex-col justify-center space-y-5'>    
                    <div className='font-bold text-xl flex justify-around w-[100%] text-[#FDE309]'>
                        <h1>Name</h1>
                        <h1>Gender</h1>
                        <h1>Height</h1>
                    </div>
                
                    { 
                        loader.map(v => (
                            <div className='flex justify-around' key={unique_id.slice(0,100)}>
                                <div className="flex justify-center w-[20%]">
                                    {v.data.name}
                                </div>
                                <div className="flex justify-center w-[20%] text-xl">
                                    {
                                        v.data.gender == "male" &&
                                        <div className='flex items-center'>
                                            <BiMale />
                                            <span>M</span>
                                        </div>
                                        
                                    }
                                    {
                                        v.data.gender == "female" &&
                                        <div className='flex items-center'>
                                            <FaFemale />
                                            <span>F</span>
                                        </div>
                                    }
                                    {
                                        v.data.gender !== "female" && v.data.gender !== "male" &&
                                        v.data.gender
                                    }
                                </div>
                                <div className="flex justify-center w-[20%]">
                                    {v.data.height}
                                </div>
                            </div>
                            
                        ))
                    }
                    <div className='flex justify-around text-center text-[#FDE309] text-xl font-bold'>
                        <h1>Sum of heights</h1>
                        <h1></h1>
                        <h1>{SumOfHeight(loader)}cm ({convertCmTOFeet(SumOfHeight(loader))}) feets</h1>
                    </div>
                </div>
            </div>
            
        }
        {
            filteredArray.length > 0 &&
            <div className='w-[90%] h-[80%] mx-auto rounded-lg bg-black border-2 border-[#FDE309] overflow-auto'>
                <FilterGender characters={loader} handleFilterOption={handleFilterOption}/>
                <div className='flex flex-col justify-center space-y-5'>    
                    <div className='font-bold text-xl flex justify-around w-[100%] text-[#FDE309]'>
                        <h1>Name</h1>
                        <h1>Gender</h1>
                        <h1>Height</h1>
                    </div>
                
                    { 
                        filteredArray.map(v => (
                            <div className='flex justify-around' key={unique_id.slice(0,100)}>
                                <div className="flex justify-center w-[20%]">
                                    {v.data.name}
                                </div>
                                <div className="flex justify-center w-[20%] text-xl">
                                    {
                                        v.data.gender == "male" &&
                                        <div className='flex items-center'>
                                            <BiMale />
                                            <span>M</span>
                                        </div>
                                        
                                    }
                                    {
                                        v.data.gender == "female" &&
                                        <div className='flex items-center'>
                                            <FaFemale />
                                            <span>F</span>
                                        </div>
                                    }
                                    {
                                        v.data.gender !== "female" && v.data.gender !== "male" &&
                                        v.data.gender
                                    }
                                </div>
                                <div className="flex justify-center w-[20%]">
                                    {v.data.height}
                                </div>
                            </div>
                            
                        ))
                    }
                    <div className='flex justify-around text-center text-[#FDE309] text-xl font-bold'>
                        <h1>Sum of heights</h1>
                        <h1></h1>
                        <h1>{SumOfHeight(loader)}cm ({convertCmTOFeet(SumOfHeight(loader))}) feets</h1>
                    </div>
                </div>
            </div>
        }
        
    </div>
  )
}

export default Table