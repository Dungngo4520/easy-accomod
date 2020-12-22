/* eslint-disable no-throw-literal */
import React, { useCallback, useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Redirect, useHistory } from 'react-router-dom'
import { AuthContext } from './Auth'
import { auth } from '../firebase'
import '../style/ForgotPassword.css'

export default function SignIn() {
	const history = useHistory()
	const [error, setError] = useState('')
	const [open, setOpen] = useState(true)
	const { currentUser } = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [success, setSuccess] = useState(false)

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	const handleLogin = useCallback(
		async (event) => {
			event.preventDefault()
			try {
				setOpen(false)
				setSuccess(false)
				if (email === '') {
					throw 'Email is required'
				}
				await auth.sendPasswordResetEmail(email)
				setSuccess(true)
				setError('Check your email to reset your password')
				setOpen(true)
			} catch (error) {
				setError(typeof error === 'object' ? error.message : error)
				setOpen(true)
			}
		},
		[email]
	)

	if (currentUser) {
		return <Redirect to='/' />
	}

	return (
		<Container component='main' maxWidth='xs'>
			<div className='forgot'>
				<Typography component='h1' variant='h5'>
					Reset Password
				</Typography>
				<form className='forgot__form' noValidate>
					<div className='forgotForm__submitArea'>
						<TextField
							variant='outlined'
							margin='normal'
							color='secondary'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							type='email'
							autoComplete='email'
							autoFocus
							value={email}
							onChange={(e) => {
								setEmail(e.target.value)
							}}
						/>
						<Button
							disableElevation
							fullWidth
							variant='contained'
							color='secondary'
							className='submit'
							onClick={handleLogin}>
							Reset Password
						</Button>
					</div>
					<div className='form__moreOption'>
						<Typography className='form__redirect' component='h1' variant='h3'>
							<Link
								color='textSecondary'
								onClick={() => {
									history.push('/signup')
								}}
								variant='body2'>
								{'Sign Up'}
							</Link>
						</Typography>
						<Typography className='form__redirect' component='h1' variant='h3'>
							<Link
								color='textSecondary'
								onClick={() => {
									history.push('/signin')
								}}
								variant='body2'>
								{'Sign In'}
							</Link>
						</Typography>
					</div>
				</form>
			</div>
			{error !== '' ? (
				<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
					<MuiAlert elevation={6} severity={success ? 'success' : 'error'}>
						{error}
					</MuiAlert>
				</Snackbar>
			) : (
				''
			)}
		</Container>
	)
}
