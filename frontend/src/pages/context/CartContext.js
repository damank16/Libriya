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

    return(
        <CartContext.Provider value={{item, addToCart}}>
            {children}
        </CartContext.Provider>
    )

  
};

export default CartContext;