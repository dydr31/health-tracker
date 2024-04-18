import { ItemObj } from "../../types/types";

export const restructuredItems = (data: ItemObj[]) => {
  // console.log(data)
  let newArray = data.map((x) => {
    return {
      ...x,
      dateNewFormat: new Date(Number(x.date.seconds) * 1000),
    };
  });

  let restructuredArray: ItemObj[] = [];
  for (let i = 0; i < data.length - 1; i++) {
    let date1 = newArray[i + 1].dateNewFormat;
    let date2 = newArray[i].dateNewFormat;
    if (date1.getDay() === date2.getDay()) {
      let isFirstDateAMorningDate = date1.getHours() < 17;
      let isSecondDateAMorningDate = date2.getHours() < 17;
      if (isFirstDateAMorningDate === isSecondDateAMorningDate) {
        restructuredArray.push({
          date: newArray[i].date,
          upper: (newArray[i].upper + newArray[i + 1].upper) / 2,
          lower: (newArray[i].lower + newArray[i + 1].lower) / 2,
          pulse: (newArray[i].pulse + newArray[i + 1].pulse) / 2,
          modified: true,
        });
        // console.log('a')
        i++;
      } else{
        restructuredArray.push({
            date: newArray[i].date,
            upper: newArray[i].upper,
            lower: newArray[i].lower,
            pulse: newArray[i].pulse,
            modified: false,
        })
        // console.log('b')

      }
    } else {
        restructuredArray.push({
            date: newArray[i].date,
            upper: newArray[i].upper,
            lower: newArray[i].lower,
            pulse: newArray[i].pulse,
            modified: false,
        });
        // restructuredArray.push({
        //     date: newArray[i+1].date,
        //     upper: newArray[i+1].upper,
        //     lower: newArray[i+1].lower,
        //     pulse: newArray[i+1].pulse,
        //     modified: false,
        // })  
        
        
        // console.log('c')
    }
  }
//   console.log(restructuredArray.slice(-2, 0))
//   if(restructuredArray[-1].modified === false){
//     restructuredArray.push({
//         date: newArray[-1].date,
//         upper: newArray[-1].upper,
//         lower: newArray[-1].lower,
//         pulse: newArray[-1].pulse,
//         modified: false,
//     })
//   }
  return restructuredArray
};

export const restructureArray = (data: ItemObj[]) => {
    // let a = data.map(x => (

    // ))

}


export const sortByDate = (data: ItemObj[]) => {
  data.sort((a, b) => {
    return Number(a.date.seconds) - Number(b.date.seconds);
  });
};
