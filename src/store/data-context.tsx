import React, { useContext } from "react";
import { getUserData, updateData } from "../util/data-functions";
import { getUserId } from "../util/login-functions";
import { useState } from "react";
import { ItemObj } from "../types/types";
import { ItemObj2 } from "../types/types";
import { filterForDayAndEvening } from "../components/main-content/Table-functions";

type DataContextObj = {
  items: ItemObj[];
  setItems: (items: ItemObj[]) => void;
  removeItem: (date: string, email: string) => void;
  loadItems: (email: string) => void;
  shownItems: ItemObj2[];
  updateShownItems: (data: ItemObj2[]) => void;
  morningItems: ItemObj2[];
  eveningItems: ItemObj2[];
  setMorningItems: (items: ItemObj2[]) => void;
  setEveningItems: (items: ItemObj2[]) => void;
  groupedItems: ItemObj2[];
  setGroupedItems: (data: ItemObj2[]) => void;


};

const DUMMY_DATA = [
  {
    date: { seconds: 0, nanoseconds: 0 },
    upper: 0,
    lower: 0,
    pulse: 0,
  },
]

const DUMMY_DATA_2 = [
  {
    date: '',
    upper: 0,
    lower: 0,
    pulse: 0,
  },
]

export const DataContext = React.createContext<DataContextObj>({
  items: DUMMY_DATA,
  setItems: () => {},
  removeItem: () => {},
  loadItems: () => {},
  shownItems: DUMMY_DATA_2,
  updateShownItems: () => {},
  morningItems: DUMMY_DATA_2,
  eveningItems: DUMMY_DATA_2,
  setMorningItems: () => {},
  setEveningItems: () => {},
  groupedItems: DUMMY_DATA_2,
  setGroupedItems: () => {},
});

export const DataContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  let [items, setItems] = useState(DUMMY_DATA)

  const removeItemHandler = async (date: string, email: string) => {
    
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

  const [shownItems, setShownItems] = useState(DUMMY_DATA_2)

  const updateShownItems = (data: ItemObj2[]) => {
    let filtered = filterForDayAndEvening(data);
    setShownItems(data)
    setEveningItems(filtered.evening)
    setMorningItems(filtered.daily)
  }



  const [morningItems, setMorningItems] = useState(DUMMY_DATA_2)
  const [eveningItems, setEveningItems] = useState(DUMMY_DATA_2)
  const [groupedItems, setGroupedItems] = useState(DUMMY_DATA_2)


  const contextValue: DataContextObj = {
    items,
    setItems,
    removeItem: removeItemHandler,
    loadItems: loadItemsHandler,
    shownItems,
    updateShownItems,
    morningItems,
    eveningItems,
    setMorningItems,
    setEveningItems,
    groupedItems,
    setGroupedItems,
  };

  
  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};
