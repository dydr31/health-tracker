import { ChartContainer } from "./ChartContainer";
import { DataContext } from "../../../store/data-context";
import { useContext, useEffect, useState } from "react";

import classes from "./ChartParentContainer.module.scss";
import { DropdownWrapper } from "../../UI/DropdownWrapper";
import { FormsStateContext } from "../../../store/forms-context";

import { Message } from "./Message";
import { ShownItemsContext } from "../../../store/shown-items-context";

export const ChartParentContainer: React.FC = () => {
  const { morningItems, eveningItems } = useContext(DataContext);
  const { isMorning } = useContext(FormsStateContext);

  const { n, clicks, setMaxClicks } = useContext(ShownItemsContext);

  const [slicedItems, setSlicedItems] = useState(morningItems);

  useEffect(() => {
    if (isMorning) {
      setMaxClicks(Math.floor(morningItems.length / n));
    } else {
      setMaxClicks(Math.floor(eveningItems.length / n));
    }
  }, [isMorning, morningItems, eveningItems]);

  useEffect(() => {
    let items = morningItems;
    if (!isMorning) {
      items = eveningItems;
    }
    if (clicks > 0) {
      let range = [-(clicks + 1) * n, -clicks * n];
      setSlicedItems(items.slice(range[0], range[1]));
    }
    if (clicks < 0) {
    }
    if (clicks === 0) {
      setSlicedItems(items.slice(-n));
    }
  }, [morningItems, clicks, isMorning]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {!loading && <ChartContainer data={slicedItems} />}
      {loading && <Message>Loading ...</Message>}
    </>
  );
};
