import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import '../style/SearchPage.css'
import SearchResult from './SearchResult'
import { useHistory } from 'react-router-dom'
import { db } from '../firebase'
function SearchPage() {
	const history = useHistory()
	const [properties, setProperties] = useState([])

	useEffect(() => {
		db.collection('properties')
			.get()
			.then((data) =>
				setProperties(
					data.docs.map((doc) => {
						return { ...doc.data(), id: doc.id }
					})
				)
			)
	}, [])

	return (
		<div className='searchPage'>
			<div className='searchPage__info'>
				<h1>Stays nearby</h1>
				<Button variant='outlined'>Location</Button>
				<Button variant='outlined'>Around</Button>
				<Button variant='outlined'>Price</Button>
				<Button variant='outlined'>Type</Button>
				<Button variant='outlined'>Area</Button>
				<Button variant='outlined'>More filters</Button>
			</div>

			{properties
				.filter((item) => {
					return item.status === 'verified' && item.showuntil.seconds >= new Date().getTime() / 1000
				})
				.map(({ id, images, address, title, description, rating, favorites, price }) => (
					<SearchResult
						key={id}
						id={id}
						img={images[0]}
						location={address}
						title={title}
						description={description}
						star={rating}
						favorites={favorites}
						price={price}
						onClick={() => {
							history.push(`/properties/${id}`)
						}}
					/>
				))}
		</div>
	)
}

export default SearchPage
