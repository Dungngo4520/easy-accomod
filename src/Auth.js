import React, { createContext, useEffect, useState } from 'react'
import app from './firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = app.auth().onAuthStateChanged((user) => {
			setCurrentUser(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	return <AuthContext.Provider value={{ currentUser }}>{!loading && children}</AuthContext.Provider>
}
