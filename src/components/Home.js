import React from 'react'
import Banner from './Banner'
import Card from './Card'
import '../style/Home.css'

function Home() {
	return (
		<div className='home'>
			<Banner />
			<div className='home__section'>
				<Card
					src='https://media.nomadicmatt.com/2019/airbnb_breakup3.jpg'
					title='3 Bedroom Flat in Bournemouth'
					description='Superhost with a stunning view of the beachside in Sunny Bournemouth'
					price='£130/month'
				/>
				<Card
					src='https://thespaces.com/wp-content/uploads/2017/08/Courtesy-of-Airbnb.jpg'
					title='Penthouse in London'
					description='Enjoy the amazing sights of London with this stunning penthouse'
					price='£350/month'
				/>
				<Card
					src='https://media.nomadicmatt.com/2018/apartment.jpg'
					title='1 Bedroom apartment'
					description='Superhost with great amenities and a fabulous shopping complex nearby'
					price='£70/month'
				/>
			</div>
		</div>
	)
}

export default Home
