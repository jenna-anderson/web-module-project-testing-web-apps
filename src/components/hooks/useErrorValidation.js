import { useState } from 'react';

const useErrorValidation = (initialValues) => {
  const [errors, setErrors] = useState(initialValues);
  
  const errorHandling = (fieldName, fieldValue) => {
    if (fieldName === "firstName" && fieldValue.length < 5)
      return `${fieldName} must have at least 5 characters.`;
  
    const emailRegex = /(.*)@(.*)\.(.+)/g;
    if (fieldName === "email" && !fieldValue.match(emailRegex))
      return `${fieldName} must be a valid email address.`;
  
    if (fieldName !== "message" && fieldValue === "")
      return `${fieldName} is a required field.`;
    
    return "";
  }
  return [ errors, setErrors, errorHandling ];
}

export default useErrorValidation;