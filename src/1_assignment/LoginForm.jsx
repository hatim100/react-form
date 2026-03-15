import React, { useReducer } from 'react'

const LoginForm = () => {

    const initialState = {
        form: {
            email: "",
            password: ""
        },
        error: null,
        loading: false
    }

    const ACTION_TYPES = {
        UPDATE_FIELD: "UPDATE_FIELD",
        LOGIN_START: "LOGIN_START",
        LOGIN_SUCCESS: "LOGIN_SUCCESS",
        LOGIN_ERROR: "LOGIN_ERROR"
      };

      function reducerFn(state, action){
        switch(action.type){
            case ACTION_TYPES.UPDATE_FIELD:
                return {
                    ...state,
                    error: null,
                    form: {
                        ...state.form,
                        [action.field] : action.value
                    }};
            case ACTION_TYPES.LOGIN_START:
                return {
                    ...state,
                    error: null,
                    loading: true
                };
            case ACTION_TYPES.LOGIN_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    error: null
                };
            case ACTION_TYPES.LOGIN_ERROR:
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                };
            default:
                return state; 

        }
      }

      const [state, dispatch] = useReducer(reducerFn, initialState);

      function handleChange(e){
        const {name , value} = e.target;
        dispatch({
            type: ACTION_TYPES.UPDATE_FIELD,
            field: name,
            value: value
        })
      }

      async function handleSubmit(e){
       e.preventDefault();
       dispatch({ type: ACTION_TYPES.LOGIN_START })
       try{
       //simulate API
       await new Promise(resolve => setTimeout(resolve, 3000));
       if(state.form.email !== "satyajitraj85@gmail.com" || state.form.password !== "Satyajit@01"){
        throw new Error("Invalid credentials");
       }
       dispatch({ type: ACTION_TYPES.LOGIN_SUCCESS});
       alert("Login successful");
    } catch(err){
     dispatch({
        type: ACTION_TYPES.LOGIN_ERROR,
        payload: err.message
     })}
    }

  return (
    <form onSubmit={handleSubmit}>
        <input 
        type="email"
        name='email'
        value={state.form.email}
        onChange={handleChange}
        placeholder='Enter Email'
        disabled={state.loading} />
        <input 
        type="password"
        name='password'
        value={state.form.password}
        onChange={handleChange}
        placeholder='Enter Password'
        disabled={state.loading} />
        {state.error && <p style={{color: "red"}}>{state.error}</p>}
        <button disabled={state.loading}>
            {state.loading ? "Logging in..." : "Login"}
        </button>
    </form>
  )
}

export default LoginForm
