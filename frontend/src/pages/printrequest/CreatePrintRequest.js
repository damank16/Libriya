import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Button, Paper, TextareaAutosize } from "@mui/material";

import { Box, width } from "@mui/system";


let defaultValues = {
    name : "",
    description: "",
    width: 0,
    height :0,
    url : ""
}

let defaultErrValues = {
    name : "",
    description: "",
    width: "",
    height :"",
    url : ""
}

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

  const handleSubmit = () => {
    console.log(formValues);


  };
  const handleReset = async () => {
    setFormValues(defaultValues);
    console.log(formValues)
};

    const handleCancel = async () => {
        setFormValues(defaultValues);
        console.log(formValues)
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

        </label>
        <br />
        <br />
        <label>
        Upload Poster PDF
        <br />
        <br />
        <input type="file" id="url" name="url" accept="application/pdf" />

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