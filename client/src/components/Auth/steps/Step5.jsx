import React, { useContext } from 'react'
import { Mycontext } from '../../../context/MyContext'

const Step5 = () => {
    const {setStep} = useContext(Mycontext)
    
  return (
    <div>
        <button onClick={()=>setStep(4)}> back</button>
      this is step 5
    </div>
  )
}

export default Step5

