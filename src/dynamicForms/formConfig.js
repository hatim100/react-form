import { email, z } from "zod";
export const SIGN_IN_FORM_CONFIG = [
    {
        id: "username",
        name: "usernamew",
        label: "Username",
        placeholder: "e.g. john123",
        defaultValue: "satya",
        type: "text"
      },
    {
      id: "email",
      name: "email",
      label: "Email",
      placeholder: "e.g. john@example.com",
      default: "",
      type: "email"
    },
    {
        id: "password",
        name: "password",
        label: "Password",
        placeholder: "e.g. Strong Password",
        default: "",
        type: "password"
      }
]
export const SIGN_UP_FORM_CONFIG = [
    {
        id: "username",
        name: "username",
        label: "Username",
        placeholder: "e.g. john123",
        defaultValue: "",
        type: "text",
        /*validate: val => {
            if(!val) return "Username is required"
            if(val.length < 4) return "Username should be of at least length 4"
            return null;
        }*/
       zodd: z.string().trim().min(1, "Username is required").min(4, "Username should be of at least length 4")
      },
    {
      id: "email",
      name: "email",
      label: "Email",
      placeholder: "e.g. john@example.com",
      default: "",
      type: "email",
     /* validate: val => {
        if (!val) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) return "Email is not valid";
        return null;
      }*/
     zodd: z.string().trim().min(1, "Email is required").pipe(z.email("Email is not valid"))
    },
    {
        id: "password",
        name: "password",
        label: "Password",
        placeholder: "e.g. Strong Password",
        default: "",
        type: "password",
        /*validate: val => {
            if(!val) return "Password is required"
            if(val.length < 6) return "Password should be of at least length 6"
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/;
            if (!passwordRegex.test(val)) {
            return "Password must contain uppercase, lowercase and special character";
            }
            return null;
      }*/
     zodd: z.string().trim().min(1, "Password is required").min(6, "Password should be of at least length 6").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,    "Password must contain uppercase, lowercase and special character")
    },
      {
        id: "confirmPassword",
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "e.g. same as above",
        default: "",
        type: "password",
        /*validate: (val,formData) => {
         if(val === formData.password) return null;
         return "Password does not match";
        }*/
        zodd: z.object({
            password: z.string().trim().min(1, "Password is required").min(6, "Password should be of at least length 6").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,    "Password must contain uppercase, lowercase and special character"),
            confirmPassword: z.string()
        }) .refine( data => data.password === data.confirmPassword,
            {
                message: "Password does not match",
                path: ["confirmPassword"]
            }
        )
      },
      {
        id: "gender",
        name: "gender",
        label: "Gender",
        placeholder: "",
        defaultValue: "",
        type: "radio",
        options: [
            {
              label: "Male",
              value: "male"
            },
            {
                label: "female",
                value: "female"
            },
            {
                label: "Others",
                value: "others"
            }
        ],
        validate: val => {
            if(val) return null;
            return "Please select a gender";
        }
      },
      {
        id: "country",
        name: "country",
        label: "Country",
        placeholder: "",
        defaultValue: "",
        type: "select",
        options: [
            {
              label: "USA",
              value: "usa"
            },
            {
                label: "India",
                value: "india"
            },
            {
                label: "Canada",
                value: "canada"
            }
        ],
        validate: val => {
            if(val) return null;
            return "Please select a country";
        }
      },
      {
        id: "hobbies",
        name: "hobbies",
        label: "Hobbies",
        placeholder: "",
        defaultValue: [],
        type: "checkbox",
        options: [
            {
              label: "Sports",
              value: "sports"
            },
            {
                label: "Reading",
                value: "reading"
            },
            {
                label: "Coding",
                value: "coding"
            }
        ],
        validate: val => {
            if(val && val.length > 0 ) return null;
            return "Please select at least one Hobby";
        }
      }
]