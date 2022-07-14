import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'
import PropTypes from 'prop-types'
import { mobile } from './responsive'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Navigate, useNavigate } from 'react-router-dom'

const Container = styled.div``

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`

const Info = styled.div`
  flex: 3;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`

const Image = styled.img`
  width: 200px;
`

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ProductName = styled.span``

const ProductId = styled.span``

const ProductSize = styled.span``

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`

const Cart = () => {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <div>
      <Container>
        <Wrapper>
          <Title>YOUR CART</Title>
          <Top>
            <TopButton onClick={handleSubmit}> Go Back</TopButton>

            <TopButton
              type='filled'
              variant='outlined'
              onClick={handleClickOpen}
            >
              CHECKOUT NOW
            </TopButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-slide-description'
            >
              <DialogTitle id='alert-dialog-title'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/8/8c/White_check_mark_in_dark_green_rounded_square.svg' />
                {'Checkout successfully!'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  <h3> Your Cart is now empty </h3>
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </Top>
          <Bottom>
            <Info>
              <Product>
                <ProductDetail>
                  <Image src='https://live.staticflickr.com/28/49684002_3890beba97.jpg' />
                  <Details>
                    <ProductName>
                      <b>Title:</b> Harry Potter and the Sorcerer's stone
                    </ProductName>
                    <ProductId>
                      <b>Barcode:</b> 129893813718293
                    </ProductId>
                    <ProductSize>
                      <b>Author:</b> JK Rowling
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <DeleteIcon />
                  </ProductAmountContainer>
                </PriceDetail>
              </Product>
              <Hr />
              <Product>
                <ProductDetail>
                  <Image src='https://live.staticflickr.com/28/49684002_3890beba97.jpg' />
                  <Details>
                    <ProductName>
                      <b>Title:</b> Harry Potter and the Sorcerer's stone
                    </ProductName>
                    <ProductId>
                      <b>Barcode:</b> 129893813718293
                    </ProductId>
                    <ProductSize>
                      <b>Author:</b> JK Rowling
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <DeleteIcon />
                  </ProductAmountContainer>
                </PriceDetail>
              </Product>
            </Info>
          </Bottom>
        </Wrapper>
      </Container>
    </div>
  )
}

export default Cart
