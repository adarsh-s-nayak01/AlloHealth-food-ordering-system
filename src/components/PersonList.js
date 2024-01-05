import React from 'react';

const PersonList = ({ people, onSelect }) => {
  return (
    <div className="person-list">
      <h2>Select Person:</h2>
      <div className="person-buttons">
        {people.map((person) => (
          <button key={person.id} onClick={() => onSelect(person.id)}>
            {person.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PersonList;
