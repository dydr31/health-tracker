import React, { useState } from "react"

type shownItemsContextObj = {
    n: number;
    clicks: number;
    setClicks: (number: number) => void,
    maxClicks: number;
    setMaxClicks: (number: number) => void,
    showChart: boolean;
    setShowChart: (data: boolean) => void,

}

export const ShownItemsContext = React.createContext<shownItemsContextObj>({
    n: 0,
    clicks: 0,
    setClicks: () => {},
    maxClicks: 1000,
    setMaxClicks: () => {},
    showChart: false,
    setShowChart: () => {},
})

export const ShownItemsContextProvider: React.FC<{children: React.ReactNode }> = (props) => {

    const [clicks, setClicks] = useState(0)
    const [maxClicks, setMaxClicks] = useState(1000)
    const [showChart, setShowChart] = useState(false)




    const contextValue = {
        n: 14,
        clicks,
        setClicks,
        maxClicks,
        setMaxClicks,
        showChart,
        setShowChart,
    }
    return <ShownItemsContext.Provider value={contextValue}>{props.children}</ShownItemsContext.Provider>
}