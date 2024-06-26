import React from 'react';
import './card.css';

const Card = ({ imgSrc, countName, countNumber }) => {
    return (
        <div className="col-md-3 mb-5">
            <div className="card-counter d-flex align-items-center p-5 rounded-4">
                <img src={imgSrc} alt="" className="img_card" />
                <div className="card-title">
                    <span className="count-name fs-5 ">
                        <h3 className='font_size'>Data<br /><b>{countName}</b></h3>
                    </span>
                    <span className="count-numbers ">
                        <h1 className='font_size'><b>{countNumber}</b></h1>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Card;
