array = [1, 2, 3, 3, 3];
// console.log(array);
// for (let index = 0; index <= array.length; index++) {
//   for (let i = 0; i <= array.length; i++) {
//     if (array[i] === array[index]) {
//       console.log(array);
//     }
//   }
// }
// for (const index of array) {
//   for (const innerIndex of array) {
//     if (innerIndex === index) {
//       array.splice(innerIndex, 1);
//     }
//   }
// }
// console.log(array);
console.log(array);

for (let i = 0; i < array.length; i++) {
  let elementoAtual = array[i];
  for (let j = i + 1; j < array.length; j++) {
    if (elementoAtual === array[j]) {
      array.splice(j, 1);
      j--;
    }
  }
}
console.log(array);
