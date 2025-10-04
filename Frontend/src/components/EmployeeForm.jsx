import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const EmployeeSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must be at most 30 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  position: Yup.string()
    .min(2, 'Position must be at least 2 characters')
    .required('Position is required'),
  salary: Yup.number()
    .typeError('Salary must be a number')
    .min(0, 'Salary must be positive')
    .required('Salary is required'),
  department: Yup.string()
    .min(2, 'Department must be at least 2 characters')
    .required('Department is required'),
});

function EmployeeForm({ initialValues, onSubmit, isEditing }) {
  return (
    <div className="flex flex-col items-center justify-center  ">
      <div className="w-full max-w-md bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl backdrop-blur-lg">
        <h2 className="text-2xl font-bold text-center mb-8">
          {isEditing ? 'Edit Employee' : 'Add Employee'}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={EmployeeSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-1 font-medium" htmlFor="name">Enter the name</label>
                <Field
                  name="name"
                  id="name"
                  placeholder="Eg: John Doe"
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium" htmlFor="email">Enter the email</label>
                <Field
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Eg: john@example.com"
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium" htmlFor="position">Enter the position</label>
                <Field
                  name="position"
                  id="position"
                  placeholder="Eg: Software Developer"
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <ErrorMessage name="position" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium" htmlFor="salary">Enter the salary</label>
                <Field
                  name="salary"
                  id="salary"
                  type="number"
                  min={0}
                  placeholder="Eg: 50000"
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <ErrorMessage name="salary" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium" htmlFor="department">Enter the department</label>
                <Field
                  name="department"
                  id="department"
                  placeholder="Eg: HR"
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <ErrorMessage name="department" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
              >
                {isEditing ? 'Update Employee' : 'Add Employee'}
              </button>
             <Link to="/" className="block text-center w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition" > Back To Home </Link>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EmployeeForm;
