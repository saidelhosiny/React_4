import React, { useState } from 'react'

export default function App() {

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  let ops =  ['/', '*' , '+' , '-' , '.']

  let upDateCalc =  value => { 


    if(ops.includes(value) && calc === '' ||
     ops.includes(value) && ops.includes(calc.slice(-1))
      ){
        return ;
      }
    setCalc( calc + value)

    if(!ops.includes(value)){

      setResult(eval(calc + value).toString())
    }



  }


  let createDigits = ()=>{

    let digits = []

    for (let i = 1; i <10 ; i++) {

      digits.push(
        <button onClick={()=> upDateCalc(i.toString())} key={i}>{i}</button>
      )
    
      
    }

    return digits
  }

  let calculater = () => {
   
    setCalc(eval(calc).toString())

  }
  let  deleteLast = () => {

    if(calc == ""){
      return
    }
    let value = calc.slice(0 , -1)

    setCalc(value)

  }
  return (
    <>

 <div className="App">
  
 <div className="calculater">
      <div className="display">
       {result? <span>({result})</span>:""} {calc || "0"}
      </div>
      <div className="operators">
        <button onClick={()=> upDateCalc('/')}>/</button>
        <button onClick={()=> upDateCalc('*')}>*</button>
        <button onClick={()=> upDateCalc('+')}>+</button>
         <button onClick={()=> upDateCalc('-')}>-</button>
      <button onClick={deleteLast}>DEL</button>
      </div>
      <div className="digits">
        {createDigits()}
        <button onClick={()=> upDateCalc('0')}>0</button>
        <button onClick={()=> upDateCalc('.')}>.</button>
        <button onClick={calculater}>=</button>
      </div>
    </div>
    
 </div>
    
    
    
    
    </>
  )
}
