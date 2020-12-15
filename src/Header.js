import React from 'react'
import './style/Header.css'
import { Avatar, Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'

function Header() {
	const history = useHistory()
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div className='header'>
			<Link to='/' className='header__logo'>
				<h1>Easy Accomod</h1>
			</Link>

			<div className='header__right'>
				<Button
					onClick={() => {
						history.push('/search')
					}}
					variant='text'>
					Explore
				</Button>
				<Button
					onClick={() => {
						history.push('/login')
					}}
					variant='text'>
					Become a host
				</Button>
				<IconButton aria-controls='menu' aria-haspopup='true' onClick={handleClick}>
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
					<MenuItem onClick={handleClose}>Logout</MenuItem>
				</Menu>
			</div>
		</div>
	)
}

export default Header
