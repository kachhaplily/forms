import React from 'react'
import { Formik, Form, Field, ErrorMessage,useFormik } from 'formik';

const Image = () => {
    const formik = useFormik({
        initialValues: {
          image: null,
        },
        onSubmit: (values) => {
          const formdata = new FormData();
          formdata.append('image', values);
          console.log(formdata)
          
        },
      });
      
  return (
    <>
<form onSubmit={formik.handleSubmit}>
  <input type="file" name="image" onChange={(event) => {
    formik.setFieldValue("image", event.currentTarget.files);
  }} />
  <button type="submit" disabled={formik.isSubmitting}>Submit</button>
</form>
    </>
  )
}

export default Image