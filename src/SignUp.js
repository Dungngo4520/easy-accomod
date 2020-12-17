/* eslint-disable no-throw-literal */
import React, { useCallback, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import MuiAlert from '@material-ui/lab/Alert'
import { Paper, Snackbar, Tab, Tabs } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import './style/SignUp.css'
import app from './firebase'

export default function SignUp() {
	const history = useHistory()

	const [role, setRole] = useState('customer')
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [address, setAddress] = useState('')
	const [id, setId] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(true)

	const handleChange = (event, value) => {
		setRole(value)
	}

	const handleSignUp = useCallback(
		async (event) => {
			const regexVietnamese = /\d|[^\w\saAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]/

			event.preventDefault()

			try {
				if (lname === '' || fname === '') {
					throw 'Name is required'
				} else if (regexVietnamese.test(lname) || regexVietnamese.test(fname)) {
					throw 'Name is badly formatted'
				}
				if (role === 'host') {
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
				setError('')
				setLoading(true)
				await app.auth().createUserWithEmailAndPassword(email, password)
				history.push('/')
			} catch (error) {
				setError(typeof error === 'object' ? error.message : error)
				setOpen(true)
			}
			setLoading(false)
		},
		[address, confirmPassword, email, fname, history, id, lname, password, phone, role]
	)

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	return (
		<Container component='main' maxWidth='xs'>
			<div className='signup'>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<Paper className='form__selection'>
					<Tabs
						value={role}
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
						{role === 'host' ? (
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
						disabled={loading}
						fullWidth
						variant='contained'
						color='secondary'
						className='signup__btn'
						onClick={handleSignUp}>
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
			{error !== '' ? (
				<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
					<MuiAlert elevation={6} severity='error'>
						{error}
					</MuiAlert>
				</Snackbar>
			) : (
				''
			)}
		</Container>
	)
}
