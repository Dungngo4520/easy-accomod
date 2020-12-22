import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Paper } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import AwesomeSlider from 'react-awesome-slider'
import { useHistory } from 'react-router-dom'
import '../style/Profile.css'
import { AuthContext } from './Auth'
import { db } from '../firebase'

function Profile() {
	const history = useHistory()
	const { loadFromLocalStorage } = useContext(AuthContext)
	const role = loadFromLocalStorage('role')
	const { id } = loadFromLocalStorage('userdata')
	const [userData, setUserData] = useState({})
	const [properties, setProperties] = useState([])

	useEffect(() => {
		const loadUserData = async () => {
			await db
				.collection(`${role}s`)
				.doc(id)
				.onSnapshot((snapshot) => setUserData(snapshot.data()))
			if (role === 'owner') {
				await db
					.collection(`${role}s`)
					.doc(id)
					.collection('properties')
					.onSnapshot((snapshot) => setProperties(snapshot.docs.map((doc) => doc.data())))
			}
		}
		return loadUserData()
	}, [id, role])

	return (
		<div className='profile'>
			<Paper variant='outlined' className='profile__card'>
				<div className='profileCard__avatar'>
					<Avatar src={userData.photoURL} />
				</div>
				<hr />
				<div className='profileCard__info'>
					<LocationOnIcon />
					<p>{userData.address}</p>
				</div>
				<div className='profileCard__info'>
					<PhoneIcon />
					<p>{userData.phone}</p>
				</div>
				<div className='profileCard__info'>
					<EmailIcon />
					<p>{userData.email}</p>
				</div>
			</Paper>
			<div className='profile__info'>
				<div className='profileInfo__basic'>
					<p className='profileInfo__name'>Hi, I'm {`${userData.firstname} ${userData.lastname}`}</p>
					<p className='profileInfo__join'>
						Joined in {new Date(userData.createdat?.toDate()).toLocaleDateString()}
					</p>
				</div>
				<hr />
				<div className='profileInfo__about'>
					<p className='title'>About</p>
					<p className='profileInfo__about-description'>{userData.about}</p>
				</div>
				<hr />
				{role === 'owner' ? (
					<div className='profileInfo__listing'>
						<p className='title'>Dung Ngo's listings</p>
						{properties.length !== 0 ? (
							<AwesomeSlider className='aws-btn'>
								{properties
									.filter((item) => item.verified)
									.map((item) => (
										<div
											className='listing__caption'
											data-src={item.image}
											onClick={() => {
												history.push(item.property)
											}}>
											<p>{item.title}</p>
										</div>
									))}
							</AwesomeSlider>
						) : (
							<p>This user has not listed any property.</p>
						)}
					</div>
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default Profile
