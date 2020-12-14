import { Button } from '@material-ui/core'
import React from 'react'
import './style/Banner.css'
import { useHistory } from 'react-router-dom'

function Banner() {
	const history = useHistory()

	return (
		<div className='banner'>
			<div className='banner__info'>
				<h1>Get out and stretch your imagination</h1>
				<h5>Plan a different kind of getaway to uncover the hidden gems near you.</h5>
				<Button
					onClick={() => {
						history.push('/search')
					}}
					variant='outlined'>
					Explore Nearby
				</Button>
			</div>
		</div>
	)
}

export default Banner
