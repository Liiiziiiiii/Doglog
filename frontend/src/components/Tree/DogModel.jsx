class Dog {
    constructor(name, parents = { father: null, mother: null }) {
      this.name = name;
      this.parents = parents;
    }
  }

export default Dog;