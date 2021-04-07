/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-throw-literal */
import {
	Button,
	CardMedia,
	FormControl,
	IconButton,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
import 'react-awesome-slider/dist/styles.css'
import { useHistory } from 'react-router-dom'
import { AuthContext } from './Auth'
import { db, storage } from '../firebase'
import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(0),
		width: 200,
		border: '1px solid rgba(0, 0, 0, 0.12)',
		padding: 70,
		paddingTop: 35,
		borderRadius: '3px',
	},
}))

function PostProperty() {
	const classes = useStyles()
	const history = useHistory()
	const { showError, loadFromLocalStorage } = useContext(AuthContext)
	const role = loadFromLocalStorage('role')
	const userData = loadFromLocalStorage('userdata')
	const [property, setProperty] = useState({
		/*Header */
		title: '', //(bat buoc)
		address: '', //(bat buoc)số nhà- đường (thôn)- phường(thị xã) -quận (huyện)- tỉnh (thành phố)
		nearby: '', // gan dia diem cong cong
		description: '',
		type: '', //(bat buoc)Motel, Mini Apartment, Wholehouse, Apartment//loai phong
		rooms: 0, // so phong
		area: 0, // dien tich phong
		sharewithhost: null, // false/true No/Yes
		images: [], // toi thieu 3 hinh

		/*Amenities*/
		privatebathroom: null, //(bat buoc)Closed/Shared
		heating: null, //(bat buoc)

		kitchen: '', //(bat buoc)Private/Public/No Cooking

		airconditioning: null, //(bat buoc)
		balcony: null, //(bat buoc)

		price: 0,
		electricityprice: '', // Rental Price/Household Price
		waterprice: '', // Rental Price/Household Price

		otheramenities: '', // Fridge, Washing Machine, Television,...
		/* default*/
		occupied: false,
		showuntil: firebase.firestore.Timestamp.fromDate(new Date('1/1/2022')), // database is date
		owner: `/${role}s/${userData.id}`,
		rating: 0,
		status: 'verified', // database is string
		favorites: 0,
		views: 0,
	})

	const handleForm = async () => {
		try {
			if (property.title === '') throw 'Title is required'
			if (property.address === '') throw 'Address is required'
			if (property.type === '') throw 'Type is required'
			if (property.privatebathroom === null) throw 'Bathroom is required'
			if (property.heating === null) throw 'Heating is required'
			if (property.kitchen === '') throw 'Kitchen is required'
			if (property.airconditioning === null) throw 'Airconditioning is required'
			if (property.balcony === null) throw 'Balcony is required'
			await db
				.collection('properties')
				.add(property)
				.then((addItem) => {
					db.collection(`${role}s`)
						.doc(userData.id)
						.collection('properties')
						.add({
							image: property.images[0],
							property: `/properties/${addItem.id}`,
							timeposted: firebase.firestore.FieldValue.serverTimestamp(),
							title: property.title,
							verified: true,
						})
				})
			history.push('/account')
		} catch (error) {
			showError(typeof error === 'object' ? error.message : error, false)
		}
		console.log(property)
	}

	const handleUploadImages = async (event) => {
		try {
			const fileUploaded = event.target.files[0]
			const fileSize = (fileUploaded.size / 1024 / 1024).toFixed(1)
			if (fileSize > 5) {
				throw 'File upload is too big'
			}
			const newName = firebase.firestore.Timestamp.now()['seconds'] + fileUploaded.name
			const fileRenamed = new File([fileUploaded], newName)
			await storage
				.ref(`images/${newName}`)
				.put(fileRenamed)
				.on(
					'state_changed',
					(snapshot) => {
						const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
						showError(`Uploading ${progress}%`, true)
					},
					function (error) {},
					async function () {
						await storage
							.ref('images')
							.child(newName)
							.getDownloadURL()
							.then((url) => {
								setProperty((property) => {
									const uploadimages = [...property.images, url]
									return { ...property, images: uploadimages }
								})
							})
					}
				)
		} catch (error) {
			showError(typeof error === 'object' ? error.message : error, false)
		}
		event.target.value = null
	}

	return (
		<div className='postproperty__page' style={{ padding: 20 }}>
			<form
				className='property__form'
				className={classes.root}
				noValidate
				style={{ width: '748px', margin: '0 auto' }}>
				{/* width =  %? */}
				<h1 style={{ paddingBottom: 10 }}>Add new property</h1>
				<div className='property__header'>
					{/* title */}
					<TextField
						variant='outlined'
						margin='normal'
						color='secondary'
						fullWidth
						id='title'
						label='Title*'
						name='title'
						type='text'
						autoFocus
						value={property.title}
						onChange={(e) => {
							setProperty({ ...property, [e.target.name]: e.target.value })
						}}
					/>

					{/* address */}
					<TextField
						variant='outlined'
						margin='normal'
						color='secondary'
						fullWidth
						id='address'
						label='Address(Street-Road-Ward-District-Province)*'
						name='address'
						type='text'
						value={property.address}
						onChange={(e) => {
							setProperty({ ...property, [e.target.name]: e.target.value })
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
							setProperty({ ...property, [e.target.name]: e.target.value })
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
							setProperty({ ...property, [e.target.name]: e.target.value })
						}}
					/>

					{/* type */}
					<FormControl variant='outlined' margin='normal' style={{ width: '32%', marginRight: '3%' }}>
						<InputLabel fullWidth id='typeinput'>
							Type*
						</InputLabel>
						<Select
							fullWidth
							id='type'
							margin='normal'
							label='Type'
							color='secondary'
							name='type'
							onChange={(e) => {
								setProperty({ ...property, [e.target.name]: e.target.value })
							}}>
							<MenuItem value={'Motel'}>Motel</MenuItem>
							<MenuItem value={'Mini Apartment'}>Mini Apartment</MenuItem>
							<MenuItem value={'Wholehouse'}>Wholehouse</MenuItem>
							<MenuItem value={'Apartment'}>Apartment</MenuItem>
						</Select>
					</FormControl>
					{/* numberofrooms */}
					{property.type === 'Apartment' ? (
						<TextField
							variant='outlined'
							margin='normal'
							color='secondary'
							style={{ width: '32%', marginRight: '3%' }}
							id='rooms'
							label='Number of rooms'
							name='rooms'
							type='number'
							onChange={(e) => {
								setProperty({ ...property, [e.target.name]: e.target.value })
							}}
						/>
					) : (
						''
					)}

					{/* area */}
					<TextField
						variant='outlined'
						margin='normal'
						color='secondary'
						style={{ width: '30%' }}
						id='area'
						label='Area(m2)'
						name='area'
						type='number'
						onChange={(e) => {
							setProperty({ ...property, [e.target.name]: e.target.value })
						}}
					/>

					{/* sharewithhost */}
					<FormControl variant='outlined' margin='normal' style={{ width: '100%' }}>
						<InputLabel fullWidth id='typeinput'>
							Share with Host
						</InputLabel>
						<Select
							fullWidth
							id='sharewithhost'
							margin='normal'
							label='sharewithhost'
							color='secondary'
							name='sharewithhost'
							onChange={(e) => {
								setProperty({ ...property, [e.target.name]: e.target.value })
							}}>
							<MenuItem value={true}>Yes</MenuItem>
							<MenuItem value={false}>No</MenuItem>
						</Select>
					</FormControl>

					{/* image */}

					<label htmlFor='contained-button-file' margin='normal' fullWidth>
						<input
							style={{ display: 'none' }}
							accept='image/*'
							id='contained-button-file'
							type='file'
							onChange={handleUploadImages}
						/>

						<Button variant='outlined' color='secondary' component='span' size='large'>
							Upload Image
							<IconButton color='secondary'>
								<PhotoCamera />
							</IconButton>
						</Button>
						<div
							className='properties__images'
							style={{ width: '100px', paddingTop: '1rem', display: 'flex' }}>
							{property.images.map((image) => (
								<CardMedia style={{ marginRight: '0.5rem' }} component='img' src={image} />
							))}
						</div>
					</label>
				</div>
				<div className='property__Amenities'>
					{/* privatebathroom: false, //Closed/Shared */}
					{/* heating: false, */}
					<FormControl
						variant='outlined'
						fullWidth
						margin='normal'
						style={{ width: '47%', marginRight: '3%' }}>
						<InputLabel id=''>Bathroom*</InputLabel>
						<Select
							id='privatebathroom'
							margin='normal'
							label='privatebathroom'
							color='secondary'
							name='privatebathroom'
							onChange={(e) => {
								setProperty({ ...property, [e.target.name]: e.target.value })
							}}>
							<MenuItem value={'Closed'}>Closed</MenuItem>
							<MenuItem value={'Shared'}>Shared</MenuItem>
						</Select>
					</FormControl>

					<FormControl variant='outlined' fullWidth margin='normal' style={{ width: '50%' }}>
						<InputLabel id=''>Heating*</InputLabel>
						<Select
							id='heating'
							margin='normal'
							label='Heating'
							color='secondary'
							name='heating'
							onChange={(e) => {
								setProperty({ ...property, [e.target.name]: e.target.value })
							}}>
							<MenuItem value={true}>Yes</MenuItem>
							<MenuItem value={false}>No</MenuItem>
						</Select>
					</FormControl>

					{/* kitchen: "",//Private/Public/No Cooking */}
					<FormControl variant='outlined' fullWidth margin='normal'>
						<InputLabel id=''>Kitchen*</InputLabel>
						<Select
							id='kitchen'
							margin='normal'
							label='kitchen'
							color='secondary'
							name='kitchen'
							onChange={(e) => {
								setProperty({ ...property, [e.target.name]: e.target.value })
							}}>
							<MenuItem value={'Private'}>Private</MenuItem>
							<MenuItem value={'Public'}>Public</MenuItem>
							<MenuItem value={'No Cooking'}>No Cooking</MenuItem>
						</Select>
					</FormControl>

					{/* airconditioning:false, */}
					{/* balcony: false, */}
					<FormControl
						variant='outlined'
						fullWidth
						margin='normal'
						style={{ width: '47%', marginRight: '3%' }}>
						<InputLabel id=''>Airconditioning*</InputLabel>
						<Select
							id='airconditioning'
							margin='normal'
							label='airconditioning'
							color='secondary'
							name='airconditioning'
							onChange={(e) => {
								setProperty({ ...property, [e.target.name]: e.target.value })
							}}>
							<MenuItem value={true}>Yes</MenuItem>
							<MenuItem value={false}>No</MenuItem>
						</Select>
					</FormControl>

					<FormControl variant='outlined' fullWidth margin='normal' style={{ width: '50%' }}>
						<InputLabel id=''>Balcony*</InputLabel>
						<Select
							id='balcony'
							margin='normal'
							label='balcony'
							color='secondary'
							name='balcony'
							onChange={(e) => {
								setProperty({ ...property, [e.target.name]: e.target.value })
							}}>
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
							setProperty({ ...property, [e.target.name]: e.target.value })
						}}
					/>

					<FormControl
						variant='outlined'
						fullWidth
						margin='normal'
						style={{ width: '47%', marginRight: '3%' }}>
						<InputLabel id=''>Electricity Price</InputLabel>
						<Select
							id='electricityprice'
							margin='normal'
							label='electricityprice'
							color='secondary'
							name='electricityprice'
							onChange={(e) => {
								setProperty({ ...property, [e.target.name]: e.target.value })
							}}>
							<MenuItem value={'Rental Price'}>Rental Price</MenuItem>
							<MenuItem value={'Household Price'}>Household Price</MenuItem>
						</Select>
					</FormControl>

					<FormControl variant='outlined' fullWidth margin='normal' style={{ width: '50%' }}>
						<InputLabel id=''>Water Price</InputLabel>
						<Select
							id='waterprice'
							margin='normal'
							label='waterprice'
							color='secondary'
							name='waterprice'
							onChange={(e) => {
								setProperty({ ...property, [e.target.name]: e.target.value })
							}}>
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
							setProperty({ ...property, [e.target.name]: e.target.value })
						}}
					/>
				</div>

				<Button
					variant='contained'
					size='large'
					color='secondary'
					fullWidth
					margin='normal'
					style={{ marginTop: 50 }}
					onClick={handleForm}>
					Summit
				</Button>
			</form>
		</div>
	)
}

export default PostProperty
