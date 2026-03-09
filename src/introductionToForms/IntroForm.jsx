import React, { useActionState, useState } from 'react'

const IntroForm = () => {

  const initState = {
    firstName: "Satya",
    email: "satya@gmail.com",
    password: "223",
    gender: "male",
    country: "usa",
    hobbies: ["sports","reading"]
  }


  const [state,action,isPending] = useActionState(formSubmitted,initState);
    async function formSubmitted(prevData,formData){
      console.log(prevData, Object.fromEntries(formData));
      console.log("submitting...");
      await new Promise((resolve) => setTimeout(resolve,4000)); 
       let data = Object.fromEntries(formData)
       const allHobbies = formData.getAll("hobbies");
        data = {...data, hobbies: allHobbies}
        console.log("submitted successfully",data)

        return {};
    }

    const emptyState = {
        firstName : "",
        email : "",
        password: "",
        gender: "",
        country: "",
        hobbies: []
    }

    const [ data, setData ] = useState(emptyState);

    function handleInputUpdate(e){
      const {name,type,value,checked} = e.target;
      if(type === "checkbox"){
        const newHobbies = checked ? [...data.hobbies,value] : data.hobbies.filter(item => item!== value);
        const newData = {...data,hobbies:newHobbies};
        setData(newData);
        console.log(newData);
        return; 
      }
      const newData = {...data, [name] : value} 
      setData(newData);
      console.log("final new data\n",newData);
    }
    function onFormSubmit(e){
      e.preventDefault();
      console.log(data);

      // e.target.reset();
      setData(emptyState);
    }
  return (
  <form onSubmit={onFormSubmit} noValidate>
    <label>First Name
    <input type="text" name="firstName" placeholder="e.g. Satyajit" onChange={handleInputUpdate} value={data.firstName}/>
    </label>
    <br />
    <label>Email
    <input type="email" name="email" placeholder="e.g. example@gmail.com" onChange={handleInputUpdate} value={data.email}/>
    </label>
    <br />
    <label>Password
    <input type="text" name="password" placeholder="give a strong password" onChange={handleInputUpdate} value={data.password}/>
    </label>
    <br />
    <label>
      Gender
      <label>
        <input type="radio" name="gender" value="male" checked={"male"===data.gender} onChange={handleInputUpdate}/>
        Male
      </label>
      <label>
        <input type="radio" name="gender" value="female" checked={"female"===data.gender} onChange={handleInputUpdate}/>
        Female
      </label>
      <label>
        <input type="radio" name="gender" value="others" checked={"others"===data.gender} onChange={handleInputUpdate}/>
        Others
      </label>
    </label>
    <br />
    <label>Country
      <select name="country" value={data.country} onChange={handleInputUpdate}>
        <option value="">Choose a country</option>
        <option value="india">India</option>
        <option value="usa">USA</option>
        <option value="canada">Canada</option>
      </select>
    </label>
    <br />
    <label>
      Hobbies
      <label>
        <input type="checkbox" name="hobbies" value="sports" checked={data.hobbies?.includes("sports")} onChange={handleInputUpdate}/>
        Sports
      </label>
      <label>
        <input type="checkbox" name="hobbies" value="reading" checked={data.hobbies?.includes("reading")} onChange={handleInputUpdate}/>
        Reading
      </label>
      <label>
        <input type="checkbox" name="hobbies" value="cooking" checked={data.hobbies?.includes("cooking")} onChange={handleInputUpdate}/>
        Cooking
      </label>
    </label>
    <br />
    <button disabled={isPending} type="submit">Submit</button>
    <button type="cancel">Cancel</button>
  </form>
  )
}

export default IntroForm
