import React, { useContext } from 'react'
import { Mycontext } from '../../../context/MyContext'

const Step3 = () => {
    const {setStep} = useContext(Mycontext)
  return (
    <div>
        <button onClick={()=>setStep(2)}>back</button>
      this is step 3
    </div>
  )
}

export default Step3
