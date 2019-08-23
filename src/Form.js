// *** IMPORTS *** //

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

// *** USER FORM *** //

const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);
    console.log(users);

    useEffect(() => {
        if (status) {
          setUsers([...users, status]);
        }
      }, [status]);

    return (
        <div className="userForm">
            <h1>Create Your Profile!</h1>
            <Form>
                <Field type="text" name="username" placeholder="Enter Username"/>
                {touched.username && errors.username && (
                    <p classname="error">{errors.username}</p>
                )}

                <Field type="text" name="email" placeholder="Enter Email"/>
                {touched.email && errors.email && (
                    <p classname="error">{errors.email}</p>
                )}
                <Field type="password" name="password" placeholder="Enter Password"/>
                {touched.password && errors.password && (
                    <p classname="error">{errors.password}</p>
                )}

                <Field type="checkbox" name="tos" />

                <Field type="text" name="tod" />
                {touched.email && errors.email && (
                    <p classname="error">{errors.email}</p>
                )}

                <button type="submit">Submit!</button>
            </Form>
        <div className="user-container">
            {users.map(user => {
                return (
                    <ul key={user.id} className="user-card">
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        <li>{user.password}</li>
                    </ul>
                )
            })}
        </div>
        </div>
    )
}

// *** FORMIK - USER FROM *** //

const FormikUserForm = withFormik({
    mapPropsToValues({ username, email, password, tos }) {
        return {
            username: username || '',
            email: email || '',
            password: password || '',
            tos: tos || ''
        };
      },

// *** YUP STUFF *** //

validationSchema: Yup.object().shape({
    username: Yup.string().required('Please enter username'),
    email: Yup.string().required('Please enter email'),
    password: Yup.string().required('Please enter password'),
    tos: Yup.boolean().oneOf([true],'Please accept Terms of Service')
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }



})(UserForm);

export default FormikUserForm;



