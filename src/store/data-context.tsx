import React from "react";
import { getUserData, updateData } from "../util/data-functions";
import { getUserId } from "../util/login-functions";
import { useState } from "react";

type Date = { seconds: number; nanoseconds: number };

type ItemObj = {
  date: Date;
  upper: number;
  lower: number;
  pulse: number;
};

type ItemObj2 = {
  date: string;
  upper: number;
  lower: number;
  pulse: number;
}

type DataContextObj = {
  items: ItemObj[];
  removeItem: (date: string, email: string) => void;
  loadItems: (email: string) => void;
  shownItems: ItemObj2[];
  updateShownItems: (data: ItemObj2[]) => void
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
  shownItems: [
    {
      date: '',
      upper: 0,
      lower: 0,
      pulse: 0,
    },
  ],
  updateShownItems: () => {}
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

  const removeItemHandler = async (date: string, email: string) => {
    console.log("removing item");
    let filteredItems = items.filter(
      (x) => x.date.toString() !== date.toString()
    );
    // let transformed = filteredItems.map((x) => ({
    //   data: new Date(Number(x.date.toString().slice(18, 28)) * 1000),
    //   upper: x.upper,
    //   lower: x.lower,
    //   pulse: x.pulse,
    // }));

    await updateData(email, filteredItems);
  };

  const loadItemsHandler = async (email: string) => {
    let id = await getUserId(email);
    let data = await getUserData(id!);
    setItems(data);
    
  };

  // let sortedItems = items.sort((a,b) => {
  //   return a.date.seconds - b.date.seconds
  // })
  // console.log(sortedItems)

  const [shownItems, setShownItems] = useState([
    {
      date: '',
      upper: 1,
      lower: 1,
      pulse: 1,
    },
  ])

  const updateShownItems = (data: ItemObj2[]) => {
    setShownItems(data)
    //console.log(data[0].date.toString().slice(18,28))

  }

  const contextValue: DataContextObj = {
    items,
    removeItem: removeItemHandler,
    loadItems: loadItemsHandler,
    shownItems,
    updateShownItems,
  };

  
  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};
