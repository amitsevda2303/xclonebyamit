import { useState } from "react";
import { Mycontext } from "./MyContext";

export default function Context({children}) {

    const [signup, setSignup] = useState(false)

    const contextValue = {
        signup, 
        setSignup,
    }
    
    return (
        <Mycontext.Provider value={contextValue}>{children}</Mycontext.Provider>
      );
}