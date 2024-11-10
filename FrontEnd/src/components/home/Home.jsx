import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from './Categories';
import './home.css';
import AddTransaction from './AddTransaction';

function Home() {
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [incomeCategory, setIncomeCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async (categoryType, setter) => {
      try {
        const response = await axios.get('https://expense-tracker-backend-six-ochre.vercel.app/category/list', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('access_token')}`
          },
          params: { category_type: categoryType }
        });
        setter(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories('expense', setExpenseCategory);
    fetchCategories('income', setIncomeCategory);
  }, []);

  return (
    <div className='container-home'>
      <div className='home'>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <div className='homeitems'><AddTransaction categoryType='expense' categories={expenseCategory} /></div>
            <div className='homeitems'><Categories setIncomeCategory={setIncomeCategory} setExpenseCategory={setExpenseCategory} /></div>
            <div className='homeitems'><AddTransaction categoryType='income' categories={incomeCategory} /></div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
