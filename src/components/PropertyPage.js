/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useState } from 'react'
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
import { Redirect, useHistory } from 'react-router-dom'
import { db } from '../firebase'
import 'react-awesome-slider/dist/styles.css'
import '../style/PropertyPage.css'
import { AuthContext } from './Auth'
function PropertyPage(id) {
	const history = useHistory()
	const [propertyData, setPropertyData] = useState({})
	const [propertyOwner, setPropertyOwner] = useState({})
	const [comments, setComments] = useState([])
	const [favorites, setFavorites] = useState([])
	const [favorite, setFavorite] = useState(false)
	const [favoriteID, setFavoriteID] = useState('')
	const { loadFromLocalStorage } = useContext(AuthContext)

	const userData = loadFromLocalStorage('userdata')
	const role = loadFromLocalStorage('role')

	useEffect(() => {
		const subscribe = async () => {
			try {
				await db
					.collection('properties')
					.doc(id.match.params.propertyId)
					.onSnapshot((snapshot) => setPropertyData(snapshot.data()))

				await db
					.collection('properties')
					.doc(id.match.params.propertyId)
					.collection('comments')
					.orderBy('timestamp', 'desc')
					.onSnapshot((snapshot) => setComments(snapshot.docs.map((doc) => doc.data())))

				if (propertyData) {
					await db.doc(propertyData.owner).onSnapshot((snapshot) => setPropertyOwner(snapshot.data()))
				}
			} catch (e) {}
		}
		subscribe()
	}, [id, propertyData])

	useEffect(() => {
		const subscribe = async () => {
			await db
				.collection('users')
				.doc(userData.id)
				.collection('favorites')
				.onSnapshot((snapshot) =>
					setFavorites(
						snapshot.docs.map((doc) => {
							return { ...doc.data(), id: doc.id }
						})
					)
				)
			favorites.map((item) => {
				if (item.property.includes(id.match.params.propertyId)) {
					setFavorite(true)
					setFavoriteID(item.id)
				}
			})
		}
		subscribe()
	}, [favorites, id.match.params.propertyId, userData.id])

	const handleRentClick = () => {
		// console.log(comments)
		// console.log(comments.timestamp)
	}

	const handleFavoriteClick = () => {
		if (favorite) {
			setFavorite(false)
			db.collection('users').doc(userData.id).collection('favorites').doc(favoriteID).delete()
		} else {
			setFavorite(true)
			db.collection('users')
				.doc(userData.id)
				.collection('favorites')
				.add({ property: `/properties/${id.match.params.propertyId}` })
		}
	}

	return propertyData ? (
		<div className='property__page'>
			<div className='propertyPage__header'>
				<h1 className='propertyPage__title'>{propertyData.title}</h1>
				<div className='propertyPage__subtitle'>
					<div className='propertyPage__subtitleRight'>
						<p className='property__rate'>
							<StarIcon className='property__star' />
							<strong>{propertyData.rating?.toFixed(1)}</strong>
						</p>
						<p>·</p>
						<p>{propertyData?.address}</p>
					</div>
					{role === 'user' ? (
						<div className='propertyPage__subtitleLeft'>
							<Button onClick={handleFavoriteClick}>
								<p>Save</p>
								<FavoriteBorderIcon />
								<strong>{propertyData?.favorites}</strong>
							</Button>
						</div>
					) : (
						''
					)}
				</div>
			</div>
			{/* Gallery */}
			<div className='propertyPage__gallery'>
				<AwesomeSlider className='aws-btn'>
					{propertyData.images?.map((image) => (
						<div data-src={image}></div>
					))}
				</AwesomeSlider>
			</div>
			{/* Info */}
			<div className='propertyPage__info'>
				<div className='propertyInfo__left'>
					<h2 className='propertyInfo__title'>
						{propertyData.type} hosted by {`${propertyOwner.firstname} ${propertyOwner.lastname}`}
					</h2>
					<div className='propertyInfo__condition'>
						<p>{propertyData.type}</p>
						<p> · </p>
						<p>{propertyData.area}m²</p>
						<p> · </p>
						<p>{propertyData.sharewithhost ? 'Stay with owner' : 'Private'}</p>
					</div>
				</div>
				<div className='propertyInfo__owner'>
					<p>{`${propertyOwner.firstname} ${propertyOwner.lastname}`}</p>
					<Avatar src={propertyOwner.photoURL} />
				</div>
			</div>
			<div className='propertyInfo__description'>
				<hr />
				<p>{propertyData.description}</p>
			</div>
			<div className='propertyInfo__amenities'>
				<hr />
				<p>Amenities</p>
				<div className='property__amenity'>
					<NearMeIcon />
					<p>Nearby: {propertyData.nearby}</p>
				</div>
				<div className='property__amenity'>
					<BathtubIcon />
					<p>Bathroom: {propertyData.privatebathroom ? 'Closed' : 'Shared'}</p>
				</div>
				<div className='property__amenity'>
					<KitchenIcon />
					<p>Kitchen: {propertyData.kitchen}</p>
				</div>
				<div className={`property__amenity ${propertyData.heating ? '' : 'not-available'}`}>
					<WbSunnyIcon />
					<p>Heating</p>
				</div>
				<div className={`property__amenity ${propertyData.airconditioning ? '' : 'not-available'}`}>
					<AcUnitIcon />
					<p>Air Conditioning</p>
				</div>
				<div className={`property__amenity ${propertyData.balcony ? '' : 'not-available'}`}>
					<VerticalSplitIcon />
					<p>Balcony</p>
				</div>
				<div className='property__amenity'>
					<WbIncandescentIcon />
					<p>Electricity: {propertyData.electricityprice}</p>
				</div>
				<div className='property__amenity'>
					<OpacityIcon />
					<p>Water: {propertyData.waterprice}</p>
				</div>
				<div className='property__amenity'>
					<DevicesOtherIcon />
					<p>Other Amenities: {propertyData.otheramenities}</p>
				</div>
			</div>
			<hr />
			<div className='propertyInfo__review'>
				<div className='property__rate'>
					<StarIcon className='property__star' />
					<p>5 (7 reviews)</p>
				</div>
				{comments.map((comment) => (
					<div className='propertyInfoReview__comment'>
						<div className='propertyInfoReview__commentor'>
							<Avatar className='propertyInfoReview__commentor-avatar' />
							<div className='propertyInfoReview__commentor-info'>
								<p className='propertyInfoReview__commentor-name'>{comment.name}</p>
								<p className='propertyInfoReview__commentor-date'>
									{new Date(comment.timestamp?.toDate()).toLocaleDateString()}
								</p>
							</div>
						</div>
						<div className='propertyInfoReview__comment-content'>{comment.content}</div>
					</div>
				))}
			</div>
			<hr />
			<div className='property__owner'>
				<p>About Owner</p>
				<div className='propertyOwner__information'>
					<Avatar />
					<div className='propertyOwner__info'>
						<p className='propertyOwner__name'>{`${propertyOwner.firstname} ${propertyOwner.lastname}`}</p>
						<p className='propertyOwner__join'>
							Joined in {new Date(propertyOwner.createdat?.toDate()).toLocaleDateString()}
						</p>
					</div>
				</div>
				<div className='propertyOwner__description'>
					<q>{propertyOwner.about}</q>
				</div>
			</div>
			<br />
			<Paper elevation={5} className='propertyInfo__check'>
				<p>{propertyData.price}$/month</p>
				<div className='propertyInfoCheck__button'>
					<Button onClick={handleRentClick}>Rent this property</Button>
				</div>
			</Paper>
		</div>
	) : (
		<Redirect to='/404' />
	)
}

export default PropertyPage
