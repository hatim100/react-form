import React, { useReducer, useState } from 'react'

const LearnUserReducer = () => {
    // const [count,setCount] = useState(0);
    
    const [state, dispatch] = useReducer(myReducer, {count: 0});

    function myReducer(prevState, action){
        switch(action.type){
            case "INCREMENT":
                return {
                    count: prevState.count + 1,
                };
            case "DECREMENT":
                return {
                   count: prevState.count - 1,
                };
            case "MUL2":
                return {
                   count: prevState.count*2,
                };
            default:
                break;
        }
    }

    function handleAdd(){
        // setCount(prev => prev+1);
        dispatch({type: "INCREMENT"})
    }
    function handleSub(){
        // setCount(prev => prev -1);
        dispatch({type: "DECREMENT"})
    }
    function handleMul2(){
        dispatch({type: "MUL2"})
    }
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={handleSub}>Sub</button>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleMul2}>Mul2</button>
    </div>
  )
}

export default LearnUserReducer
