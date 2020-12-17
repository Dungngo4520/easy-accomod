import React, { useContext } from 'react'
import './style/Header.css'
import { Avatar, Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import app from './firebase'
import { AuthContext } from './Auth'

function Header() {
	const history = useHistory()
	const [anchorEl, setAnchorEl] = useState(null)
	const { currentUser } = useContext(AuthContext)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleSignOut = () => {
		app.auth().signOut()
		history.push('/')
		handleClose()
	}

	return (
		<div className='header'>
			<Link to='/' className='header__logo'>
				<p>Easy Accomod</p>
			</Link>

			<div className='header__right'>
				<Button
					onClick={() => {
						history.push('/search')
					}}
					variant='text'>
					Explore
				</Button>
				{currentUser ? (
					''
				) : (
					<Button
						onClick={() => {
							history.push('/signup')
						}}
						variant='text'>
						Become a host
					</Button>
				)}
				<IconButton color='secondary' aria-controls='menu' aria-haspopup='true' onClick={handleClick}>
					<Avatar />
				</IconButton>
				<Menu id='menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
					<MenuItem
						onClick={() => {
							history.push('/profile')
							setAnchorEl(null)
						}}>
						Profile
					</MenuItem>
					<MenuItem
						onClick={() => {
							history.push('/account')
							setAnchorEl(null)
						}}>
						My account
					</MenuItem>
					<MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
				</Menu>
			</div>
		</div>
	)
}

export default Header
