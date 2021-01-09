import { useState } from 'react';

const useForm = initialValue => { // Hook to handle data from basic forms
  const [form, setForm] = useState(initialValue); // State to save and pass by

  const handleChange = ev => { // The main function that handles changes on the inputs of the form
    const { name, type, value, checked } = ev.target;
    // When the input changes, we will save that input data on the 'form' state using its name as the key
    // If its a checkbox it will take a boolean variable (true||false)
    // Otherwise, it will save it's value
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  return [form, handleChange];
};

export default useForm;
