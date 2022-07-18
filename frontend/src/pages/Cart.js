/* Authored by Vanshika Gohel, B00888111, vn232426@dal.ca
 */
import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useState } from 'react'
import { mobile } from './responsive'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import CartContext from './context/CartContext'
import { CheckoutContext } from './context/CheckoutContext'
import { toast } from 'material-react-toastify'
import { Typography } from '@mui/material'

const { default: axios } = require('axios')

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
  const setShowCart = useContext(CheckoutContext)
  const [visible, setVisible] = React.useState(true)
  const navigate = useNavigate()
  const { item, removeFromCart, clearCart } = useContext(CartContext)
  const [checkin, setCheckin] = useState()

  const hideItem = (id) => {
    removeFromCart(id)
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault()

    navigate(-1)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCheckout = () => {
    setOpen(true)
    // setShowCart(true);
    // item.length = 0;

    try {
      axios({
        url: '/api/checkout',
        method: 'POST',
        data: {
          items: item.map((i) => ({
            bookId: i.id,
          })),
        },
      }).then(
        (response) => {
          console.log(response)
          clearCart()
          toast.success('Checkout successful!')
          navigate('/dashboard')
        },
        (error) => {
          console.log(error)
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Container>
        <Wrapper>
          <Title> YOUR CART </Title>{' '}
          <Top>
            <TopButton onClick={handleSubmit}> Go Back </TopButton>
          </Top>
          {item.length === 0 ? (
            <Typography variant='h6' textAlign='center'>
              {' '}
              No items in the cart!{' '}
            </Typography>
          ) : (
            item.map((it) => {
              return (
                <Bottom key={it.id}>
                  <Info>
                    <Product>
                      <ProductDetail>
                        <Image src={it.thumbnail || '/assets/book.jpeg'} />{' '}
                        <Details>
                          <ProductName>
                            <b> Title: </b> {it.title}{' '}
                          </ProductName>
                          <ProductSize>
                            <b> Author: </b> {it.author}{' '}
                          </ProductSize>
                          <ProductSize>
                            <b> Product ID: </b> {it.id}{' '}
                          </ProductSize>{' '}
                        </Details>{' '}
                      </ProductDetail>{' '}
                      <PriceDetail>
                        <ProductAmountContainer>
                          <DeleteIcon
                            onClick={() => hideItem(it.id)}
                          ></DeleteIcon>
                        </ProductAmountContainer>{' '}
                      </PriceDetail>{' '}
                    </Product>{' '}
                    <Hr />
                  </Info>
                </Bottom>
              )
            })
          )}
          <TopButton
            type='filled'
            variant='outlined'
            onClick={handleCheckout}
            style={{ display: item.length === 0 ? 'none' : 'block' }}
          >
            CHECKOUT NOW{' '}
          </TopButton>
          {/* <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-title"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/White_check_mark_in_dark_green_rounded_square.svg" />{"Checkout successfully!"}</DialogTitle>
            </Dialog> */}
        </Wrapper>
      </Container>{' '}
    </div>
  )
}

export default Cart
