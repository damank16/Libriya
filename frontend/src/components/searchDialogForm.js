import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';



export default function SearchDialogForm(props) {

    const {open,setDialogOpenState /*,handleClickQuery*/ }=props;
    const handleSearchDialogClose = () => setsearchDialogOpen(false);
    const [disableSearch, setDisableSearch] = React.useState(true);
    const handleDisableSearch = () => setDisableSearch(true);
    const [searchFields, setSearchFields] = React.useState({
        bookName: '',
        author: '',
        subject: '',
        publication: '',
        publicationYear: '',
      });  

  
    const handleSearchFeildOnChanges = (event, param) => {
        let obj = {};
        if (param === 'publicationYear')
          event.target.value = event.target.value.replace(/\D/g, '');
        obj[param] = event.target.value;
        console.log(event.target.value);
        setSearchFields((prevSearchFields) => ({
          ...prevSearchFields,
          ...obj,
        }));
      };  

      const searchAction = (event) => {
        console.warn('search action');
        setDialogOpenState(false);
        handleDisableSearch();
        //handleClickQuery();
      };
    

      React.useEffect(() => {
        const disableSearch = Object.values(searchFields).some((searchField) => {
          console.log('searchField: ', searchField);
          if (searchField) {
            return true;
          }
          return false;
        });
        console.log('disableSearch: ', disableSearch);
        setDisableSearch(!disableSearch);
      }, [searchFields]);

      const handleDialogClose = () => {
        setDialogOpenState(false);
      }



    return(
        <Dialog  open={open}  onBackdropClick={handleDialogClose}>
        <DialogTitle id="search_dialog_title_id">
          {'Search Books'}
        </DialogTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Code Attribution 1*/}
            {/* [URL]:hhttps://mui.com/material-ui/react-text-field/ */}
            <TextField
              id="author_search_id"
              label="Author"
              variant="outlined"
              onChange={(event) => {
                handleSearchFeildOnChanges(event, 'author');
              }}
              sx={{
                marginLeft: '10px',
                marginRight: '10px',
                width: 'calc(100% - 20px)',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="subject_search_id"
              label="Subject"
              variant="outlined"
              onChange={(event) => {
                handleSearchFeildOnChanges(event, 'subject');
              }}
              sx={{
                marginLeft: '10px',
                marginRight: '10px',
                width: 'calc(100% - 20px)',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="publication_search_id"
              label="Publication"
              variant="outlined"
              onChange={(event) => {
                handleSearchFeildOnChanges(event, 'publication');
              }}
              sx={{
                marginLeft: '10px',
                marginRight: '10px',
                width: 'calc(100% - 20px)',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="publication_year_search_id"
              label="Publication Year (YYYY)"
              variant="outlined"
              //type="number"
              inputProps={{ maxLength: 4 }}
              // inputProps={{  }}
              onChange={(event) => {
                handleSearchFeildOnChanges(event, 'publicationYear');
              }}
              sx={{
                marginLeft: '10px',
                marginRight: '10px',
                width: 'calc(100% - 20px)',
              }}
            />
          </Grid>
        </Grid>
        <br />
        <Typography
          sx={{
            marginLeft: '10px',
            marginRight: '10px',
            width: 'calc(100% - 20px)',
          }}
        >
          Sort By
        </Typography>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{
            marginLeft: '10px',
            marginRight: '10px',
            width: 'calc(100% - 20px)',
          }}
        >
          <FormControlLabel
            value="name"
            control={<Radio />}
            label="Name"
            onChange={(event) => {
              handleSortFeildOnChanges(event, 'bookName');
            }}
          />
          <FormControlLabel
            value="author"
            control={<Radio />}
            label="Author"
            onChange={(event) => {
              handleSortFeildOnChanges(event, 'author');
            }}
          />
          <FormControlLabel
            value="publication_year"
            control={<Radio />}
            label="Publication Year"
            onChange={(event) => {
              handleSortFeildOnChanges(event, 'publicationYear');
            }}
          />
        </RadioGroup>
        <DialogActions>
          <Button disabled={disableSearch} onClick={searchAction}>
            Search
          </Button>
        </DialogActions>
      </Dialog>
    );
};