import { Button } from '@material-ui/core'
import React from 'react'
import './style/SearchPage.css'
import SearchResult from './SearchResult'
import { useHistory } from 'react-router-dom'

function SearchPage() {
	const searchProperty = [
		{
			id: 1,
			img: 'https://a0.muscache.com/im/pictures/b277a9ff-c847-44b5-989b-8384c0de2c32.jpg',
			location: 'Hoa Lư, Ninh Bình, Vietnam',
			title: 'Private room in bed and breakfast hosted by Ninh Binh Mountain Side',
			description: '2 guests · 1 bedroom · 1 bed · 1 private bath',
			star: 4.73,
			price: 30,
		},
	]
	const history = useHistory()
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
			{searchProperty.map((item) => (
				<SearchResult
					id={item.id}
					img={item.img}
					location={item.location}
					title={item.title}
					description={item.description}
					star={item.star}
					price={item.price}
					onClick={() => {
						history.push(`/properties/${item.id}`)
					}}
				/>
			))}
		</div>
	)
}

export default SearchPage
