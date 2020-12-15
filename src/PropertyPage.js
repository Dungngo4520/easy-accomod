import React from 'react'
import AwesomeSlider from 'react-awesome-slider'
import StarIcon from '@material-ui/icons/Star'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { Avatar, Button, Paper } from '@material-ui/core'
import NearMeIcon from '@material-ui/icons/NearMe'
import BathtubIcon from '@material-ui/icons/Bathtub'
import KitchenIcon from '@material-ui/icons/Kitchen'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import OpacityIcon from '@material-ui/icons/Opacity'
import DevicesOtherIcon from '@material-ui/icons/DevicesOther'

import 'react-awesome-slider/dist/styles.css'
import './style/PropertyPage.css'

function PropertyPage() {
	const images = [
		{
			url: 'https://a0.muscache.com/im/pictures/b277a9ff-c847-44b5-989b-8384c0de2c32.jpg?im_w=720',
		},
		{
			url: 'https://a0.muscache.com/im/pictures/035f2b76-7540-4ca6-ad5e-41b6c0166a85.jpg?im_w=720',
		},
		{
			url: 'https://a0.muscache.com/im/pictures/15b0bfd1-cea5-481c-a64b-acf6bac1e43b.jpg?im_w=720',
		},
		{
			url: 'https://a0.muscache.com/im/pictures/6cbb2117-7270-4f20-8629-de5978783a29.jpg?im_w=720',
		},
		{
			url: 'https://a0.muscache.com/im/pictures/869e432f-d1e3-48a0-8bfe-996c5e734313.jpg?im_w=720',
		},
	]

	return (
		<div className='property__page'>
			{/* Header */}
			<div className='propertyPage__header'>
				<h1 className='propertyPage__title'>Ninh Binh Mountain Side Homestay - Mountain View.</h1>
				<div className='propertyPage__subtitle'>
					<div className='propertyPage__subtitleRight'>
						<p className='property__rate'>
							<StarIcon className='property__star' />
							<strong>{5.0}</strong>
						</p>
						<p>·</p>
						<p>Hoa Lư, Ninh Bình, Vietnam</p>
					</div>
					<div className='propertyPage__subtitleLeft'>
						<Button>
							<p>Save</p>
							<FavoriteBorderIcon />
						</Button>
					</div>
				</div>
			</div>
			{/* Gallery */}
			<div className='propertyPage__gallery'>
				<AwesomeSlider className='aws-btn'>
					{images.map((image) => (
						<div data-src={image.url}></div>
					))}
				</AwesomeSlider>
			</div>
			{/* Info */}
			<div className='propertyPage__info'>
				<div className='propertyInfo__left'>
					<h2 className='propertyInfo__title'>
						Private room in bed and breakfast hosted by Ninh Binh Mountain Side
					</h2>
					<div className='propertyInfo__condition'>
						<p>Apartment</p>
						<p> · </p>
						<p>50m2</p>
						<p> · </p>
						<p>Stay with owner/Private</p>
					</div>
				</div>
				<div className='propertyInfo__owner'>
					<p>Ngo Duc Dung</p>
					<Avatar src='https://a0.muscache.com/im/pictures/user/57dfe360-277e-4982-84e4-f23f5b29a214.jpg?im_w=240' />
				</div>
			</div>
			<div className='propertyInfo__description'>
				<hr />
				<p>
					OUR FAMILY RUN HOMESTAY WITH 8 PRIVATE ROOMS. The room with air-condition, hot shower and
					comfortable bed and beautiful view. Great location to explore Ninh Binh in nun-touristic way. We
					offer bike, breakfast for FREE and scooter for rent, within 10 to 15 minutes on bycicle to all
					famous spots in Ninh Binh: Tam Coc, Trang An, Hoa Lu, Mua Cave and so on. Our homestay would be a
					perfect expereience of local's life in Ninh Binh.
				</p>
			</div>
			<div className='propertyInfo__amenities'>
				<hr />
				<p>Amenities</p>
				<div className='property__amenity'>
					<NearMeIcon />
					<p>Nearby: something asdaksdjalksjdlkjalsdk</p>
				</div>
				<div className='property__amenity'>
					<BathtubIcon />
					<p>Bathroom: Closed/Shared</p>
				</div>
				<div className='property__amenity'>
					<KitchenIcon />
					<p>Kitchen: Private/Public/No Cooking</p>
				</div>
				<div className='property__amenity not-available'>
					<WbSunnyIcon />
					<p>Heating</p>
				</div>
				<div className='property__amenity not-available'>
					<AcUnitIcon />
					<p>Air Conditioning</p>
				</div>
				<div className='property__amenity not-available'>
					<VerticalSplitIcon />
					<p>Balcony</p>
				</div>
				<div className='property__amenity'>
					<WbIncandescentIcon />
					<p>Electricity: Rental Price/Household Price</p>
				</div>
				<div className='property__amenity'>
					<OpacityIcon />
					<p>Water: Rental Price/Household Price</p>
				</div>
				<div className='property__amenity'>
					<DevicesOtherIcon />
					<p>Other Amenities: Fridge, Washing Machine, Television,...</p>
				</div>
			</div>
			<hr />
			<div className='propertyInfo__review'>
				<div className='property__rate'>
					<StarIcon className='property__star' />
					<p>5 (7 reviews)</p>
				</div>
				<div className='propertyInfoReview__comment'>
					<div className='propertyInfoReview__commentor'>
						<Avatar className='propertyInfoReview__commentor-avatar' />
						<div className='propertyInfoReview__commentor-info'>
							<p className='propertyInfoReview__commentor-name'>Dung</p>
							<p className='propertyInfoReview__commentor-date'>01/01/2021</p>
						</div>
					</div>
					<div className='propertyInfoReview__comment-content'>
						Nice stay. If you're looking for quiet place with friendly people, this is the one. I recommend
						you to ride bike around to see attractions. Spending 1 whole day with a bike, you'll expeirence
						most of good places in Ninh Binh
					</div>
				</div>
			</div>
			<hr />
			<div className='property__owner'>
				<p>About Owner</p>
				<div className='propertyOwner__information'>
					<Avatar />
					<div className='propertyOwner__info'>
						<p className='propertyOwner__name'>Dung Ngo</p>
						<p className='propertyOwner__join'>Joined in 01/01/2021</p>
					</div>
				</div>
				<div className='propertyOwner__description'>
					<q>
						My name is Dung Ngo. I'm living in a homestay that my parent was design and build up. We have
						been welcome a thounsand of guest, oh the number I can't remember. Every time we have a guest,
						my dad will show the tips to travel through the beatiful place in Ninh Binh and my mom cook
						delicous dishes for them, sometime my grandpa wil help her to cook and my grandma spend the hold
						day to take care me. The last member more than me 1 year but she always busy to greeting,
						playing and say goodbye to guest although she cann't talk becoz she a lovely dog :D. I see all
						the guest say that to our dog. My home always get fun with the guest, I feel that they are a
						part of our happy day. Welcome you to Ninh Binh Mountain Side Homestay.
					</q>
				</div>
			</div>
			<br/>
			<Paper elevation={5} className='propertyInfo__check'>
				<p>15$/month</p>
				<div className='propertyInfoCheck__button'>
					<Button>Rent this property</Button>
				</div>
			</Paper>
		</div>
	)
}

export default PropertyPage
