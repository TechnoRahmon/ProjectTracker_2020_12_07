import React from 'react';

const SearchProjects = ({SearchWord , goSearch}) => {
    return (
        <div className="container">

            <div className="row">
                <div className="input-field col s12 m11 l4 offset-l4 search-bar-box" >
                    <i className="material-icons prefix">search</i>
                    <input type="text" name="Search-bar" id="Search-bar" 
                        value={SearchWord} onChange={goSearch}/>
                    
                    <label htmlFor="Search-bar" className="blue-grey-text   text-darken-4">Search Project Name</label>
                </div>
            </div>
            
        </div>
    );
}

export default SearchProjects;
