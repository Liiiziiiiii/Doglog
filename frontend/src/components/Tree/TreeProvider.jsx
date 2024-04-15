import React, { useContext, useState } from 'react';

const TreeContext = React.createContext(null);

export const useTree = () => useContext(TreeContext);

const TreeProvider = ({ children }) => {
  const [dogs, setDogs] = useState({
    'dogRoot': { id: 'dogRoot', name: 'Rex', parents: [], children: [] }
  });

  const addDog = (id, newDog, isChild) => {
    setDogs(prevDogs => {
      const newDogs = { ...prevDogs };
      newDogs[newDog.id] = newDog;
      if (isChild) {
        newDogs[id].children.push(newDog.id);
        newDog.parents.push(id);
      } else {
        newDogs[id].parents.push(newDog.id);
        newDog.children.push(id);
      }
      return newDogs;
    });
  };

  const removeDog = (id) => {
    setDogs(prevDogs => {
      const {[id]: _, ...newDogs} = prevDogs;
      Object.values(newDogs).forEach(dog => {
        dog.children = dog.children.filter(childId => childId !== id);
        dog.parents = dog.parents.filter(parentId => parentId !== id);
      });
      return newDogs;
    });
  };

  return (
    <TreeContext.Provider value={{ dogs, addDog, removeDog }}>
      {children}
    </TreeContext.Provider>
  );
};

export default TreeProvider;