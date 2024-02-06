const people = {
  age: 14
}

const taylor = {
  ...people,
  name: "taylor"
}

const arr = [1,2,3,4,5]
let a = arr
let b = [...arr]
console.log(a)
a[2] =- 1
console.log(a)
console.log(arr)
console.log(b)
console.log(taylor)
