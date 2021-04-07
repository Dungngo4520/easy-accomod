import { MenuItem, Slider, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import '../style/SearchPage.css'
import SearchResult from './SearchResult'
import { useHistory } from 'react-router-dom'
import { db } from '../firebase'
import { AuthContext } from './Auth'

function SearchPage() {
	const { showError } = useContext(AuthContext)
	const history = useHistory()
	const [properties, setProperties] = useState([])
	const [typeFilter, setTypeFilter] = useState('All')
	const [priceFilter, setPriceFilter] = useState([5, 15])
	const [areaFilter, setAreaFilter] = useState([10, 50])
	const [locationFilter, setLocationFilter] = useState('')
	const [nearbyFilter, setNearbyFilter] = useState('')
	const [dataFiltered, setDataFiltered] = useState([])
	const types = [
		{ value: 'All', label: 'All' },
		{ value: 'Motel', label: 'Motel' },
		{ value: 'Mini apartment', label: 'Mini apartment' },
		{ value: 'Wholehouse', label: 'Wholehouse' },
		{ value: 'Apartment', label: 'Apartment' },
	]

	useEffect(() => {
		const loadProperties = async () => {
			await db.collection('properties').onSnapshot((snapshot) => {
				setProperties(
					snapshot.docs.map((doc) => {
						return { ...doc.data(), id: doc.id }
					})
				)
			})
		}
		return loadProperties()
	}, [])

	useEffect(() => {
		setDataFiltered(properties)
	}, [properties])

	return (
		<div className='searchPage'>
			<div className='searchPage__info'>
				<h1>Stays nearby</h1>
				<div className='search__filters'>
					<div className='filters'>
						<Typography>Location</Typography>
						<TextField
							color='secondary'
							size='small'
							value={locationFilter}
							onChange={(e) => {
								setLocationFilter(e.target.value)
								if (!/\W/.test(e.target.value))
									setDataFiltered(
										properties
											.filter(
												(item) => item.price >= priceFilter[0] && item.price <= priceFilter[1]
											)
											.filter((item) => item.area >= areaFilter[0] && item.area <= areaFilter[1])
											.filter((item) =>
												new RegExp(e.target.value === '' ? '.' : e.target.value, 'gi').test(
													item.address
												)
											)
											.filter((item) =>
												new RegExp(nearbyFilter === '' ? '.' : nearbyFilter, 'gi').test(
													item.nearby
												)
											)
											.filter((item) => (typeFilter === 'All' ? true : item.type === typeFilter))
									)
								else showError('Do not use special character!')
							}}
						/>
					</div>
					<div className='filters'>
						<Typography>Nearby</Typography>
						<TextField
							color='secondary'
							size='small'
							value={nearbyFilter}
							onChange={(e) => {
								setNearbyFilter(e.target.value)
								setDataFiltered(
									properties
										.filter((item) => item.price >= priceFilter[0] && item.price <= priceFilter[1])
										.filter((item) => item.area >= areaFilter[0] && item.area <= areaFilter[1])
										.filter((item) =>
											new RegExp(locationFilter === '' ? '.' : locationFilter, 'gi').test(
												item.address
											)
										)
										.filter((item) =>
											new RegExp(e.target.value === '' ? '.' : e.target.value, 'gi').test(
												item.nearby
											)
										)
										.filter((item) => (typeFilter === 'All' ? true : item.type === typeFilter))
								)
							}}
						/>
					</div>
					<div className='filters'>
						<Typography>Type</Typography>
						<TextField
							color='secondary'
							select
							value={typeFilter}
							onChange={(e) => {
								setTypeFilter(e.target.value)
								setDataFiltered(
									properties
										.filter((item) => item.price >= priceFilter[0] && item.price <= priceFilter[1])
										.filter((item) => item.area >= areaFilter[0] && item.area <= areaFilter[1])
										.filter((item) =>
											new RegExp(locationFilter === '' ? '.' : locationFilter, 'gi').test(
												item.address
											)
										)
										.filter((item) =>
											new RegExp(nearbyFilter === '' ? '.' : nearbyFilter, 'gi').test(item.nearby)
										)
										.filter((item) =>
											e.target.value === 'All' ? true : item.type === e.target.value
										)
								)
							}}
							defaultValue={types[0].value}>
							{types.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</div>
					<div className='filters'>
						<Typography>Price</Typography>
						<Slider
							color='secondary'
							value={priceFilter}
							max={200}
							min={0}
							onChange={(e, newValue) => {
								setPriceFilter(newValue)
								setDataFiltered(
									properties
										.filter((item) => item.price >= newValue[0] && item.price <= newValue[1])
										.filter((item) => item.area >= areaFilter[0] && item.area <= areaFilter[1])
										.filter((item) =>
											new RegExp(locationFilter === '' ? '.' : locationFilter, 'gi').test(
												item.address
											)
										)
										.filter((item) =>
											new RegExp(nearbyFilter === '' ? '.' : nearbyFilter, 'gi').test(item.nearby)
										)
										.filter((item) => (typeFilter === 'All' ? true : item.type === typeFilter))
								)
							}}
							valueLabelDisplay='auto'
							aria-labelledby='range-slider'
							getAriaValueText={(value) => {
								return `${value}$`
							}}
						/>
					</div>
					<div className='filters'>
						<Typography>Area</Typography>
						<Slider
							color='secondary'
							value={areaFilter}
							min={0}
							max={200}
							onChange={(e, newValue) => {
								setAreaFilter(newValue)
								setDataFiltered(
									properties
										.filter((item) => item.price >= priceFilter[0] && item.price <= priceFilter[1])
										.filter((item) => item.area >= newValue[0] && item.area <= newValue[1])
										.filter((item) =>
											new RegExp(locationFilter === '' ? '.' : locationFilter, 'gi').test(
												item.address
											)
										)
										.filter((item) =>
											new RegExp(nearbyFilter === '' ? '.' : nearbyFilter, 'gi').test(item.nearby)
										)
										.filter((item) => (typeFilter === 'All' ? true : item.type === typeFilter))
								)
							}}
							valueLabelDisplay='auto'
							aria-labelledby='range-slider'
							getAriaValueText={(value) => {
								return `${value}$`
							}}
						/>
					</div>
					{/* <Button>More filters</Button> */}
				</div>
			</div>

			{dataFiltered
				.filter((item) => {
					return item.status === 'verified' && item.showuntil.seconds >= new Date().getTime() / 1000
				})
				.map(({ id, images, address, title, description, rating, favorites, price, type }) => (
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
						type={type}
						onClick={() => {
							history.push(`/properties/${id}`)
						}}
					/>
				))}
		</div>
	)
}

export default SearchPage
