### Final project repository for CSCI5709 - Advanced Web Services - Summer 2022

* *Date Created*: 16 June 2022
* *Last Modification Date*: 16 June 2022

## Authors
* [Damandeep Kaur B00904831] - *(Maintainer)*
* [Ali Shan Khawaja B00881685] - *(Maintainer)*
* [Nikita Kothari B00893710] - *(Maintainer)*
* [Sai Chand Kolloju B00897214] - *(Maintainer)*
* [Vanshika Gohel B00888111] - *(Maintainer)*
* [Vignesh Panemangalore Nayak B00882396] - *(Maintainer)*

## Deployment Link
https://libriya.herokuapp.com/login

## csci5709-group-12-final-project Github Link 
Repository Link - 
https://git.cs.dal.ca/kolloju/csci5709-group-12-final-project

### Installing

A step by step series of examples that tell you how to get a development env running using Node.js.

- Navigate to [nodejs.org](https://nodejs.org) and download the installer that says "Recommended for Most Users"
- Install Node.js and it comes bundled with the Node Package Manager (npm).
- To run the application from this assignment code, navigate to the assignment code folder in a terminal and run the following command to install the dependencies required

  ```
  npm install
  ```

- Run the following command to launch the application on localhost port 3000
  ```
  npm start
  ```
## Built With

- [React](https://reactjs.org/) - The frontend framework used
- [Netlify](https://www.netlify.com) - Cloud platform used for deployment

## Additional node dependencies

- [@mui/material](https://mui.com/) - Material UI components made available for use as React Components
- [@mui/icons-material](https://mui.com/material-ui/icons/) - Edit and Delete icons used in the dashboard for each of the books in list


## Sources Used
Mui TextField component library has been used to create the textfields for search dialog form.
Mui TableContainer component library has been used to create the table  for payment page.

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

### File Name searchFormDialog.js
*Lines 92 - 104*

```
<TextField
id="name_search_id"
label="Name"
variant="outlined"
onChange={(event) => {
    handleSearchFeildOnChanges(event, 'bookName');
}}
sx={{
    marginLeft: '10px',
    marginRight: '10px',
    width: 'calc(100% - 20px)',
}}
/>
```
The code above was created by adapting the code in (https://mui.com/material-ui/react-text-field/) as shown below: 

```
Referenced Code
<TextField id="outlined-basic" label="Outlined" variant="outlined" />
```

### File Name latePayment.js
*Lines 128 - 137*

```
 <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4} sx={{fontWeight: 'bold', fontSize: 'large'}}>
                Fine Details
              </TableCell>
            </TableRow>
            <TableRow>
```
The code above was created by adapting the code in (https://mui.com/material-ui/react-table/#SpanningTable.js) as shown below: 

```
Referenced code 
<TableContainer component={Paper}>
```
This code was used to create table for pending fines per book.


### File Name MediaCard.jsx
*Lines 18 - 29*

    <CardActionArea component={Link} to={`/book/${id}`}>
        <CardMedia
          component='img'
          image={thumbnail ?? '/assets/book.jpeg'}
          sx={{
            height: {
              xs: 150,
              md: 200,
            },
            width: { md: '100%' },
          }}
        />
```
The code above was created by adapting the code in (https://mui.com/material-ui/react-card/) as shown below: 
```
Referenced code 
 <CardActionArea component={Link}>
```
This code was used to create card for books.





