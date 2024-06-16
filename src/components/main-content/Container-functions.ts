import { ItemObj } from "../../types/types";


//is used
// export const filterForDayAndEvening = (data: ItemObj[]) => {
//   let a: ItemObj[] = [];
//   let b: ItemObj[] = [];
//   data.forEach((x) =>
//     (new Date (x.date.seconds * 1000)).getHours() >= 17 ? a.push(x) : b.push(x)
//   );
//   return { daily: b, evening: a };
// };

export const sortByDate = (data: ItemObj[]) => {
  data.sort((a, b) => {
    return Number(a.date.seconds) - Number(b.date.seconds);
  });
};

