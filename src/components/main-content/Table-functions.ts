import { List } from "../../types/types";

export const dummyList: List = [{ date: "2020-01-01", upper: 0, lower: 0, pulse: 0 }];

export const filterForShowing = (data: List, clicks: number, number: number) => {
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

export const filterForDayAndEvening = (data: List) => {
  let a: List = []
  let b: List = []
  data.forEach(x => (getHoursFromString(x.date) >= 16 && getHoursFromString(x.date) > 6) ? a.push(x) : b.push(x))
  return { daily: b, evening: a };
};