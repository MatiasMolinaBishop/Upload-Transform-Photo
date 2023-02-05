import { useReducer } from "react";

//Create a variable that contain all different actions
//All capitals since its a global non changing variable

const ACTIONS = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement'
}

const  UseReducer = () => {

    //Use reducer takes in  parameters. 
    //reducer which is a function which we perform on our state to get a new state
    //Initial value / state. In this case an object. Generally we use objects instead of values as usually states are more complex
    //[] These array takes 2 portions
    //The state => the object {count:0}
    //dispatch is a fnction which we call in order to update our state. It calls the redicer function we specify
    //The reducer function takes 2 patrameters. The current state and an action
    //the action is what we pass into the dispatch function
    //Whenver we call distapch gets sent to the action varaible amnd the reducer retuns the mew updated state

    const reducer = (state, action) => {
        switch(action.type){
            case ACTIONS.INCREMENT:
                return  {count: state.count+1}
            case ACTIONS.DECREMENT:
                return {count: state.count-1}
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, {count:0})

    function increment(){
        //dispatch calls de reducer function
        dispatch({type:ACTIONS.INCREMENT})
    }
    function decrement(){
     
        dispatch({type:ACTIONS.DECREMENT})
    }

    return(
        <div>
            <button onClick={decrement}>-</button>
            <span>{state.count}</span>
            <button onClick={increment}>+</button>
        </div>
    )
}

export default UseReducer