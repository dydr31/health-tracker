export type Date2 = { seconds: number; nanoseconds: number };

export type ItemObj = {
  date: Date2;
  upper: number;
  lower: number;
  pulse: number;
  modified: boolean;

};

export type ItemObj2 = {
  date: string;
  upper: number;
  lower: number;
  pulse: number;
};

export type List = {
  date: string;
  upper: number;
  lower: number;
  pulse: number;
}[];
