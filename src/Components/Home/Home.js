import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

function Home() {
    const [nameInput, setNameInput] = useState('');
    const [pinInput, setPinInput] = useState('');

    const nameInputRef = useRef();

    const handleNameChange = e => setNameInput(e.target.value);
    const handlePinChange = e => setPinInput(e.target.value);

    useEffect(() => {
        nameInputRef.current.focus();
    }, [])

    return (
        <div id="home">
            <h1>Join a Game</h1>
            <div className="game-input-info">
                <p>Display Name</p>
                <input 
                    value={nameInput}
                    onChange={handleNameChange}
                    ref={nameInputRef}/>
                <p>Game Pin</p>
                <input 
                    value={pinInput}
                    onChange={handlePinChange}/>
                <button>Join</button>
            </div>
        </div>
    )
}

export default Home;