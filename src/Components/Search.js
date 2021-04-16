import Search from './SearchByRecipeName'
import SearchBar from './SearchByIngredients'
import React, { useEffect, useState } from 'react'
import ModeToggle from './ModeToggle'

export default function SearchManager(props){
    const [searchMode,setSearchMode] = useState('');
    useEffect(() =>{
        setSearchMode(props.currentMode);
    },[props.currentMode])

    return(
        <div>
        <ModeToggle setMode={props.setCurrentMode}></ModeToggle>
        {searchMode === 'Recipe' ? <Search></Search> : <SearchBar></SearchBar>}
        </div>
    );
}