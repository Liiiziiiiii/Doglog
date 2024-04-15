import React from 'react';
import { useTree } from './TreeProvider';

const DogNode = ({ id }) => {
  const { dogs, addDog, removeDog } = useTree();
  const dog = dogs[id];

  const handleAddChild = () => {
    const newDog = { id: Date.now().toString(), name: 'New Puppy', parents: [], children: [] };
    addDog(dog.id, newDog, true);
  };

  const handleAddParent = () => {
    const newDog = { id: Date.now().toString(), name: 'New Parent', parents: [], children: [] };
    addDog(dog.id, newDog, false);
  };

  return (
    <div>
      {dog.name}
      <button onClick={handleAddChild}>Add Child</button>
      <button onClick={handleAddParent}>Add Parent</button>
      <button onClick={() => removeDog(dog.id)}>Remove</button>
      <div style={{ marginLeft: 20 }}>
        <strong>Parents:</strong>
        {dog.parents.map(parentId => (
          <DogNode key={parentId} id={parentId} />
        ))}
        <strong>Children:</strong>
        {dog.children.map(childId => (
          <DogNode key={childId} id={childId} />
        ))}
      </div>
    </div>
  );
};