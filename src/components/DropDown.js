import React, { useState } from 'react';
import Select from 'react-select';


export default function DropDown({movieTitle,handleSelectedOption}) {
  const [selectedOption, setSelectedOption] = useState(null);

  //   styles for the select input
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#FDE309",
      // match with the menu
      borderColor: state.isFocused ? "black" : "black",
    }),
  };
  const handleProps = (selectedOption) =>{
    setSelectedOption(selectedOption)
    handleSelectedOption(selectedOption)
    console.log(selectedOption)
  }
  return (
    <div className="text-black font-semibold w-[20%] m-auto">
      <Select
        styles={customStyles}
        placeholder="Choose a starwars movie"
        defaultValue={selectedOption}
        onChange={handleProps}
        options={movieTitle}
      />
    </div>
  );
}

