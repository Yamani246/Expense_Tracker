import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Categories({ setExpenseCategory, setIncomeCategory }) {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Authorization': `Token ${token}`
  };
  const [done,setDone]=useState('')
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category_type: '',
  });

  const navigate = useNavigate();

  const fetchCategories = async (categoryType, setter) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/category/list', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('access_token')}`
        },
        params: { category_type: categoryType }
      }).then(setDone('Successfully added Category'));
      setter(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setDone('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:8000/category/create/', formData, { headers });
        fetchCategories('expense', setExpenseCategory);
        fetchCategories('income', setIncomeCategory);
        navigate('/home');
        setDone('Successfully added Category');
    } catch (error) {
        console.log('Error:', error.response); // Log the complete error response
        setDone('Error creating category. Please try again.'); // Inform the user of the error
    }
};
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/categorytype/list/', {
      headers,
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div className='categories-container'>
      <div className='categories-form'>
        <h2>ADD Category</h2>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Category' value={formData.name} name='name' onChange={handleChange} required /><br /><br />
          Category Type:&nbsp;&nbsp;
          <select name='category_type' value={formData.category_type} onChange={handleChange} required>
            <option value='' disabled>Select a category type</option>
            {data.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select><br /><br />
          <button type="submit">Save</button>
          {done && <p>{done}</p>}
        </form>
      </div>
    </div>
  );
}

export default Categories;
