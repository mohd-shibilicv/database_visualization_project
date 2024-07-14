import React from 'react';

export const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-black p-2 border border-gray-300 dark:border-gray-800 rounded shadow">
        <p className="font-bold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className='capitalize'>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value ? entry.value : "N/A"}
            {entry.payload.topic && <span> - {entry.payload.topic}</span>}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const CustomYearTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-black p-2 border border-gray-300 dark:border-gray-800 rounded shadow">
        <p className="font-bold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className='capitalize'>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};