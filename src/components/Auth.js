/* eslint-disable no-throw-literal */
import { Snackbar } from '@material-ui/core'
import React, { createContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import MuiAlert from '@material-ui/lab/Alert'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState('')
	const [open, setOpen] = useState(true)
	const [currentUser, setCurrentUser] = useState(null)
	const [role, setRole] = useState('guest') // 4 role: User/Owner/Admin

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setSuccess(false)
		setOpen(false)
	}

	function showError(message, type) {
		setError(message)
		setSuccess(type)
		setOpen(true)
	}

	async function signUp(email, password) {
		return auth.createUserWithEmailAndPassword(email, password)
	}
	async function signUpAsHost(email, password) {
		return auth.createUserWithEmailAndPassword(email, password)
	}
	async function signIn(email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	}
	async function signInAsHost(email, password) {
		if ((await db.collection('admins').where('email', '==', email).get()).docs.length === 1) {
			setRole('admin')
		} else if ((await db.collection('owners').where('email', '==', email).get()).docs.length) {
			setRole('owner')
		} else throw 'User Not Exist'
		return auth.signInWithEmailAndPassword(email, password)
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user)
		})

		return unsubscribe
	}, [])

	return (
		<AuthContext.Provider value={{ currentUser, role, signIn, signInAsHost, signUp, signUpAsHost, showError }}>
			{children}
			{error === '' ? (
				<></>
			) : (
				<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
					<MuiAlert elevation={6} severity={success ? 'success' : 'error'}>
						{error}
					</MuiAlert>
				</Snackbar>
			)}
		</AuthContext.Provider>
	)
}
