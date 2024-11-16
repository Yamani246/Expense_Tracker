import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AddTransaction({ categoryType,categories }) {

  const today=new Date().toISOString().split('T')[0]
  const [done,setDone]=useState('')
  const [formData, setFormData] = useState({
    amount: '',
    category: '', 
    date: today
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setDone('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/transaction/create/',formData,{ 
        headers: {
        'Authorization': `Token ${localStorage.getItem('access_token')}`
      }}).then(setDone('Successfully added'))
    console.log(response.data)
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className='add-container'>
      <h2>Add {categoryType === 'income' ? 'Income' : 'Expense'}</h2>
      <div className='add-form'>
        <form onSubmit={handleSubmit}>
          <input type='number' name='amount' placeholder='Amount' value={formData.amount} onChange={handleChange} required/><br /><br />
          Category:&nbsp;&nbsp;
          <select name='category' value={formData.category} onChange={handleChange} required>
          <option value='' disabled>Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <br /><br />
          Date:&nbsp;&nbsp;<input type='date' name='date' value={formData.date} max={today} onChange={handleChange} /><br /><br />
          <button type='submit'>Add</button>
        </form>
      {done && <p>{done}</p>}
      </div>
    </div>
  );
  
}

export default AddTransaction;
