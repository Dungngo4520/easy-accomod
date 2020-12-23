import {  Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import 'react-awesome-slider/dist/styles.css'

var property = {
    /*Header */
    title: "",
    address: "", //số nhà- đường (thôn)- phường(thị xã) -quận (huyện)- tỉnh (thành phố)
    nearby: "",// gan dia diem cong cong
    description: "",
    type:"", // Motel, Mini Apartment, Wholehouse, Apartment//loai phong
    numberofrooms: 0,// so phong                 ------------Chưa có biến này trong database----------
    area: 0, // dien tich phong
    sharewithhost:false,// false/true No/Yes
    images:[], // toi thieu 3 hinh

    /*Amenities*/
    privatebathroom: false, //Closed/Shared
    heating: false,

    kitchen: "",//Private/Public/No Cooking

    airconditioning:false,
    balcony: false,

    price: 0,
    electricityprice: "",// Rental Price/Household Price
    waterprice: "", // Rental Price/Household Price
    
    otheramenities:"", // Fridge, Washing Machine, Television,...
    
    
    /* default*/
    occupied: false,
    showuntil: "", // database is date
    owner:"", // database is string id host
    rating: 0,
    status:"", // database is string
    favorites:1, 
    views: 0
};

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
        width: 200,
        border: '1px solid rgba(0, 0, 0, 0.12)',
        padding: 70,
        paddingTop: 35,
        borderRadius:'3px'
    },
  }));


function PostProperty() {
	const classes = useStyles();
	return (
		<div className="postproperty__page" style={{padding:20}}>
            <form className='property__form' className={classes.root}  noValidate style = {{ width: '748px', margin: '0 auto'}}>{/* width =  %? */}
            <h1 style ={{ paddingBottom: 10}}>Room rental registration form </h1>
                <div className="property__header">
                    {/* title */}
                    <TextField
                    variant='outlined'
                    margin='normal'
                    color='secondary'
                    fullWidth
                    id='title'
                    label='Title'
                    name='Title'
                    type='text'
                    autoFocus
                    onChange={(e) => {
                        property.title = e.target.value;
                    }}
                    />

                    {/* address */}
                    <TextField
                    variant='outlined'
                    margin='normal'
                    color='secondary'
                    fullWidth
                    id='address'
                    label='Address(Street-Road-Ward-District-Province)'
                    name='Address'
                    type='text'
                    onChange={(e) => {
                        property.address = e.target.value;
                    }}
                    />

                    {/* nearby */}
                    <TextField
                    variant='outlined'
                    margin='normal'
                    color='secondary'
                    fullWidth
                    id='nearby'
                    label='Near by'
                    name='nearby'
                    type='text'
                    onChange={(e) => {
                        property.nearby = e.target.value;
                    }}
                    />

                    {/* description */}
                    <TextField
                    variant='outlined'
                    margin='normal'
                    color='secondary'
                    fullWidth
                    id='description'
                    label='Description'
                    name='description'
                    type='text'
                    multiline
                    rows={4}
                    onChange={(e) => {
                        property.description = e.target.value;
                    }}
                    />

                    {/* type */}
                    <FormControl variant="outlined"  margin='normal' style = {{width: '32%', marginRight: '3%'}} >
                        <InputLabel fullWidth id="typeinput">Type</InputLabel>   
                        <Select
                        fullWidth
                        id="type"
                        margin='normal'
                        label="Type"
                        color='secondary'
                        onChange={(e) => {
                            property.type = e.target.value;
                        }}
                        >
                            <MenuItem value={'Motel'}>Motel</MenuItem>
                            <MenuItem value={'Mini Apartment'}>Mini Apartment</MenuItem>
                            <MenuItem value={'Wholehouse'}>Wholehouse</MenuItem>
                            <MenuItem value={'Apartment'}>Apartment</MenuItem>
                        </Select>
                    </FormControl>
                    {/* numberofrooms */}
                    <TextField
                    variant='outlined'
                    margin='normal'
                    color='secondary'
                    style = {{width: '32%', marginRight: '3%'}}
                    id='numberofrooms'
                    label='Number of rooms'
                    name='numberofrooms'
                    type='number'
                    onChange={(e) => {
                        property.numberofrooms = e.target.value;
                    }}
                    />
                    
                    {/* area */}
                    <TextField
                    variant='outlined'
                    margin='normal'
                    color='secondary'
                    style = {{width: '30%'}}
                    id='area'
                    label='Area(m2)'
                    name='area'
                    type='number'
                    onChange={(e) => {
                        property.area = e.target.value;
                    }}
                    />

                    {/* sharewithhost */}
                    <FormControl variant="outlined"  margin='normal' style = {{width: '100%'}}>
                        <InputLabel fullWidth id="typeinput">Share with Host</InputLabel>   
                        <Select
                        fullWidth
                        id="sharewithhost"
                        margin='normal'
                        label="sharewithhost"
                        color='secondary'
                        onChange={(e) => {
                            property.sharewithhost = e.target.value;
                        }}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    

                    {/* image */}
                    
                    <label htmlFor="contained-button-file" margin='normal' fullWidth >
                            <input
                            style = {{display: 'none'}}
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            />
                            
                            <Button variant="outlined" color="secondary" component="span" size= "large" >
                            Upload Image 
                                <IconButton color="secondary" >
                                    <PhotoCamera />
                                </IconButton>
                                
                            </Button>
                        </label>
                </div>
                <div className="property__Amenities">
                    {/* privatebathroom: false, //Closed/Shared */}
                    {/* heating: false, */}
                    <FormControl variant="outlined" fullWidth margin='normal' style = {{width: '47%', marginRight: '3%'}}>
                    <InputLabel id="">Bathroom</InputLabel>   
                        <Select
                        id="privatebathroom"
                        margin='normal'
                        label="privatebathroom"
                        color='secondary'
                        onChange={(e) => {
                            property.privatebathroom = e.target.value;
                        }}
                        >
                            <MenuItem value={'Closed'}>Closed</MenuItem>
                            <MenuItem value={'Shared'}>Shared</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" fullWidth margin='normal' style = {{width: '50%'}}>
                        <InputLabel id="">Heating</InputLabel>   
                        <Select
                        id="heating"
                        margin='normal'
                        label="Heating"
                        color='secondary'
                        onChange={(e) => {
                            property.heating = e.target.value;
                        }}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>

                    {/* kitchen: "",//Private/Public/No Cooking */}
                    <FormControl variant="outlined" fullWidth margin='normal'>
                        <InputLabel id="">Kitchen</InputLabel>   
                        <Select
                        id="kitchen"
                        margin='normal'
                        label="kitchen"
                        color='secondary'
                        onChange={(e) => {
                            property.kitchen = e.target.value;
                        }}
                        >
                            <MenuItem value={'Private'}>Private</MenuItem>
                            <MenuItem value={'Public'}>Public</MenuItem>
                            <MenuItem value={'No Cooking'}>No Cooking</MenuItem>
                        </Select>
                    </FormControl>
                    
                    {/* airconditioning:false, */}
                    {/* balcony: false, */}
                    <FormControl variant="outlined" fullWidth margin='normal' style = {{width: '47%', marginRight: '3%'}}>
                        <InputLabel id="">Airconditioning</InputLabel>   
                        <Select
                        id="airconditioning"
                        margin='normal'
                        label="airconditioning"
                        color='secondary'
                        onChange={(e) => {
                            property.airconditioning = e.target.value;
                        }}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" fullWidth margin='normal' style = {{width: '50%'}}>
                        <InputLabel id="">Balcony</InputLabel>   
                        <Select
                        id="balcony"
                        margin='normal'
                        label="balcony"
                        color='secondary'
                        onChange={(e) => {
                            property.balcony = e.target.value;
                        }}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    
                    {/* {price} */}
                    {/* electricityprice: "",// Rental Price/Household Price */}
                    {/* waterprice: "", // Rental Price/Household Price */}
                    
                    <TextField
                        variant='outlined'
                        margin='normal'
                        color='secondary'
                        fullWidth
                        id='price'
                        label='Price($)/Month'
                        name='price'
                        type='number'
                        onChange={(e) => {
                            property.price = e.target.value;
                        }}
                    />

                    <FormControl variant="outlined" fullWidth margin='normal' style = {{width: '47%', marginRight: '3%'}}>
                        <InputLabel id="">Electricity Price</InputLabel>   
                        <Select
                        id="electricityprice"
                        margin='normal'
                        label="electricityprice"
                        color='secondary'
                        onChange={(e) => {
                            property.electricityprice = e.target.value;
                        }}
                        >
                            <MenuItem value={'Rental Price'}>Rental Price</MenuItem>
                            <MenuItem value={'Household Price'}>Household Price</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" fullWidth margin='normal' style = {{width: '50%'}}>
                        <InputLabel id="">Water Price</InputLabel>   
                        <Select
                        id="waterprice"
                        margin='normal'
                        label="waterprice"
                        color='secondary'
                        onChange={(e) => {
                            property.waterprice = e.target.value;
                        }}
                        >
                            <MenuItem value={'Rental Price'}>Rental Price</MenuItem>
                            <MenuItem value={'Household Price'}>Household Price</MenuItem>
                        </Select>
                    </FormControl>

                    
                    
                    {/* otheramenities:"", // Fridge, Washing Machine, Television,... */}

                    <TextField
                        variant='outlined'
                        margin='normal'
                        color='secondary'
                        fullWidth
                        id='otheramenities'
                        label='Other Amenities'
                        name='otheramenities'
                        type='text'
                        onChange={(e) => {
                            property.otheramenities = e.target.value;
                        }}
                    />
                </div>
                

                <Button variant="contained" size="large" color="secondary" fullWidth margin="normal" style={{ marginTop:50}}>
                    Summit
                </Button>
            </form>
        </div>
	)
}

export default PostProperty