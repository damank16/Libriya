const expressAsyncHandler = require('express-async-handler')
const { extname } = require('path')
const Book = require('../models/Book')

const removeEmptyOrNull = (obj) => {
    Object.keys(obj).forEach(k =>
      (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||
      (!obj[k] && obj[k] !== undefined) && delete obj[k]
    );
    return obj;
  };
  

const searchController  = expressAsyncHandler( async(req, res) => {
    //console.log("req: ", req);
    const booksSearchAndSortParameters = req.body;
    const filteredObject = removeEmptyOrNull(booksSearchAndSortParameters);
    const sortCriteria = filteredObject['sort'];
    delete filteredObject['sort'];
    let searchParams = {
      ...filteredObject
    }
    console.log(searchParams);
    let schemaObject = {};
    Object.keys(searchParams).forEach(param => {
      schemaObject[param] = {
        "$regex": searchParams[param],
        "$options": "i"
      }
    });
    console.log("schemaObject: ", schemaObject);
    const booksList = await Book.find({...schemaObject});
    console.log("booksList: ", booksList);
    //console.log("books list" +booksList);
    if(booksList && sortCriteria)
    {
      console.log("booksList inside if: ", booksList);
      const cmp = { asc: (x, y) => x >= y, dsc: (x, y) => x <= y };
      booksList.sort(cmp[sortCriteria || 'asc']); // [1, 2, 3]
    }
    console.log("booksList: ", booksList);
    let response = {
        message: "Books retrieved",
        success: true,
        books: [ ...booksList ]
    };
   res.send(response);
   //res.send("Search controller");
  })

  

module.exports = {searchController};