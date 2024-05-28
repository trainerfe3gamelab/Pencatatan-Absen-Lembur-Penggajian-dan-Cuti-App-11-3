import React from 'react';
import './card.css';

const Card = ({ imgSrc, countName, countNumber }) => {
    return (
        <div className="col-md-3">
            <div className="card-counter d-flex align-items-center p-5 rounded-4">
                <img src={imgSrc} width="90px" height="90px" alt="" className="mr-3" />
                <div className="card-title ms-5">
                    <span className="count-name fs-5">
                        <h3>Data<br /><b>{countName}</b></h3>
                    </span>
                    <span className="count-numbers text-center">
                        <h1><b>{countNumber}</b></h1>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Card;
