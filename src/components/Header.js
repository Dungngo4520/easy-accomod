import React, { useContext } from 'react'
import { Avatar, Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../firebase'
import { AuthContext } from './Auth'
import '../style/Header.css'

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
		auth.signOut()
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
					<IconButton color='secondary' aria-controls='menu' aria-haspopup='true' onClick={handleClick}>
						<Avatar />
					</IconButton>
				) : (
					''
				)}
				{currentUser ? (
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
				) : (
					<Button
						onClick={() => {
							history.push('/signin')
						}}
						variant='text'>
						Sign In
					</Button>
				)}
			</div>
		</div>
	)
}

export default Header
