/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useHistory } from 'react-router-dom'
import '../style/SignIn.css'
import { AuthContext } from './Auth'

export default function SignIn(props) {
	const history = useHistory()
	const { currentUser, role, signIn, signInAsHost, showError } = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { from } = props.location.state || { from: { pathname: '/' } }

	const validate = () => {
		if (email === '') {
			throw 'Email is required'
		}
	}

	const handleSignIn = useCallback(
		async (event) => {
			event.preventDefault()
			try {
				validate()
				await signIn(email, password)
				showError('User Signed In', true)
				setTimeout(() => {
					history.push(from)
				}, 1000)
			} catch (error) {
				showError(typeof error === 'object' ? error.message : error, false)
			}
		},
		[email, from, history, password, showError, signIn, validate]
	)
	const handleSignInAsHost = useCallback(
		async (event) => {
			event.preventDefault()
			try {
				if (email === '') {
					throw 'Email is required'
				}
				await signInAsHost(email, password)
				showError('User Signed In', true)
				setTimeout(() => {
					history.push(from)
				}, 200)
			} catch (error) {
				showError(typeof error === 'object' ? error.message : error, false)
			}
		},
		[email, from, history, password, showError, signInAsHost]
	)

	useEffect(() => {
		if (currentUser) {
			showError('User Signed In', true)
			setTimeout(() => {
				history.push(from)
			}, 1000)
		}
	}, [currentUser, from, history, role, showError])

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
					<div className='signinForm__submitArea'>
						<Button
							fullWidth
							variant='contained'
							color='secondary'
							className='submit'
							onClick={handleSignIn}>
							Sign In
						</Button>
						<Button
							fullWidth
							variant='contained'
							color='secondary'
							className='submit'
							onClick={handleSignInAsHost}>
							Sign In as Host
						</Button>
					</div>
					<div className='form__moreOption'>
						<Typography className='form__forgot' component='h1' variant='h5'>
							<Link
								color='textSecondary'
								variant='body2'
								onClick={() => {
									history.push('/forgot')
								}}>
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
		</Container>
	)
}
