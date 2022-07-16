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
        {/* <br />
        <Button variant="outlined" onClick={handleSubmit}>Exit</Button> */}
        <Navbar></Navbar>
       <h1>Checkout Sucessfull! </h1>
      
   </div>
 
    )
}
export default Checkout;