export const INCREMENT = 9;

export const checkAndUpdatePagesList = (pages: number[], currentPage: number, decrement?: boolean) => {
  let newArray = [...pages];
  if (decrement) {
    while (!newArray.includes(currentPage)) {
      newArray = newArray.map(num => num - INCREMENT);
    }
  } else {
    while (!newArray.includes(currentPage)) {
      newArray = newArray.map(num => num + INCREMENT);
    }
  }

  console.log('newArray', newArray)
  // return newArray;
}