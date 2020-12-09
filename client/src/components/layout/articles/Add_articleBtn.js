import React from 'react';
import { Link } from "react-router-dom";

const Add_articleBtn = () => {
    return (
      
            <Link to="/addarticle" className="blue-grey-text  text-darken-4 add-post-box">
                <button className="btn btn-floating  waves-effect waves-light blue-grey darken-3">
                   <i className="material-icons">add</i>
                   </button>
                   <span>Add post</span>
            </Link>
       
    );
}

export default Add_articleBtn;
