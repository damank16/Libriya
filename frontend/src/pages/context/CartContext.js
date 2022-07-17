/* Authored by Vanshika Gohel, B00888111, vn232426@dal.ca
 */

import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({children})
{

    const [item, setitem] = useState([]);
    const addToCart =(id, title, author, thumbnail, genre) =>
    {
        setitem((prevState) => [...prevState, {id, title, author, thumbnail, genre}]);
    };
    const removeFromCart =(id) =>
    {
        setitem((prevState) => prevState.filter(i=> i.id !== id));
    };
    const isInCart =(id) =>
    {
        return Boolean (item.find(i => i.id === id));
    };


    return(
        <CartContext.Provider value={{item, removeFromCart, addToCart, isInCart}}>
            {children}
        </CartContext.Provider>
    )

  
};

export default CartContext;