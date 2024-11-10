import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './dashboard.css'

function DashBoard() {
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])
  const [expenditure, setExpenditure] = useState([])
  const [sort, setSort] = useState({
    category: '',
    categoryType: '',
    date: ''
  })
  const [transaction, setTransaction] = useState([])
  const [categoryType, setCategoryType] = useState([])
  const [category, setCategory] = useState([])
  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://expense-tracker-nu-blond.vercel.app/api/profile/', {
        headers: { 'Authorization': `Token ${localStorage.getItem('access_token')}` }
      });
      setUser(response.data.user)
      setProfile(response.data.profile)
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  const fetchExpenditure = async () => {
    try {
      const response = await axios.get('https://expense-tracker-nu-blond.vercel.app/api/expenditure/', {
        headers: { 'Authorization': `Token ${localStorage.getItem('access_token')}` }
      })
      setExpenditure(response.data)
    }
    catch (error) {
      console.error('Error fetching profile:', error);
    }
  }
  const fetchTransaction = async () => {
    try {
      const response = await axios.get('https://expense-tracker-nu-blond.vercel.app/api/transaction/list', {
        headers: { 'Authorization': `Token ${localStorage.getItem('access_token')}` }, params:sort
      }
     
    )
      setTransaction(response.data)
      console.log(response.data)
    }
    catch (error) {
      console.error('Error fetching profile:', error);
    }
  }
  const fetchCategoryType = () => {
    axios.get('https://expense-tracker-nu-blond.vercel.app/api/categorytype/list/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('access_token')}`
      },
    })
      .then(response => {
        setCategoryType(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://expense-tracker-nu-blond.vercel.app/api/category/list', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('access_token')}`
        },
        params: { category_type: '' }
      });
      setCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfile();
    fetchExpenditure();
    fetchTransaction();
    fetchCategoryType();
    fetchCategories();
  }, []);
  const handleDelete = async (itemId, categoryType) => {
    try {
      console.log(itemId)
      const response = await axios.delete('https://expense-tracker-nu-blond.vercel.app/api/transaction/delete/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('access_token')}`
        },
        data: {
          itemId: itemId,
          categoryType: categoryType
        }
      }

      );
      fetchProfile();
      fetchExpenditure();
      fetchTransaction();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target
    setSort((prev) => ({
      ...prev,
      [name]: value
    }))
    
  }
  
  useEffect ( ()=>{fetchTransaction},[sort])
  const handleClick = () =>{
    fetchTransaction();
  }
  return (
    <div>
      <div className='profile_container'>
        <div >
          <img className = 'profile_pic' src='./src/assests/user_icon.png'/>
        </div>
        <div className='profile_details'>
          <div className="detail">
            <p className="label">Username:</p>
            <p>{user.username}</p>
          </div>
          <div className="detail">
            <p className="label">Email:</p>
            <p>{user.email}</p>
          </div>
          <div className="detail">
            <p className="label">Balance:</p>
            <p>{profile.Balance}</p>
          </div>
        </div>
      </div>

      <div className='track_container'>
        <h2>Track of expenditure</h2><br />
        <div className='track_items'>
          <p >Today's Expenditure:  <span style={{color:expenditure.today_expenditure?'red':'black'}}>{expenditure.today_expenditure}</span></p>
          <p >Today's Income: <span style={{color:expenditure.today_income?'green':'black'}}>{expenditure.today_income}</span> </p>
          <p >This Month's Expenditure: <span style={{color:expenditure.month_expenditure?'red':'black'}}>{expenditure.month_expenditure }</span> </p>
          <p >This Month's Income: <span style={{color:expenditure.month_income?'green':'black'}}> {expenditure.month_income}</span> </p>
        </div>
      </div>

      <div className='transaction_card'>
        <div className='card'>
          category:&nbsp;&nbsp;<select name="category" onChange={handleChange}>
            <option value="" >None</option>
            {category.map((tag) => (
              <option key={tag.id} value={tag.id} style={{ color: tag.category_type_name === 'income' ? 'green' : 'red' }}>
                {tag.name}
              </option>
            ))}
          </select>&nbsp; &nbsp;
          Category Type:&nbsp;&nbsp;<select name="categoryType" onChange={handleChange}>
            <option value=''>None</option>
            {categoryType.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>&nbsp; &nbsp;
          Date:&nbsp;&nbsp;<input type='date' name='date' onChange={handleChange}/>&nbsp;&nbsp;&nbsp;
          <button onClick={handleClick}>Apply</button>
        </div>

        {transaction.length>0 ? transaction.map((item) => (
          <div className='card' key={item.id}>
            <p>{item.date}</p>
            <p style={{ color: 'blue' }}>{item.category_name}</p>
            <p style={{ color: item.category_type_name === 'income' ? 'green' : 'red' }}>{item.amount}</p>
            <img className='icon' src='./src/assests/trash2.png' onClick={() => { handleDelete(item.id, item.category_type_name) }} alt='delete' />
          </div>
        )):(<p className='data'>No data</p>)}
      </div>
    </div >

  )
}

export default DashBoard
