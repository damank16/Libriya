/* Authored by Vanshika Gohel, B00888111, vn232426@dal.ca
 */

import styled from "styled-components";

import React, { useEffect } from "react";

import { mobile } from "../responsive";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;


const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;


const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Checkin = () =>
{
   // const [open, setOpen] = React.useState(false);
    const [barcode, setBarcode] = React.useState('');
    const [errorbarcode, setErrorBarcode] = React.useState('');
    //const [showResults, setshowResults] = React.useState(true);
    const navigate = useNavigate();
    const axios = require('axios');


    const handleChange = (event) => {
      // console.log(event.target)
      if (event.target.id === "barcode") {
        // console.log("fname", event.target.value)
        setBarcode(event.target.value);
      }
    };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  
  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

      navigate(-1);
      
   };

  const handleCheckin = () => {
    try {
     
      const bookId = {bookId: barcode}
      axios({
        url: "http://localhost:4000/checkin",
        method: "PUT",
        data: {
          "bookId": 
          bookId
        }
        
      }).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }

   }

   useEffect(() => {
    if (barcode === "") {
      setErrorBarcode("Barcode cannot be blank");
    } else {
      setErrorBarcode("");
    }
  }, [barcode]);

    return(
        <div>
         <Container>
      <Wrapper>
        <Title>RETURN ITEMS</Title>

        <Top>
          <TopButton onClick={handleSubmit}>Go Back</TopButton>
        
          
        </Top>
        <Bottom>
          <Info>
            <Product>
              <ProductDetail>
               
                <Details>
                    
                    
                  <ProductName>
                    <b>Enter the barcode of the item:</b> 
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField id="barcode" type="text" label="Barcode" variant="outlined" onChange={handleChange} value={barcode}  required />
                        <p> {errorbarcode} </p>
                       
                    </Box>
                  </ProductName>

                  <Hr />
                  <Hr />
                  <TopButton type="filled" variant="outlined" onClick={handleCheckin}>
            Check-in
            </TopButton>
            
                </Details>
              </ProductDetail>
              
            </Product> 
            
            <Hr />
            <Hr />
            <Hr />
            <Hr />
            <Hr />
          </Info>
        </Bottom>
      </Wrapper>
    </Container>
        </div>
        
    );
};

export default Checkin;