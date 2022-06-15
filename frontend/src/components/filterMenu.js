import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { customTheme } from './customTheme';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SearchDialogForm from './searchFormDialog';
import SearchIcon from '@mui/icons-material/Search';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '90vh',
  lineHeight: '60px',
  // width: '100%'
}));

const lightTheme = customTheme;

export default function Filter({ setChecked, checked }) {
  const [searchDialogOpen, setsearchDialogOpen] = React.useState(false);
  const handleSearchDialogOpen = () => setsearchDialogOpen(true);
  // create array of objects with label, id, type and size
  const filterOptions = [
    {
      label: 'Book Name',
      ariaLabel: 'Book Name',
      id: 'book_name',
      type: 'text',
      size: 'small',
    },
    {
      label: 'Author',
      ariaLabel: 'Author',
      id: 'author',
      type: 'text',
      size: 'small',
    },
    {
      label: 'Subject',
      ariaLabel: 'Subject',
      id: 'subject',
      type: 'text',
      size: 'small',
    },
    {
      label: 'Publication',
      ariaLabel: 'Publication',
      id: 'publication',
      type: 'text',
      size: 'small',
    },
    {
      label: 'Publication Year (YYYY)',
      ariaLabel: 'Publication Year',
      id: 'publicationYear',
      type: 'text',
      size: 'small',
    },
  ];

  
  const initialFiltersState = {
    book_name: '',
    author: '',
    subject: '',
    publication: '',
    publicationYear: ''
    
  };

  const initialSortState = {
    bookName: false,
    author: false,
    publicationYear: false,
  };

  const [sortMethod, setSortMethod] = React.useState('');

  const  handleSort = (event) => {
    if (event.target.value === sortMethod) {
      setSortMethod('');
    } else {
      setSortMethod(event.target.value);
    }
  }

  const [filterParams, setFilterParams] = React.useState({
    ...initialFiltersState
  });

  const [sortParameters, setSortingParameters] = React.useState({
   ...initialSortState
  });


  const handleSearch = (event) => {
    

  };

  const handleSearchFeildOnChanges = (event, param) => {
    let obj = {};
    if (param === 'publicationYear')
      event.target.value = event.target.value.replace(/\D/g, '');
    obj[param] = event.target.value;
    console.log(event.target.value);
    setFilterParams({
      ...filterParams,
      ...obj,
    });
  };


  const resetFilters = (e) => {
    if (e) {
      e.preventDefault();
    }
    setFilterParams({
      ...initialFiltersState
    });

    setSortMethod('');
     
    // dispatch(filterProperties({
    //   filterParams: {}
    // }));
  }

  const getFilterTextFieldsProps = (filter) => {
    let props = {
      key: filter.id,
      id: filter.id,
      label: filter.label,
      type: filter.type,
      size: filter.size,
      value: filterParams[filter.id],
      onChange : (event) => {
        handleSearchFeildOnChanges(event, filter.id);
      },
      sx: {
        m: 2,
        width: "calc(100% - 16px)"
      },
    };
    if (filter.id === 'publicationYear') {
      props['inputProps'] = {maxLength: 4 };
    }
    return props;

  };

  const disableSearchButton = () => {
    return Object.values(filterParams).every(x => x === null || x === '');
  };

  const getTextFields = (filterOptions) => {
    return <Box sx={{ 
      p: 2,
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      height: 'calc(100% - 32px)'
    }}>
      { filterOptions.map((option) => {
            return (<TextField 
              {...getFilterTextFieldsProps(option)}
            />)})
      }
       <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
          marginLeft: '16px'
        }}>
        <Typography color="#000" sx={{
          flexFlow: 'row' }} variant="h6">
          Sort Results By
        </Typography>
      </Box>

      <div style={
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: '10px',
          width: '100%'
        }
      }>
         <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                sx={{
                  marginLeft: '10px',
                  marginRight: '10px',
                  width: 'calc(100% - 20px)',
                }}
                value={sortMethod}
              >
                <FormControlLabel
                  value= "Name"
                  control={<Radio onClick={handleSort}/>}
                  label="Name"
                />
                <FormControlLabel
                  value="Author"
                  control={<Radio onClick={handleSort}/>}
                  label="Author"
                />
                <FormControlLabel
                  value="Publication Year"
                  control={<Radio onClick={handleSort} />}
                  label="Publication Year"
                />
              </RadioGroup>

      </div>
  
      <div style={
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: '10px',
          width: '70%'
        }
      }>
        <Button disabled={disableSearchButton()} variant="contained" onClick={(e) => { handleSearch(e) }}>Search</Button>
        <Button variant="contained" onClick={(e) => { resetFilters(e) }}>Reset</Button>
      </div>

    </Box>
  };
  return (
<>
  <Grid container spacing={2} sx={{
    display:{ md:'flex', xs: 'none'},
    flexFlow: 'row',
    justifyContent: 'flex-start',
    maxWidth: '300px'}}>
    {[lightTheme].map((theme, index) => (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={index}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              p: 0,
              bgcolor: 'background.default',
              display: 'grid',
              gap: 2,
            }}
          >
            
            {[24].map((elevation) => (
              <Item key={elevation} elevation={elevation}>
                
                <Box sx={{ p: 2, height: 'calc(100% - 32px)', overflow: 'auto' }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    {checked ? <Typography color="#000" sx={{ pl: 3 }} variant="h6">
                      Advanced Filters
                    </Typography> : null}
                  </Box>
                  {checked ? getTextFields(filterOptions) : null}

                </Box>
              </Item>
            ))}
          </Box>
        </ThemeProvider>
      </Grid>
    ))}
  </Grid>

  {/* <SearchIcon sx={{
            display:{ sx:'flex', md: 'none'} }} onClick={handleSearchDialogOpen} />
  <SearchDialogForm open={searchDialogOpen}  
  // onClose={setsearchDialogOpen}
  setDialogOpenState={setsearchDialogOpen}
  //handleClickQuery  = {handleClickQuery}
  /> */}
</>
  );
}
