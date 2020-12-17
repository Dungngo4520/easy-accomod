/* eslint-disable no-throw-literal */
import React, { useCallback, useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Redirect, useHistory } from 'react-router-dom'
import './style/SignIn.css'
import { AuthContext } from './Auth'
import app from './firebase'

export default function SignIn() {
	const history = useHistory()
	const [error, setError] = useState('')
	const [open, setOpen] = useState(true)
	const { currentUser } = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

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
				if (email === '') {
					throw 'Email is required'
				}
				await app.auth().signInWithEmailAndPassword(email, password)
				history.push('/')
			} catch (error) {
				setError(typeof error === 'object' ? error.message : error)
				setOpen(true)
			}
		},
		[email, history, password]
	)

	if (currentUser) {
		return <Redirect to='/' />
	}

	return (
		<Container component='main' maxWidth='xs'>
			<div className='signin'>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form className='signin__form' noValidate>
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
					<TextField
						color='secondary'
						variant='outlined'
						margin='normal'
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
					<FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
					<div className='signinForm__submitArea'>
						<Button
							fullWidth
							variant='contained'
							color='secondary'
							className='submit'
							onClick={handleLogin}>
							Sign In
						</Button>
						<Button fullWidth variant='contained' color='secondary' className='submit'>
							Sign In as Host
						</Button>
					</div>
					<div className='form__moreOption'>
						<Typography className='form__forgot' component='h1' variant='h5'>
							<Link color='textSecondary' variant='body2'>
								{'Forgot Password?'}
							</Link>
						</Typography>
						<Typography className='form__redirect' component='h1' variant='h5'>
							<Link
								color='textSecondary'
								onClick={() => {
									history.push('/signup')
								}}
								variant='body2'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Typography>
					</div>
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
