### Libriya - Final project repository for CSCI5709 - Advanced Web Services - Summer 2022

Libriya is a library management web application that provides an interface to access and manage a library. The users can gain insights on the availability of the books in a library and their dues without having to visit the library, reducing the time and effort that demands their physical presence.
Libriya aims to simplify the process of managing libraries and provide a hassle-free online experience for the users that consume the services offered by a library.

- **Date Created**: 10 July 2022
- **Last Modification Date**: 21 July 2022

## Authors
* [Damandeep Kaur B00904831] - *(Maintainer)*
* [Ali Shan Khawaja B00881685] - *(Maintainer)*
* [Nikita Kothari B00893710] - *(Maintainer)*
* [Sai Chand Kolloju B00897214] - *(Maintainer)*
* [Vanshika Gohel B00888111] - *(Maintainer)*
* [Vignesh Panemangalore Nayak B00882396] - *(Maintainer)*

## Links

- Application deployed on Heroku - https://libriya.herokuapp.com/ 
- Project repository (main branch) link - https://git.cs.dal.ca/kolloju/csci5709-group-12-final-project

## Features

1. User management 
2. Managing favorites
3. Study rooms management 
4. Books management 
5. Inventory catalog (Dashboards) 
6. Book check-in/checkout
7. Cart management
8. Advanced filters and sorting
9. Dues management
10. Poster printout management 

## Getting Started

### Prerequisites

To have a local copy of the tutorial 5 code up and running on your local machine, you will first need to install the following software

```
Node.js
```

See the following section for detailed step-by-step instructions on how to install this software

### Installing

A step by step series of examples that tell you how to get a development env running using Node.js.

- Navigate to [nodejs.org](https://nodejs.org) and download the installer that says "Recommended for Most Users"
- Install Node.js and it comes bundled with the Node Package Manager (npm).
- To run the application locally, navigate to the project root folder and the frontend folder, one at a time, in a terminal and run the following command in each of the folders to install the dependencies required

  ```
  npm install
  ```

- Create the following environment variables either by adding a **.env** file in the project root or on the operating system
  
  ```
    MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
    CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
    CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
    CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>
    JWT_SECRET_KEY=<JWT_SECRET>
  ```


- Run the following command to launch the application backend on localhost port 4000 and the application frontend on localhost port 3000
  ```
  npm run dev
  ```

## Folder structure and justifications

The project consists of two main folders:
  - **frontend** - contains the frontend React code
    - Following are the folders inside the **frontend** folder and their purpose:
      - **src** - contains the React source code for the frontend of the project
        - **components** - contains the React components, i.e., user interface fragments that make up a webpage. This folder is split further into subfolders housing the related components. 
        - **pages** - contains the React components that represent a webpage. This folder is split further into subfolders housing the related pages.
        - **utils** - contains the utility functions used by components and pages.
        - **assets** - contains the static assets used by components.
        - **hooks** - contains React hooks used by components.
  - **backend** - contains the backend Node.js code 
    - Following are the folders inside the **backend** folder and their purpose:
      - **config** - contains source files that configure services used in the backend
      - **controllers** - contains request handlers that process the incoming requests
      - **middlwares** - contains middlewares that intercept the incoming requests and process the requests
      - **models** - contains mongoose schemas that represent a schema for a collection on MongoDB
      - **routes** - contains the routers that define the API endpoints and forwards the incoming requests to the controllers
      - **utils** - contains utility functions used by the controllers. This is split further into subfolders based on their purpose
  - We followed this folder structure to ensure that there is a clear separation of the frontend and backend code. The folders are categorized primarily based on the purpose of the source files. We do not have a package.json (node.js project manifest file) inside the backend folder. Instead, it is placed in the project root because the development and deployment scripts written inside the manifest file can be run directly from the project root eliminating the need for complex relative paths in the scripts.

## Built With

- [React](https://reactjs.org/) - The frontend library used
- [Express](https://expressjs.com/) - The backend web framework for Node.js
- [Heroku](https://www.heroku.com) - Cloud platform used for deployment
- [MongoDB Atlas](https://www.mongodb.com/atlas) - MongoDB database on the cloud 

## Additional node dependencies

- [@mui/icons-material](https://mui.com/material-ui/icons/) - Icons package used in the application
- [mongoose](https://mongoosejs.com/) - MongoDB ODM for node.js
- [cloudinary](https://www.npmjs.com/package/cloudinary) - Cloudinary SDK for node.js to upload book thumbnails to Cloudinary cloud
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) - Used to send the errors in the controllers to the default error handler
- [express-validator](https://www.npmjs.com/package/express-validator) - Used to validate the book request body for adding and updating books
- [express-fileupload](https://www.npmjs.com/package/express-fileupload) - Utility that allows the uploaded files to be accessible on the request's **files** property
- [dotenv](https://www.npmjs.com/package/dotenv) - Used to pull environment variables from **.env** files   
- [@mui/material](https://mui.com/) - Material UI components made available for use as React Components
- [axios](https://www.npmjs.com/package/axios) - Http client to make http requests from the frontend
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - Used for routing in the frontend React application
- [uuid](https://www.npmjs.com/package/uuid) - Used for generating unique identifiers
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Used for generating password hashes

### CreatePrintRequest.js

*Lines 24 - 84*

```
const CreatePrintRequest =() => {

    const [formValues, setFormValues] = useState(defaultValues);
    const [errValues, setErrValues] = useState(defaultErrValues);

    const errorHandling = (target) =>{
        console.log(target)
        switch(Object.keys(target)[0]) {
            case "name":
                if(target.name === ""){
                    
                    setErrValues({
                        ...errValues,
                        name: "Please Enter Poster Name!",
                      });
                }
                break;
            case "width":
                if(target.width < 10 || target.width >36 ){
                    setErrValues({
                        ...errValues,
                        width: "Please Enter width between 10 and 36!",
                      });
                }else{
                    setErrValues({
                        ...errValues,
                        width: "",
                      });
                }
                break;
            case "height":
                if(target.value < 10 || target.value >100 ){
                    setErrValues({
                        ...errValues,
                        [target.name]: "Please Enter width between 10 and 100!",
                        });
                }else{
                    setErrValues({
                        ...errValues,
                        [target.name]: "",
                        });
                }
                break;
            case "url":
                if(target.value === "" ){
                    setErrValues({
                        ...errValues,
                        [target.name]: "Please select a file!",
                        });
                }else{
                    setErrValues({
                        ...errValues,
                        [target.name]: "",
                        });
                }
                break;
        }
            


    }

```

The code above was created by adapting the code in (https://thewebdev.info/2021/12/19/how-to-add-form-validation-with-react-and-material-ui/#:~:text=To%20add%20form%20validation%20with%20React%20and%20Material%20UI%2C%20we,to%20show%20the%20error%20message.&text=We%20add%20a%20TextField%20with,to%20show%20the%20inputted%20text.) as shown below: 

```
import React, { useState } from "react";
import { TextField } from "@material-ui/core";

export default function App() {
  const [text, setText] = useState();

  return (
    <div>
      <TextField
        value={text}
        onChange={(event) => setText(event.target.value)}
        error={text === ""}
        helperText={text === "" ? "Empty!" : " "}
      />
    </div>
  );
}

```

- <!---How---> The code in (https://thewebdev.info/2021/12/19/how-to-add-form-validation-with-react-and-material-ui/#:~:text=To%20add%20form%20validation%20with%20React%20and%20Material%20UI%2C%20we,to%20show%20the%20error%20message.&text=We%20add%20a%20TextField%20with,to%20show%20the%20inputted%20text.) was referenced.
- <!---Why---> (https://thewebdev.info/2021/12/19/how-to-add-form-validation-with-react-and-material-ui/#:~:text=To%20add%20form%20validation%20with%20React%20and%20Material%20UI%2C%20we,to%20show%20the%20error%20message.&text=We%20add%20a%20TextField%20with,to%20show%20the%20inputted%20text.)'s Code was used to create validations for form
- <!---How---> (https://thewebdev.info/2021/12/19/how-to-add-form-validation-with-react-and-material-ui/#:~:text=To%20add%20form%20validation%20with%20React%20and%20Material%20UI%2C%20we,to%20show%20the%20error%20message.&text=We%20add%20a%20TextField%20with,to%20show%20the%20inputted%20text.)'s Code was modified by putting in details relavent to our project.


### AdminPrintApproval.js

*Lines 93 - 151*

```
<TableContainer component={Paper} className={classes.tableContainer}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell width={90}>User Name</StyledTableCell>
          <StyledTableCell align="left" width={90}>Poster Name</StyledTableCell>
          <StyledTableCell align="left">Poster Description</StyledTableCell>
          <StyledTableCell align="left">Width</StyledTableCell>
          <StyledTableCell align="left">Height</StyledTableCell>
          <StyledTableCell align="left" width={90}>Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {printRequests.map((row) => (
          <StyledTableRow key={row.user_name}>
            <StyledTableCell component="th" scope="row">
              {row.user_name}
            </StyledTableCell>
            <StyledTableCell align="left">{row.name}</StyledTableCell>
            <StyledTableCell align="left">{row.description}</StyledTableCell>
            <StyledTableCell align="left">{row.width}</StyledTableCell>
            <StyledTableCell align="left">{row.height}</StyledTableCell>
            <StyledTableCell align="left">
                <Button variant="contained" 
                onClick={acceptButtonHandler(row.user_id)} id={"accept"+row.user_id}
                style={{
                maxWidth: "100px",
                maxHeight: "50px",
                minWidth: "100px",
                minHeight: "30px",
                borderRadius: "3px",
                color: "white",
                backgroundColor: "#00D100",
                fontWeight: "bold"
      
        }}>Accept
        </Button>
        &nbsp;
        <Button variant="contained"
        id={"deny"+row.user_id}
        onClick={denyButtonHandler(row.user_id)}
        style={{
          maxWidth: "100px",
          maxHeight: "50px",
          minWidth: "100px",
          minHeight: "30px",
          borderRadius: "3px",
          color: "white",
          backgroundColor: "#FF0000",
          fontWeight: "bold"
        }}>Deny</Button>
                </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

```

The code above was created by adapting the code in (https://mui.com/material-ui/react-table/) as shown below: 

```
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

```

- <!---How---> The code in (https://mui.com/material-ui/react-table/) was referenced.
- <!---Why---> (https://mui.com/material-ui/react-table/)'s Code was used to create table for pending requests
- <!---How---> (https://mui.com/material-ui/react-table/)'s Code was modified by putting in details relavent to our project.


### File Name model.printRequests.js
*Lines 01 - 46*

```
 const { Schema, model } = require('mongoose')


const printRequestSchema = Schema(
    {
        request_id: {
        type: String,
        required: true,
      },
      user_id: {
        type: String,
        required: true,
      },
      user_name: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      Location: {
        type: String,
        required: false,
      },
      isAccepted: {
        type: String,
        default: "",
      },
    },
    { timestamps: true }
  )
  
  module.exports = model('print_requets', printRequestSchema)
 
```
The code above was created by adapting the code in (https://mongoosejs.com/docs/guide.html) as shown below: 

```
import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
```
This code was used to create table scheme for print requests.








