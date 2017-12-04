import React from 'react';
import FontAwesome from 'react-fontawesome';

function Spinner() {
    return (
        <FontAwesome
            className='super-crazy-colors'
            name='spinner'
            size='2x'
            spin
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#4F62E3' }}
        /> 
    );
}

export default Spinner;