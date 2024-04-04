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
  setItems: (items: ItemObj[]) => void;
  removeItem: (date: string, email: string) => void;
  loadItems: (email: string) => void;
  shownItems: ItemObj2[];
  updateShownItems: (data: ItemObj2[]) => void;
  filteredItems: ItemObj2[];
  updateFilteredItems: (data: ItemObj2[]) => void;
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
  setItems: () => {},
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
  
  updateShownItems: () => {},
  filteredItems: [
    {
      date: '',
      upper: 0,
      lower: 0,
      pulse: 0,
    },
  ],
  updateFilteredItems: () => {},
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
    await updateData(email, filteredItems);
  };

  const loadItemsHandler = async (email: string) => {
    let id = await getUserId(email);
    let data = await getUserData(id!);
    setItems(data);
    
  };

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
  }

  const [filteredItems, setFilteredItems] = useState([
    {
      date: '',
      upper: 1,
      lower: 1,
      pulse: 1,
    },
  ])

  const updateFilteredItems = (data: ItemObj2[]) => {
    setFilteredItems(data)
  }

  const contextValue: DataContextObj = {
    items,
    setItems,
    removeItem: removeItemHandler,
    loadItems: loadItemsHandler,
    shownItems,
    updateShownItems,
    filteredItems,
    updateFilteredItems,
  };

  
  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};
