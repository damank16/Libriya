/* Authored by Vanshika Gohel, B00888111, vn232426@dal.ca
 */

import { Button } from '@mui/material';
import React from 'react' 
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar'


function Checkout()
{
    const navigate = useNavigate();
const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

      navigate('/');
    
   };
    return(
    
        <div>
        <Navbar></Navbar>
       <h1>Checkout Sucessfull! You can use the borrowed items for 30 days</h1>
   </div>
 
    )
}
export default Checkout;