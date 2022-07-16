/* Authored by Vanshika Gohel, B00888111, vn232426@dal.ca
 */
import styled from "styled-components";

import React, { useEffect, useState } from "react";

import { mobile } from "../responsive";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {  Dialog, DialogTitle } from "@mui/material";

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
    const [open, setOpen] = React.useState(false);
    const [failure, setFailure] = React.useState(false);

    const navigate = useNavigate();
    const axios = require('axios');
    const [checkin, setCheckin] = useState();
    const [bar, setBar] = useState();
 //   const [message, setMessage] = useState();


    const handleChange = (event) => {

      setCheckin(event.target.value)


      // console.log(event.target)
      if (event.target.id === "barcode") {
        // console.log("fname", event.target.value)
        setBarcode(event.target.value);
      }
    };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFailure = () => {
    setFailure(false);
  }
  
  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

      navigate("/dashboard");
      
   };

  const handleCheckin = () => {
    try {


      setBar(() => "");
      const bookId = {bookId: barcode}
      axios({
        url: "/api/checkin",
        method: "PUT",
        data: {
          "bookId": 
          bookId
        }
        
      }).then(
        (response) => {
          setOpen(true);
          console.log(response);
        },
        (error) => {
          setFailure(true);
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }

   }

   useEffect(() => {
    if (barcode === "local") {
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
                    <b>Enter the Product ID:</b> 
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField id="barcode" type="text" label="ProductID" variant="outlined" onChange={handleChange} value={bar}  required />
                        <p> {errorbarcode} </p>
                       
                    </Box>
                  </ProductName>

                  <Hr />
                  <Hr />
                  <TopButton type="filled" variant="outlined" onClick={handleCheckin} disabled={!checkin}>
            Check-in
            </TopButton>

            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-title"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/White_check_mark_in_dark_green_rounded_square.svg" />{"Checkin successfully!"}</DialogTitle>
            </Dialog>

            <Dialog
            open={failure}
            onClose={handleFailure}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-title">{"Checkin failed! Please re-enter the Product ID"}</DialogTitle>
            </Dialog>
            
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