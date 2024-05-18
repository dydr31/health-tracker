import React, { useContext, useState } from "react"

type dataObj = {upper: number, lower: number, pulse: number}[]


type ContextObj = {
    day: number,
    month: number,
    year: number,
    data: dataObj,
    setAllData: (day: number, month: number, year: number, data: dataObj) => void,
}

export const DayDataContext = React.createContext<ContextObj>({
    day: 0,
    month: 0,
    year: 0,
    data: [{upper: 0, lower: 0, pulse: 0}],
    setAllData: () => {},
})

export const DayDataContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [day, setDay] = useState(0)
    const [month, setMonth] = useState(0)
    const [year, setYear] = useState(0)
    const [data, setData] = useState([{upper: 0, lower: 0, pulse: 0}])

    const setAllData = (day: number, month: number, year: number, data: dataObj) => {
        setDay(day)
        setMonth(month)
        setYear(year)
        setData(data)
    }


    const contextValue = {
        day,
        month,
        year,
        data,
        setAllData,
        

    }
    return <DayDataContext.Provider value={contextValue}>{children}</DayDataContext.Provider>
}