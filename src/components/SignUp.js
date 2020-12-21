/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useCallback, useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Paper, Tab, Tabs } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import '../style/SignUp.css'
import { db } from '../firebase'
import { AuthContext } from './Auth'
import firebase from 'firebase'

export default function SignUp() {
	const history = useHistory()

	const { signUp, signUpAsHost, showError, setRole } = useContext(AuthContext)
	const [selection, setSelection] = useState('customer')
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [address, setAddress] = useState('')
	const [id, setId] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const validate = () => {
		const regexVietnamese = /\d|[^\w\saAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]/

		if (lname === '' || fname === '') {
			throw 'Name is required'
		} else if (regexVietnamese.test(lname) || regexVietnamese.test(fname)) {
			throw 'Name is badly formatted'
		}
		if (selection === 'host') {
			if (address === '') {
				throw 'Address is required'
			}
			if (id === '') {
				throw 'ID number is required'
			} else if (/\D/.test(id) || (id.length !== 9 && id.length !== 12)) {
				throw 'ID number is badly formatted'
			}
		}
		if (phone === '') {
			throw 'Phone number is required'
		} else if (/\D/.test(phone) || phone.length !== 10) {
			throw 'Phone number is badly formatted'
		}
		if (email === '') {
			throw 'Email is required'
		}
		if (password !== confirmPassword) {
			throw 'Password does not match'
		}
	}

	const handleSignUp = useCallback(
		async (event) => {
			event.preventDefault()
			try {
				validate()
				await signUp(email, password)
				await db.collection('users').add({
					email: email,
					firstname: fname,
					lastname: lname,
					phone: phone,
				})
				setRole('user')
				showError('User is created. Redirect to Home', true)
				setTimeout(() => {
					history.push('/')
				}, 1000)
			} catch (error) {
				showError(typeof error === 'object' ? error.message : error, false)
			}
		},
		[email, history, password, showError, signUp, validate]
	)

	const handleSignUpAsHost = useCallback(
		async (event) => {
			event.preventDefault()
			try {
				validate()
				await signUpAsHost(email, password)
				await db.collection('owners').add({
					about: '',
					address: address,
					dateofbirth: firebase.firestore.FieldValue.serverTimestamp(),
					email: email,
					firstname: fname,
					lastname: lname,
					govid: id,
					male: true,
					phone: phone,
					verified: false,
				})
				setRole('owner')
				showError('User is created. Redirecting to Home', true)
				setTimeout(() => {
					history.push('/')
				}, 1000)
			} catch (error) {
				showError(typeof error === 'object' ? error.message : error, false)
			}
		},
		[email, history, password, showError, signUp, validate]
	)

	const handleChange = (event, value) => {
		setSelection(value)
	}

	return (
		<Container component='main' maxWidth='xs'>
			<div className='signup'>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<Paper className='form__selection'>
					<Tabs
						value={selection}
						onChange={handleChange}
						variant='fullWidth'
						indicatorColor='secondary'
						textColor='secondary'
						centered>
						<Tab label='As Customer' value={'customer'} />
						<Tab label='As Host' value={'host'} />
					</Tabs>
				</Paper>
				<form className='signup__form'>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								color='secondary'
								autoComplete='fname'
								name='firstName'
								variant='outlined'
								required
								fullWidth
								id='firstName'
								label='First Name'
								autoFocus
								value={fname}
								onChange={(e) => {
									setFname(e.target.value)
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								color='secondary'
								variant='outlined'
								required
								fullWidth
								id='lastName'
								label='Last Name'
								name='lastName'
								autoComplete='lname'
								value={lname}
								onChange={(e) => [setLname(e.target.value)]}
							/>
						</Grid>
						{selection === 'host' ? (
							<>
								<Grid item xs={12}>
									<TextField
										color='secondary'
										variant='outlined'
										required
										fullWidth
										id='address'
										label='Address'
										name='address'
										autoComplete='address'
										value={address}
										onChange={(e) => {
											setAddress(e.target.value)
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										color='secondary'
										variant='outlined'
										required
										fullWidth
										id='governmentID'
										label='Government ID'
										name='governmentID'
										autoComplete='governmentID'
										value={id}
										onChange={(e) => {
											setId(e.target.value)
										}}
									/>
								</Grid>
							</>
						) : (
							''
						)}

						<Grid item xs={12}>
							<TextField
								color='secondary'
								variant='outlined'
								required
								fullWidth
								id='phone'
								label='Phone Number'
								name='phone'
								autoComplete='phone'
								value={phone}
								onChange={(e) => [setPhone(e.target.value)]}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								color='secondary'
								variant='outlined'
								required
								fullWidth
								id='email'
								type='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								value={email}
								onChange={(e) => {
									setEmail(e.target.value)
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								color='secondary'
								variant='outlined'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								value={password}
								onChange={(e) => {
									setPassword(e.target.value)
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								color='secondary'
								variant='outlined'
								required
								fullWidth
								name='confirm-password'
								label='Confirm Password'
								type='password'
								id='confirm-password'
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value)
								}}
							/>
						</Grid>
					</Grid>
					<Button
						fullWidth
						variant='contained'
						color='secondary'
						className='signup__btn'
						onClick={selection === 'customer' ? handleSignUp : handleSignUpAsHost}>
						Sign Up
					</Button>
					<Typography className='form__redirect' component='h1' variant='h5'>
						<Link
							color='textSecondary'
							onClick={() => {
								history.push('/signin')
							}}
							variant='body2'>
							{'Already have an account? Sign in'}
						</Link>
					</Typography>
				</form>
			</div>
		</Container>
	)
}
