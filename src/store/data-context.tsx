import React from "react";
import { getUserData, updateData } from "./data-functions";
import { getUserId } from "./login-functions";
import { useState } from "react";

type Date = { seconds: number; nanoseconds: number };

type ItemObj = {
  date: Date;
  upper: number;
  lower: number;
  pulse: number;
};

type DataContextObj = {
  items: ItemObj[];
  removeItem: (date: string) => void;
  loadItems: () => void;
};

export const DataContext = React.createContext<DataContextObj>({
  items: [
    {
      date: { seconds: 0, nanoseconds: 0 },
      upper: 0,
      lower: 0,
      pulse: 0,
    },
  ],
  removeItem: () => {},
  loadItems: () => {},
});

export const DataContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  let [items, setItems] = useState([
    {
      date: { seconds: 0, nanoseconds: 0 },
      upper: 1,
      lower: 1,
      pulse: 1,
    },
  ]);

  const removeItemHandler = async (date: string) => {
    let filteredItems = items.filter(
      (x) => x.date.toString() !== date.toString()
    );

    console.log(filteredItems);
    console.log(items);
    let transformed = filteredItems.map((x) => ({
      data: new Date(Number(x.date.toString().slice(18, 28)) * 1000),
      upper: x.upper,
      lower: x.lower,
      pulse: x.pulse,
    }));

    await updateData("gzl123n@gmail.com", filteredItems);
  };

  const loadItemsHandler = async () => {
    let id = await getUserId("gzl123n@gmail.com");
    let data = await getUserData(id!);
    setItems(data);
  };

  const contextValue: DataContextObj = {
    items: items,
    removeItem: removeItemHandler,
    loadItems: loadItemsHandler,
  };

  //console.log(items)
  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};
