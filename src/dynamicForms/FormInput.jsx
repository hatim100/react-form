import React from 'react'

const FormInput = ({ id, label, defaultValue,options,type,name,value,onChange, error}) => {

    const RadioComponent = type === "radio" && (
    <>
        {options?.map((option) => (
            <label key={option.value}>
                <input 
                type="radio"
                name={name}
                value={option.value}
                onChange={onChange}
                checked={value===option.value} 
                />
                {option.label}
            </label>
        ))}
    </>
    );

    function handleCheckboxUpdate(e){
     const newValue = e.target.checked ? [...value, e.target.value] : value.filter(item => item!=e.target.value);
     onChange({target: {name, value: newValue}})
    }

    const CheckBoxComponent = type === "checkbox" && (
        <>
        {options?.map((option) => (
            <label key={option.value}>
                <input 
                type="checkbox"
                name={name}
                value={option.value}
                onChange={handleCheckboxUpdate}
                checked={value.includes(option.value)} 
                />
                {option.label}
            </label>
        ))}
       </>
    );

    const SelectComponent = type === "select" && (
     <select name={name} id={id} onChange={onChange}>
        {options?.map((item) => (
          <option key={item.value} value={item.value}>{item.label}</option>
        ))}
     </select>
    );
  return (
   <div>
     <label htmlFor={id}>{label}</label>
     {type === "radio" ? RadioComponent :
      type === "select" ? SelectComponent : 
      type === "checkbox" ? CheckBoxComponent : 
      <input id={id} type={type} name={name} value={value} onChange={onChange}/>}
      {error && <p style={{color: "red"}}>{error}</p>}
   </div>
  )
}

export default FormInput
