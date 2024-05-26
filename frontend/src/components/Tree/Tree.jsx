import React, { useState } from 'react';
import Dog from './DogModel';

const Tree = ({ dog }) => {
  const [currentDog, setCurrentDog] = useState(dog);

  const addParent = (parentType, name) => {
    const newParent = new Dog(name);
    const updatedDog = { ...currentDog };
    updatedDog.parents[parentType] = newParent;
    setCurrentDog(updatedDog);
  };

  const renderDog = (dog, depth = 0) => {
    if (!dog) return null;
    
    return (
      <div style={{ marginLeft: `${depth * 20}px` }}>
        <div onClick={() => addParent('father', prompt('Father\'s name'))}>
          Father: {dog.parents.father ? dog.parents.father.name : "Add Father"}
        </div>
        <div onClick={() => addParent('mother', prompt('Mother\'s name'))}>
          Mother: {dog.parents.mother ? dog.parents.mother.name : "Add Mother"}
        </div>
        <div>
          Name: {dog.name}
        </div>
        {renderDog(dog.parents.father, depth + 1)}
        {renderDog(dog.parents.mother, depth + 1)}
      </div>
    );
  };

  return (
    <div>
      {renderDog(currentDog)}
    </div>
  );
};

export default Tree;