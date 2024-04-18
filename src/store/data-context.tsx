import React from "react";
import { getUserData, updateData } from "../util/data-functions";
import { getUserId } from "../util/login-functions";
import { useState } from "react";
import { Date2, ItemObj } from "../types/types";

import { filterForDayAndEvening } from "../components/main-content/Table-functions";

type DataContextObj = {
  items: ItemObj[];

  setItems: (items: ItemObj[]) => void;
  removeItem: (date: Date2, email: string) => void;
  loadItems: (email: string) => void;

  shownItems: ItemObj[];
  updateShownItems: (data: ItemObj[]) => void;

  morningItems: ItemObj[];
  eveningItems: ItemObj[];
};

const DUMMY_DATA = [
  {
    date: { seconds: 0, nanoseconds: 0 },
    upper: 0,
    lower: 0,
    pulse: 0,
    modified: false,
  },
];

export const DataContext = React.createContext<DataContextObj>({
  items: DUMMY_DATA,
  setItems: () => {},
  removeItem: () => {},
  loadItems: () => {},
  shownItems: DUMMY_DATA,
  updateShownItems: () => {},
  morningItems: DUMMY_DATA,
  eveningItems: DUMMY_DATA,
});

export const DataContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  let [items, setItems] = useState(DUMMY_DATA);

  const removeItemHandler = async (date: Date2, email: string) => {
    let filteredItems = items.filter(
      (x) => x.date.toString() !== date.toString()
    );
    console.log(filteredItems);
    await updateData(email, filteredItems);
  };

  const loadItemsHandler = async (email: string) => {
    let id = await getUserId(email);
    let data = await getUserData(id!);
    setItems(data);
    return data;
  };

  const [shownItems, setShownItems] = useState(DUMMY_DATA);

  const updateShownItems = (data: ItemObj[]) => {
    let filtered = filterForDayAndEvening(data);
    setShownItems(data);
    setEveningItems(filtered.evening);
    setMorningItems(filtered.daily);
  };

  const [morningItems, setMorningItems] = useState(DUMMY_DATA);
  const [eveningItems, setEveningItems] = useState(DUMMY_DATA);

  const contextValue: DataContextObj = {
    items,
    setItems,
    removeItem: removeItemHandler,
    loadItems: loadItemsHandler,
    shownItems,
    updateShownItems,
    morningItems,
    eveningItems,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};
