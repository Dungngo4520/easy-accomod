/* eslint-disable no-throw-literal */
import { Snackbar } from '@material-ui/core'
import React, { createContext, useState } from 'react'
import { auth, db } from '../firebase'
import MuiAlert from '@material-ui/lab/Alert'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState('')
	const [open, setOpen] = useState(true)
	const [currentUser, setCurrentUser] = useState(null)

	function saveToLocalStorage(key, state) {
		try {
			if (state) {
				const serializeState = JSON.stringify(state)
				localStorage.setItem(key, serializeState)
			}
		} catch (e) {}
	}

	function loadFromLocalStorage(key) {
		try {
			const serializeState = localStorage.getItem(key)
			if (serializeState) return JSON.parse(serializeState)
		} catch (e) {}
	}

	function deleteLocaStorage(key) {
		try {
			localStorage.removeItem(key)
		} catch (e) {}
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
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
		if ((await db.collection('users').where('email', '==', email).get()).docs.length === 1) {
			saveToLocalStorage('role', 'user')
		} else throw 'This account does not exist or has another role!'
		db.collection(`users`)
			.where('email', '==', email)
			.onSnapshot((snapshot) =>
				saveToLocalStorage(
					'userdata',
					snapshot.docs.map((doc) => {
						return { ...doc.data(), id: doc.id }
					})[0]
				)
			)
		return auth.signInWithEmailAndPassword(email, password)
	}
	async function signInAsHost(email, password) {
		const checkRole =
			(await db.collection('admins').where('email', '==', email).get()).docs.length === 1
				? 'admin'
				: (await db.collection('owners').where('email', '==', email).get()).docs.length === 1
				? 'owner'
				: () => {
						throw 'This account does not exist or has another role!'
				  }
		await saveToLocalStorage('role', checkRole)
		await db
			.collection(`${checkRole}s`)
			.where('email', '==', email)
			.onSnapshot((snapshot) =>
				saveToLocalStorage(
					'userdata',
					snapshot.docs.map((doc) => {
						return { ...doc.data(), id: doc.id }
					})[0]
				)
			)
		return auth.signInWithEmailAndPassword(email, password)
	}

	function signOut() {
		localStorage.clear()
		setCurrentUser(null)
		return auth.signOut()
	}

	auth.onAuthStateChanged((user) => {
		setCurrentUser(user)
	})

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				signIn,
				signInAsHost,
				signUp,
				signUpAsHost,
				showError,
				signOut,
				saveToLocalStorage,
				loadFromLocalStorage,
				deleteLocaStorage,
			}}>
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
