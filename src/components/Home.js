import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import Card from './Card'
import '../style/Home.css'
import { db } from '../firebase'
import { useHistory } from 'react-router-dom'
function Home() {
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
		<div className='home'>
			<Banner />
			<div className='home__section'>
				{properties.map((item) => (
					<Card
						onClick={() => {
							history.push(`/properties/${item.id}`)
						}}
						src={item.images[0]}
						title={item.title}
						description={item.description}
						price={`${item.price}$/month`}
					/>
				))}
			</div>
		</div>
	)
}

export default Home
