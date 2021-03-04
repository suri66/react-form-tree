import React from 'react';
import './App.css';

const NestedForm = ({ arr, handleInputChange, handleAddLevel }) => {
  return (
    <ul>
      {arr.map((item) => {
        return (
          <li key={item.id}>
            <input
              value={item.text}
              onChange={(e) => handleInputChange(item.id, e)}
              onKeyDown={(e) => handleAddLevel(item, e)}
            />
            {item.children ? (
              <NestedForm
                arr={item.children}
                handleInputChange={handleInputChange}
                handleAddLevel={handleAddLevel}
              />
            ) : (
              ''
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NestedForm;
