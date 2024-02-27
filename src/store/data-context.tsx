import React from "react"

type DataContextObject = {
    date: Date,
    upper: number,
    lower: number,
    bp: number
}[]

export const DataContext = React.createContext<DataContextObject>([{
    date: new Date('2020-01-01'),
    upper: 0,
    lower: 0,
    bp: 0
}])


// const DataContextProvider: React.FC<{children: React.ReactNode}> = (props) => {




//     const contextValue = 
//     return <DataContext.Provider value={contextValue}>{props.children}</DataContext.Provider>
// }