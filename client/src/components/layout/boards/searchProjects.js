import React,{useState , useEffect} from 'react';

const SearchProjects = ({SearchWord , goSearch, id, label}) => {


    return (
       

       
                <div className="input-field  search-bar-box" >
                    <i className="material-icons prefix">search</i>
                    <input type="text" name={"Search-bar"+id} id={"Search-bar"+id} 
                        value={SearchWord && SearchWord.id === id.toString() && SearchWord.value?
                            SearchWord.value:''} onChange={goSearch} />
                    
                    <label htmlFor={"Search-bar"+id} className="blue-grey-text   text-darken-4">Search {label}</label>
                </div>
  
    );
}

export default SearchProjects;
