export const sortData = (data) => {
  const sortedData = [...data];

  // this is correct
//   sortedData.sort((a, b) => {
//     if (a.cases > b.cases) {
//       return -1;
//     } else {
//       return 1;
//     }
//   });
//   return sortedData;

//this is also correct for sorting
return sortedData.sort((a, b) => (a.cases > b.cases) ? -1 : 1);
};
