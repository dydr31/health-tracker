import { Date2, ItemObj, List } from "../../types/types";

export const dummyList: List = [
  { date: "2020-01-01", upper: 0, lower: 0, pulse: 0 },
];

export const filterForShowing = (
  data: List,
  clicks: number,
  number: number
) => {
  let len = data.length;
  let a = len + number * clicks;
  if (a <= 0) {
    a = 0;
  }
  let b = len + number * (clicks + 1);
  if (b > len) {
    b = len;
  } else if (b <= 0) {
    b = len + number * (clicks + 2);
  }
  return data.slice(a, b);
};

export const filterByDate = (data: List) => {
  data.sort((a, b) => {
    return (
      Number(a.date.toString().slice(18, 28)) -
      Number(b.date.toString().slice(18, 28))
    );
  });
};

const getHoursFromString = (date: string) => {
  return new Date(Number(date.toString().slice(18, 28)) * 1000).getHours();
};

export const filterForDayAndEvening = (data: ItemObj[]) => {
  let a: ItemObj[] = [];
  let b: ItemObj[] = [];
  data.forEach((x) =>
    (new Date (x.date.seconds * 1000)).getHours() >= 17 ? a.push(x) : b.push(x)
  );
  return { daily: b, evening: a };
};

export type ModifiedList = {
  date: string;
  upper: number;
  lower: number;
  pulse: number;
  grouped: boolean;
}[];

export const groupTheSame = (data: List) => {
  let a = data.map((x) => {
    return {
      ...x,
      dateNewFormat: new Date(Number(x.date.toString().slice(18, 28)) * 1000),
    };
  });
  // console.log(a)

  let b: ModifiedList = [];
  for (let i = 0; i < a.length - 1; i++) {
    let date1 = a[i + 1].dateNewFormat;
    let date2 = a[i].dateNewFormat;
    if (date1.getDay() === date2.getDay()) {
      let isFirstDateAMorningDate = date1.getHours() < 17;
      let isSecondDateAMorningDate = date2.getHours() < 17;
      if (isFirstDateAMorningDate === isSecondDateAMorningDate) {
        b.push({
          date: a[i].date,
          upper: (a[i].upper + a[i + 1].upper) / 2,
          lower: (a[i].lower + a[i + 1].lower) / 2,
          pulse: (a[i].pulse + a[i + 1].pulse) / 2,
          grouped: true,
        });
        i++;
      } else {
        b.push({
          date: a[i].date,
          upper: a[i].upper,
          lower: a[i].lower,
          pulse: a[i].pulse,
          grouped: false,
        });
      }
    } else {
      b.push({
        date: a[i].date,
        upper: a[i].upper,
        lower: a[i].lower,
        pulse: a[i].pulse,
        grouped: false,
      });
    }
  }
  return b;
};
