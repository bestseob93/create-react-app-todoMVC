import React from 'react';
import FontAwesome from 'react-fontawesome';
import './Icons.css';

function Icons({toggleSearch, toggleWrite, searchVisible, writeVisible}) {
    return (
        <div className="icon-wrapper">
            <FontAwesome
                onClick={toggleSearch}
                name={searchVisible ? "times" : "search"}
            />
            <FontAwesome
                onClick={toggleWrite}
                name={writeVisible ? "minus" : "pencil"}
            />
        </div>
    );
}

export default Icons;