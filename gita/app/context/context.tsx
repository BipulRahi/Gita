"use client"
// import { AppContextType } from 'next/dist/shared/lib/utils';
import React, { ReactNode, createContext, useState } from 'react'
// import { Interface } from 'readline';

interface AppContextType{
    isplay:boolean,
    setisplay:React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext=createContext<AppContextType>({
    isplay:false,
    setisplay:()=>{},
})

export const IsPlayProvider = ({children}:{children:ReactNode}) => {
    const[isplay,setisplay]=useState(false);
  return <AppContext.Provider value={{setisplay,isplay}}>{children}</AppContext.Provider>
}
