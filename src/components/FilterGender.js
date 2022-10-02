import React, {useState} from 'react'
import Select from 'react-select';

const FilterGender = ({characters,handleFilterOption,setSortedArray}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "",
      // match with the menu
      borderColor: state.isFocused ? "black" : "black",
    }),
  };


  const options = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' },
    { value: 'unknown', label: 'unknown' },
    {value: 'n/a', label: 'n/a'}
  ]

  const handleProps = (selectedOption) =>{
    setSelectedOption(selectedOption)
    setSortedArray([])
    var newArray = characters.filter(val => val.data.gender === selectedOption.value)
    handleFilterOption(newArray)
  }
  return (
    <div className="text-black font-semibold w-[20%] relative left-[80%] md:w-[70%] md:left-[30%]">
        <Select
            styles={customStyles}
            placeholder="Filter by gender"
            defaultValue={selectedOption}
            onChange={handleProps}
            options={options}
        />
    </div>
  )
}

export default FilterGender