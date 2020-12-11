import React from 'react';

const Boards = ({match}) => {

    return (
        <div className="col s12 l11  grey lighten-4 board">
            <h1>Profile {match.params.projectId}</h1>
        </div>
    );
}

export default Boards;
