import React from 'react'
import { Avatar, Paper } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import AwesomeSlider from 'react-awesome-slider'
import { Redirect, useHistory } from 'react-router-dom'
import './style/Profile.css'

function Profile() {
	const history = useHistory()

	const listing = [
		{
			id: 1,
			img: 'https://a0.muscache.com/im/pictures/be5feb0e-02f2-4898-97f9-ff7c8ebf3cb7.jpg?aki_policy=large',
			caption: 'Ninh Binh Mountain Side Homestay - Mountain View..',
		},
		{
			id: 2,
			img: 'https://a0.muscache.com/im/pictures/b277a9ff-c847-44b5-989b-8384c0de2c32.jpg?aki_policy=large',
			caption: 'Ninh Binh Mountain Side Homestay - Mountain View.',
		},
		{
			id: 3,
			img:
				'https://a0.muscache.com/im/pictures/miso/Hosting-26866147/original/fce8a01e-8b42-4813-8b1f-e1962bbd136b.jpeg?aki_policy=large',
			caption: 'Ninh Binh Mountain Side Homestay - Free Bike..',
		},
		{
			id: 4,
			img:
				'https://a0.muscache.com/im/pictures/miso/Hosting-26877478/original/7fa558dd-6216-4661-9a2c-b48394565b38.jpeg?aki_policy=large',
			caption: 'Ninh Binh Mountain Side Homestay - Free Bike.',
		},
		{
			id: 5,
			img:
				'https://a0.muscache.com/im/pictures/miso/Hosting-23199769/original/137dad78-7a65-4295-aaff-dec4bc5b949f.jpeg?aki_policy=large',
			caption: 'Ninh Binh Mountain Side Homestay - Mountain View',
		},
		{
			id: 6,
			img:
				'https://a0.muscache.com/im/pictures/miso/Hosting-27483776/original/9387735a-e54a-47ef-946a-ab116a729914.jpeg?aki_policy=large',
			caption: 'Ninh Binh Mountain Side Homestay - Free Bike...',
		},
		{
			id: 7,
			img:
				'https://a0.muscache.com/im/pictures/miso/Hosting-23199164/original/12596142-6bf4-4e34-9d5e-801200bdef73.jpeg?aki_policy=large',
			caption: 'Ninh Binh Mountain Side Homestay - Free Breakfast.',
		},
		{
			id: 8,
			img:
				'https://a0.muscache.com/im/pictures/miso/Hosting-23055722/original/defe1003-f510-43f3-a875-e5dc96f72bf4.jpeg?aki_policy=large',
			caption: 'Ninh Binh Mountain Side Homestay - Free Breakfast',
		},
		{
			id: 9,
			img: 'https://a0.muscache.com/im/pictures/e95c443e-7b81-421f-9e68-4a4cecee6512.jpg?aki_policy=large',
			caption: 'Ninh Binh Moutain Side Homestay - Free Bike',
		},
	]

	return (
		<div className='profile'>
			<Paper variant='outlined' className='profile__card'>
				<div className='profileCard__avatar'>
					<Avatar />
				</div>
				<hr />
				<div className='profileCard__info'>
					<LocationOnIcon />
					<p>Hoa Lư, Ninh Bình, Vietnam</p>
				</div>
				<div className='profileCard__info'>
					<PhoneIcon />
					<p>0123456789</p>
				</div>
				<div className='profileCard__info'>
					<EmailIcon />
					<p>notdungngo4520@example.com</p>
				</div>
			</Paper>
			<div className='profile__info'>
				<div className='profileInfo__basic'>
					<p className='profileInfo__name'>Hi, I'm Dung Ngo</p>
					<p className='profileInfo__join'>Joined in 2020</p>
				</div>
				<hr />
				<div className='profileInfo__about'>
					<p className='title'>About</p>
					<p className='profileInfo__about-description'>
						My name is Dung Ngo. I'm living in a homestay that my parent was design and build up. We have
						been welcome a thounsand of guest, oh the number I can't remember. Every time we have a guest,
						my dad will show the tips to travel through the beatiful place in Ninh Binh and my mom cook
						delicous dishes for them, sometime my grandpa wil help her to cook and my grandma spend the hold
						day to take care me. The last member more than me 1 year but she always busy to greeting,
						playing and say goodbye to guest although she cann't talk becoz she a lovely dog :D. I see all
						the guest say that to our dog. My home always get fun with the guest, I feel that they are a
						part of our happy day. Welcome you to Ninh Binh Mountain Side Homestay.
					</p>
				</div>
				<hr />
				<div className='profileInfo__listing'>
					<p className='title'>Dung Ngo's listings</p>
					{listing.length !== 0 ? (
						<AwesomeSlider className='aws-btn'>
							{listing.map((item) => (
								<div
									className='listing__caption'
									data-src={item.img}
									onClick={() => {
										history.push(`/properties/${item.id}`)
									}}>
									<p>{item.caption}</p>
								</div>
							))}
						</AwesomeSlider>
					) : (
						<p>This user has not listed any property.</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default Profile
