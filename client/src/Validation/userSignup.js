import * as yup from 'yup';

// const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(20)
    .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
    .required('Required'),
 
  address:yup.string()
  .min(2, 'First name must be at least 2 characters')
  .max(20)
  .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
  .required('Required'),
  
  image: yup.mixed()
  .required('Please upload an image')
 ,
  password: yup
    .string()
    .min(5, 'password should contain 5-16 characters')
    .max(16, 'password should contain 5-16 characters')
    // .matches(passwordRule, 'Please create a stronger password')
    .required('Required'),
 
});