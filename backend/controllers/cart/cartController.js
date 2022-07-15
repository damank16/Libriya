/* Authored by Vanshika Gohel, B00888111, vn232426@dal.ca
 */
const { Cart } = require("../../models/cart/cartModel");

exports.checkout = async (req, res) =>
{
        const user_id = "11";
        let date_ob = new Date();
        let book_ids = req.body.items;

        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();

        let checkout_date = year + "-" + month + "-" + date+ " " + hours + ":" + minutes + ":" + seconds;
        let checkout_date2 = checkout_date.toString();
        console.log(checkout_date2);

        var updated_data = book_ids.map(i => ({
            'bookId' : i.bookId,
            'user_id' : user_id,
            'checkout_date': checkout_date2
        }));
    

        try{

            Cart.insertMany(updated_data);
            return res.status(201).json({
                message:"checkout details added",
                success: true,
            })
    
        }
        catch(err){
            return res.status(500).json({
                message: "Internal server error",
                success : false
            })
    
        }
}
exports.checkin = async(req,res) =>{
    
    var conditions = req.body.bookId;
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

     // current hours
     let hours = date_ob.getHours();

     // current minutes
     let minutes = date_ob.getMinutes();

     // current seconds
     let seconds = date_ob.getSeconds();

    let checkin_date = year + "-" + month + "-" + date+ " " + hours + ":" + minutes + ":" + seconds;
    let checkin_date2 = checkin_date.toString();

    var updated_data = {
        checkin_date: checkin_date2
    }
  

    try{
        Cart.updateOne(conditions, updated_data).then(doc =>
            {
                    return res.status(200).json({

                        message: "Book Checked in!",
                        success: true,         
                    })   
            })
        }
        catch(err)
        {
            return res.status(500).json({
                         message: "Internal server error",
                         success : false
                     }
            )
        }
}