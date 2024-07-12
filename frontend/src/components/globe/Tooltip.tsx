import React from 'react';

const Tooltip: React.FC = () => (
    <div
        id="globe-tooltip"
        style={{
            position: 'absolute',
            display: 'none',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            pointerEvents: 'none'
        }}
        className='dark:text-black'
    />
);

export default Tooltip;