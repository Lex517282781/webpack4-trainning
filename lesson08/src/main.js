const arr = [1, 2, 3];

const promise = new Promise(() => {
  console.log(arr.map(item => item * 2));
});
