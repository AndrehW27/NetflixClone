import React from 'react';

import './Header.css';

export default({black})=>{
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a hre="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix"></img>
                </a>
            </div>
            <div className="header--user">
                <a hre="/">
                    <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="Usuário"></img>
                </a>
            </div>
        </header>
    );
}