export const INCREMENT = 9;

const defaultPages = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

export const checkAndUpdatePagesList = (pages: number[], currentPage: number) => {
  if (!pages.length) {
    return defaultPages;
  }

  if (pages.includes(currentPage)) {
    return pages;
  }

  let newArray = [ ...pages ];
  const checkIfIncrement = newArray[newArray.length - 1] < currentPage;

  console.log('checkIfIncrement', checkIfIncrement)

  if (checkIfIncrement) {
    while (!newArray.includes(currentPage)) {
      newArray = newArray.map(num => num + INCREMENT);
    }
  } else {
    while (!newArray.includes(currentPage)) {
      newArray = newArray.map(num => num - INCREMENT);
    }
  }

  return newArray;
}