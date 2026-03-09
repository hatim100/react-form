import { useState } from "react";
import FormInput from "./FormInput"

const CustomForm = ({config, onSubmit, isPending}) => {

    const initData = config.reduce((acc,field) => {
        acc[field.name] = field.defaultValue || "";
        return acc;
    },{});  

    const [data, setData] = useState(initData);
    const [error, setError] = useState({});

 function handleInputUpdate(e){
    const { name, value } = e.target;
    // const newData = {...data, [name]: value};
    // setData(newData);
    setData(prev => ({
        ...prev,
        [name]: value
      }));

    //   const field = config.find(item => item.name === name);
    const configMap = config.reduce((acc, item) => {
        acc[item.name] = item;
        return acc;
    },{});

    const field = configMap[name];
      const message = field.validate?.(value,data);
      /*if(message){
        setError( prevErrors => {
            return {...prevErrors, [name]: message};
        })
      }else{
        setError( prevErrors => {
            return {...prevErrors, [name]: undefined};
        })
      }*/
     setError( prevErrors => {
        return {...prevErrors, [name]: message};
     })
 }

 function handleFormSubmit(e){
  e.preventDefault();

 /* const newErrors = {};
  config.forEach(item => {
    const name = item.name;
    const value = data[name];
    const error =  item.validate && item.validate(value);
    if(error){
        newErrors[name] = error;
    }
  });*/
  const newErrors = config.reduce((errors,{name,validate}) => {
    const error = validate?.(data[name],data);
    if(error) errors[name]=error;
    return errors;
  },{});
  setError(newErrors);
  if(Object.keys(newErrors).length===0){
    console.log(onSubmit)
    onSubmit(data);
    console.log("Success", data);
  } else console.log("Errors are here ",newErrors);


 }

  return (
    <form onSubmit={handleFormSubmit}>
     {config.map(item => <FormInput key={item.id} value={data[item.name]} onChange = {handleInputUpdate} {...item} error={error[item.name]}/>)}
     <button disabled={isPending} type="submit">Submit</button>
    </form>
  )
}

export default CustomForm
