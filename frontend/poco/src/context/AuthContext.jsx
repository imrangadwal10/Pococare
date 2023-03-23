import {createContext, useState} from "react"
import React from "react";
export const context= createContext()

function ContextProvider({children}){
    const [isAuth,setIsAuth]=useState({})
    const [value,setValue]=useState(false)
    
      return <context.Provider value={{isAuth,setIsAuth,value,setValue}}>
         {children}
         </context.Provider>
}

export default ContextProvider;