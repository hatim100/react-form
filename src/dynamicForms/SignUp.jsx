import React, { useState } from 'react'
import CustomForm from './CustomForm'
import { SIGN_UP_FORM_CONFIG } from './formConfig'

const SignUp = () => {

    const [isPending, setIsPending] = new useState(false);

    async function handleSignUpForm(data){
        setIsPending(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsPending(false)
        console.log(data);
    }

  return (
    <div>
      <h1>Sign Up Form</h1>
      <CustomForm config={SIGN_UP_FORM_CONFIG} onSubmit={handleSignUpForm} isPending={isPending}/>
    </div>
  )
}

export default SignUp
