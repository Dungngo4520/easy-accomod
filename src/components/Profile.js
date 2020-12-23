import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Button, IconButton, Paper, TextField } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
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
	const [changeAbout, setChangeAbout] = useState('')
	const [change, setChange] = useState(false)
	useEffect(() => {
		const loadUserData = async () => {
			await db
				.collection(`${role}s`)
				.doc(id)
				.onSnapshot((snapshot) => setUserData(snapshot.data()))
			if (role === 'owner' || role === 'admin') {
				await db
					.collection(`${role}s`)
					.doc(id)
					.collection('properties')
					.onSnapshot((snapshot) => setProperties(snapshot.docs.map((doc) => doc.data())))
			}
		}
		return loadUserData()
	}, [id, role])

	const handleAddClick = () => {
		history.push('/post')
	}

	const handleChangeClose = () => {
		setChange(false)
	}
	const handleChangeConfirm = () => {
		db.collection(`${role}s`)
			.doc(id)
			.set({ ...userData, about: changeAbout })
		setChange(false)
	}
	const handleChangeAbout = () => {
		setChangeAbout(userData.about)
		setChange(true)
	}

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
					<div className='title'>
						<p>About</p>
						{change ? (
							<div>
								<IconButton onClick={handleChangeConfirm} color='secondary'>
									<CheckIcon />
								</IconButton>
								<IconButton onClick={handleChangeClose} color='secondary'>
									<CloseIcon />
								</IconButton>
							</div>
						) : (
							<IconButton onClick={handleChangeAbout} color='secondary'>
								<EditIcon />
							</IconButton>
						)}
					</div>
					{!change ? (
						<p className='profileInfo__about-description'>{userData.about}</p>
					) : (
						<TextField
							className='infoSection__content'
							color='secondary'
							required
							fullWidth
							id='name'
							name='name'
							autoComplete='name'
							autoFocus
							multiline
							value={changeAbout}
							onChange={(e) => {
								setChangeAbout(e.target.value)
							}}
						/>
					)}
				</div>
				<hr />
				{role === 'owner' || role === 'admin' ? (
					<div className='profileInfo__listing'>
						<div className='title'>
							<p className='title__text'>{`${userData.firstname} ${userData.lastname}`}'s listings</p>
							<Button className='title_btn' onClick={handleAddClick}>
								Add new
							</Button>
						</div>
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
