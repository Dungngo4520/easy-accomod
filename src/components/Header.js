import React, { useContext } from 'react'
import { Avatar, Button, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { AuthContext } from './Auth'
import '../style/Header.css'

function Header() {
	const history = useHistory()
	const [anchorEl, setAnchorEl] = useState(null)
	const { currentUser, signOut, showError, loadFromLocalStorage } = useContext( AuthContext )
	const userData = loadFromLocalStorage('userdata')

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleSignOut = () => {
		signOut()
		showError('User Signed Out', true)
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
					<div className='header__userInfo'>
						<Typography
							color='secondary'
							className='header__name'
							onClick={() => {
								history.push('/account')
							}}>
							{userData ? `${userData.firstname} ${userData.lastname}` : ''}
						</Typography>
						<IconButton color='secondary' aria-controls='menu' aria-haspopup='true' onClick={handleClick}>
							<Avatar src={userData?.photoURL} />
						</IconButton>
					</div>
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
