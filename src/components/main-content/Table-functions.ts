import { ItemObj, List } from "../../types/types";

export const dummyList: List = [
  { date: "2020-01-01", upper: 0, lower: 0, pulse: 0 },
];

// export const filterForShowing = (
//   data: List,
//   clicks: number,
//   number: number
// ) => {
//   let len = data.length;
//   let a = len + number * clicks;
//   if (a <= 0) {
//     a = 0;
//   }
//   let b = len + number * (clicks + 1);
//   if (b > len) {
//     b = len;
//   } else if (b <= 0) {
//     b = len + number * (clicks + 2);
//   }
//   return data.slice(a, b);
// };

export const filterByDate = (data: List) => {
  data.sort((a, b) => {
    return (
      Number(a.date.toString().slice(18, 28)) -
      Number(b.date.toString().slice(18, 28))
    );
  });
};


export const filterForDayAndEvening = (data: ItemObj[]) => {
  let a: ItemObj[] = [];
  let b: ItemObj[] = [];
  data.forEach((x) =>
    (new Date (x.date.seconds * 1000)).getHours() >= 17 ? a.push(x) : b.push(x)
  );
  return { daily: b, evening: a };
};
