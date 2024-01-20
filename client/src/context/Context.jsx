// import { useState } from "react";
import { Mycontext } from "./MyContext";

export default function Context({children}) {

    const contextValue = {
    }
    
    return (
        <Mycontext.Provider value={contextValue}>{children}</Mycontext.Provider>
      );
}