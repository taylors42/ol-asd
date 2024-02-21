function toReturn() {
  obj = {
    id: "idade",
    name: "taylor",
  };
  return obj;
}
const { id, name } = toReturn();

// const [id, name] = toReturn();
console.log(id, name);
