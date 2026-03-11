import { useState } from "react";
import FormInput from "./FormInput"
import {z} from 'zod'
import { useMemo } from "react";

const CustomForm = ({config, onSubmit, isPending}) => {

    const initData = config.reduce((acc,field) => {
        acc[field.name] = field.defaultValue || "";
        return acc;
    },{});
    
    /*const formSchema = z.object(
        config.reduce((acc, field) => {
            if(field.zodd) acc[field.name] = field.zodd;
            return acc;
        }, {})
    )*/

const formSchema = useMemo(() => {
  let schema = z.object(
    config.reduce((acc, field) => {
      if (field.zodd) acc[field.name] = field.zodd; //field name as key and correspoding zod schema as value
      return acc;
    }, {})
  );

  schema = schema.refine(
    data => data.password === data.confirmPassword,
    {
      message: "Password does not match",
      path: ["confirmPassword"]
    }
  );

  return schema;
}, [config]);

    
    // console.log("formschema ",formSchema);

    const [data, setData] = useState(initData);
    const [error, setError] = useState({});

 function handleInputUpdate(e){
    const { name, value } = e.target;
    // const newData = {...data, [name]: value};
    // setData(newData);
    /*setData(prev => ({
        ...prev,
        [name]: value
      }));*/
      //zod validation

      const updatedData = {
        ...data,
        [name]: value
      };
    
      setData(updatedData);

     /* const result = formSchema.safeParse({
        ...data,
        [name] : value
      })*/

    const result = formSchema.safeParse(updatedData);

      if(!result.success){
        const fieldError = result.error.issues.find(
            issue => issue.path[0] === name
        )

        setError(prev => ({
            ...prev,
            [name]: fieldError?.message
        }))
      }else{
        setError(prev => ({
            ...prev,
            [name]: undefined
        }))
      }

    //   const field = config.find(item => item.name === name);
    /*const configMap = config.reduce((acc, item) => {
        acc[item.name] = item;
        return acc;
    },{});*/

    /*const field = configMap[name];
    const message = field.validate?.(value,data);
     setError( prevErrors => {
        return {...prevErrors, [name]: message};
     })*/
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

  const result = formSchema.safeParse(data);
  /*const newErrors = config.reduce((errors,{name,validate}) => {
    const error = validate?.(data[name],data);
    if(error) errors[name]=error;
    return errors;
  },{});*/
// zod validation added
if(!result.success){
    const newErrors = result.error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
    },{})

    setError(newErrors);
    console.log("Errors are here", newErrors);
    return;
}

setError({});
console.log("Success", result.data);
onSubmit(result.data);

//   setError(newErrors);
 /* if(Object.keys(newErrors).length===0){
    console.log(onSubmit)
    onSubmit(data);
    console.log("Success", data);
  } else console.log("Errors are here ",newErrors);*/


 }

  return (
    <form onSubmit={handleFormSubmit}>
     {config.map(item => <FormInput key={item.id} value={data[item.name]} onChange = {handleInputUpdate} {...item} error={error[item.name]}/>)}
     <button disabled={isPending} type="submit">Submit</button>
    </form>
  )
}

export default CustomForm
