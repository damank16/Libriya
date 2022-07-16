// Author: Ali Shan Khawaja|
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Button, Paper, TextareaAutosize } from "@mui/material";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import { Box, width } from "@mui/system";



const CreatePrintRequest =() => {

    const userObject = JSON.parse(localStorage.getItem("LIBRIYA_USER"));
//console.log(userObject.firstName)

let defaultValues = {
    user_name : userObject.firstName,
    user_id: userObject._id,
    name : "",
    description: "",
    width: "",
    height :"",
    Location : ""
}

let defaultErrValues = {
    name : "",
    description: "",
    width: "",
    height :"",
    Location : ""
}

    const navigate = useNavigate();
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
                }else{
                    setErrValues({
                        ...errValues,
                        name: "",
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
                if(target.height < 10 || target.height >100 ){
                    setErrValues({
                        ...errValues,
                        height: "Please Enter width between 10 and 100!",
                        });
                }else{
                    setErrValues({
                        ...errValues,
                        height: "",
                        });
                }
                break;
            case "Location":
                if(target.Location === "" ){
                    setErrValues({
                        ...errValues,
                        Location: "Please select a file!",
                        });
                }else{
                    setErrValues({
                        ...errValues,
                        Location: "",
                        });
                }
                break;
        }
            


    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });

        let targetObj = {
            [name]:value
        }
        errorHandling(targetObj);
        }

      const handleError = (e) => {
        const { name, value } = e.target;
        
        console.log([name] , value);
        return false;
      };

  const handleSubmit = async(event) => {
    
    console.log(errValues);
    console.log(defaultErrValues)
    
    if(errValues.name === defaultErrValues.name &&  errValues.description === defaultErrValues.description 
        && errValues.height === defaultErrValues.height && errValues.width === defaultErrValues.width
        && errValues.Location === defaultErrValues.Location ){
        console.log("No Error Values");
        
        console.log(formValues);
        
         const postResponse = await axios.post('/api/printRequests/'+formValues.user_id,formValues)
          const createRequestResponse = postResponse.data;
         console.log(createRequestResponse)
         if(createRequestResponse.success === true){
             navigate("/printrequest/view")
         }
 
         console.log(createRequestResponse.printRequest)
    }
    
  };
  console.log(formValues);
  const handleReset = async () => {
    setFormValues(defaultValues);
    console.log(formValues)
};

    const handleCancel = async () => {
        navigate("/printrequest/view")
    };
   

    return(
        <Box border={1} height = {675} width={500} margin="20px" padding = "20px"> 
        
        <h2>Create Poster Request</h2>
  
        <TextField
          onChange={handleInputChange}
          value={formValues.name}
          label={"Poster Name"} //optional
          name = "name"
          id = "name"
          variant="outlined"
          required
        />
        <br />
        <span style={{color:"red"}}>{errValues.name}</span>
        <br />
        <br />
        
        <TextField
          onChange={handleInputChange}
          value={formValues.description}
          label="Poster Description" //optional
          placeholder="Poster Description"
          name = "description"
          id = "description"
          type="text"
          rows={4}
          multiline
          variant="outlined"
          required
          
        />
        <br />
        <br />
        <label> Width (in) <br />
        <TextField
           id="width"
           name="width"
           type="number"
           InputProps={{ inputProps: { min: 0, max: 36 } }}
           value={formValues.width}
           onChange={handleInputChange}
           variant="outlined"
           required
        />
        </label>
        <span style={{color:"red"}}>{errValues.width}</span>
        <br />
        <br />
        <label> Height (in) <br />
        <TextField
           id="height"
           name="height"
           type="number"
           InputProps={{ inputProps: { min: 0, max: 100 } }}
           value={formValues.height}
           onChange={handleInputChange}
           variant="outlined"
           required
        />
        <span style={{color:"red"}}>{errValues.height}</span>
        </label>
        <br />
        <br />
        <label>
        Upload Poster PDF
        <br />
        <br />
        <input type="file" id="Location" name="Location" onChange={handleInputChange} accept="application/pdf"  />

        </label>
                
        <br />
        <br />
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
        <br />
        <br />
        <Button onClick={handleReset} variant="contained">Reset</Button>
        &nbsp;  <Button onClick={handleCancel} variant="contained">Cancel</Button>
      
    </Box>
    )


}

export default CreatePrintRequest;