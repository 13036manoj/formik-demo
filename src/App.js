import React, { Component } from 'react';
import {withFormik , Form, Field} from 'formik'
import * as Yup from 'yup'
import './App.css';

const App =({values,errors,touched,isSubmitting})=> {
    return (
      <React.Fragment>
      <Form >
        <div className='App'>
          {touched.email && errors.email && <p className='errorClass'>{errors.email}</p> }
          <Field name='email' type='email' placeholder='email' />
        </div>
        <div className='App'>
         { touched.password && errors.password && <p className='errorClass'>{errors.password}</p> }
         <Field name='password' type='password' placeholder='password' />
        </div>
        <div className='App'>
         { touched.mobile && errors.mobile && <p className='errorClass'>{errors.mobile}</p> }
         <Field name='mobile' type='mobile' placeholder='mobile'/>
        </div>
        <label className='App'>
         <Field type='checkbox' name ='newsLatter' checked={values.newsLatter}/>
          subscribe for News
        </label >
        <br/>
        <br/>
        <label className='App'>
         <Field component='select' name ='plan' checked={values.plan}>
         <option value='Free'>Free</option>
         <option value='Free'>Premium</option>
        </Field>
         Subcription Plan for News
        </label>
        <br/>
        <div style={{marginTop:'20px',float:'center' ,textAlign:'center',height:'42px',background:'#7f7f7f'}}>
          <button style={{textAlign:'center',border:'1px solid red',height:'23px'}} disabled={isSubmitting} type="submit">save</button>
        </div>
      </Form>
       {isSubmitting && <h1>saving data ....... after 2 second submit will get done. form will get reset automaticaly</h1>}
     </React.Fragment>
    );
  }

const formApp=withFormik({
  mapPropsToValues({email,password,mobile,newsLatter,plan}){
    return{
      email:email || '',
      password:password || '',
      mobile:mobile || '',
      newsLatter:newsLatter || true,
      plan:plan || 'Free'
    }
  },
  handleSubmit(values,{resetForm,setError,setSubmitting}){
    setTimeout(()=>{
      if(values.email ==='checking@backend.com'){
        setError({email:'That email is already taken'})
      }else{
        resetForm()
      }
      setSubmitting(false)
    },2000)
    console.log('on submit from',values)
  },
  validationSchema : Yup.object().shape({
    email:Yup.string().email('Email not valid').required('email is required'),
    password:Yup.string().min(6,'Password must be 6 character or longer').required('Password is required'),
    mobile:Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid').required('mobile is required')
  })
})(App)
export default formApp;
