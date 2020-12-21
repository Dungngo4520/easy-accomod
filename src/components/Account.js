import { Badge, Button, IconButton, MenuItem, Paper, Select, TextField } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import '../style/Account.css'
import { AuthContext } from './Auth'
import { db } from '../firebase'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import firebase from 'firebase'

function Account() {
	const { loadFromLocalStorage, showError } = useContext(AuthContext)
	const { id } = loadFromLocalStorage('userdata')
	const role = loadFromLocalStorage('role')
	const [selection, setSelection] = useState(1)
	const [userData, setUserData] = useState({})
	const [notifications, setNotifications] = useState([])
	const [formData, setformData] = useState({})
	const [change, setChange] = useState(false)
	const [fullName, setFullName] = useState('')
	const [gender, setGender] = useState(true)
	const [dateofbirth, setDateofbirth] = useState(new Date().toLocaleDateString())
	const [phone, setPhone] = useState('')
	const [address, setAddress] = useState('')
	const [govID, setGovID] = useState('')

	useEffect(() => {
		const load = async () => {
			await db
				.collection(role + 's')
				.doc(id)
				.onSnapshot((snapshot) => setUserData(snapshot.data()))
			if (role === 'owner') {
				await db
					.collection('owners')
					.doc(id)
					.collection('notifications')
					.orderBy('timestamp', 'desc')
					.onSnapshot((snapshot) =>
						setNotifications(
							snapshot.docs.map((doc) => {
								return { id: doc.id, ...doc.data() }
							})
						)
					)
			}
		}
		return load()
	}, [id, role])
	useEffect(() => {
		setformData({
			fullname: `${userData.firstname} ${userData.lastname}`,
			gender: userData.male,
			dateofbirth: new Date(userData.dateofbirth?.toDate()).toLocaleDateString(),
			email: userData.email,
			phone: userData.phone,
			governmentID: userData.govid,
			address: userData.address,
		})
	}, [userData])

	const handleInfoClick = () => {
		setSelection(1)
	}

	const handleNotiClick = () => {
		setSelection(2)
	}

	const handleNotiItemClick = (noti) => {
		db.collection('owners')
			.doc(id)
			.collection('notifications')
			.doc(noti.id)
			.set({ ...noti, read: true })
	}

	const handleChangeInfo = () => {
		setChange(true)
		setAddress(formData.address)
		setDateofbirth(formData.dateofbirth)
		setFullName(formData.fullname)
		setGender(formData.gender)
		setGovID(formData.governmentID)
		setPhone(formData.phone)
	}

	const handleChangeConfirm = () => {
		db.collection(role + 's')
			.doc(id)
			.set({
				firstname: fullName.split(' ')[0],
				lastname: fullName.slice(fullName.indexOf(' ') + 1),
				male: gender,
				address: address,
				dateofbirth: firebase.firestore.Timestamp.fromDate(new Date(dateofbirth)),
				email: formData.email,
				govid: govID,
				phone: phone,
			})
		setChange(false)
	}

	const handleChangeClose = () => {
		setChange(false)
	}

	return (
		<Paper elevation={3} className='account'>
			<Paper variant='outlined' square className='account__navbar'>
				<Button className={`navbar__item ${selection === 1 ? 'active' : ''}`} onClick={handleInfoClick}>
					Personal Info
				</Button>
				{role === 'owner' ? (
					<Button className={`navbar__item ${selection === 2 ? 'active' : ''}`} onClick={handleNotiClick}>
						<Badge
							badgeContent={notifications.filter((item) => !item.read).length}
							color='secondary'
							className='notification__badge'>
							Notification
						</Badge>
					</Button>
				) : (
					''
				)}
			</Paper>
			<Paper variant='outlined' square className='account__content'>
				{selection === 1 ? (
					<div className='personal__info'>
						<div className='info__label'>
							<p className='info__title'>personal Info</p>
							{change ? (
								<>
									<IconButton onClick={handleChangeConfirm} color='secondary'>
										<CheckIcon />
									</IconButton>
									<IconButton onClick={handleChangeClose} color='secondary'>
										<CloseIcon />
									</IconButton>
								</>
							) : (
								<IconButton onClick={handleChangeInfo} color='secondary'>
									<EditIcon />
								</IconButton>
							)}
						</div>
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Full name</p>
							{!change ? (
								<p className='infoSection__content'>{formData.fullname}</p>
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
									value={fullName}
									onChange={(e) => {
										setFullName(e.target.value)
									}}
								/>
							)}
						</div>
						<hr />
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Gender</p>
							{!change ? (
								<p className='infoSection__content'>{formData.gender ? 'Male' : 'Female'}</p>
							) : (
								<Select
									color='secondary'
									className='infoSection__content'
									value={gender}
									onChange={(e) => {
										setGender(e.target.value)
									}}>
									<MenuItem value={true}>Male</MenuItem>
									<MenuItem value={false}>Female</MenuItem>
								</Select>
							)}
						</div>
						<hr />
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Date of birth</p>
							{!change ? (
								<p className='infoSection__content'>{formData.dateofbirth}</p>
							) : (
								<TextField
									color='secondary'
									className='infoSection__content'
									id='date'
									type='date'
									onChange={(e) => {
										setDateofbirth(e.target.value)
									}}
								/>
							)}
						</div>
						<hr />
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Email address</p>
							{!change ? (
								<p className='infoSection__content'>{formData.email}</p>
							) : (
								<TextField
									className='infoSection__content'
									color='secondary'
									required
									disabled
									fullWidth
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									value={formData.email}
								/>
							)}
						</div>
						<hr />
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Phone number</p>
							{!change ? (
								<p className='infoSection__content'>{formData.phone}</p>
							) : (
								<TextField
									className='infoSection__content'
									color='secondary'
									required
									fullWidth
									id='phone'
									name='phone'
									autoComplete='phone'
									value={phone}
									onChange={(e) => {
										setPhone(e.target.value)
									}}
								/>
							)}
						</div>
						<hr />
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Government ID</p>
							{!change ? (
								<p className='infoSection__content'>{formData.governmentID}</p>
							) : (
								<TextField
									className='infoSection__content'
									color='secondary'
									required
									fullWidth
									id='id'
									name='id'
									autoComplete='id'
									value={govID}
									onChange={(e) => {
										setGovID(e.target.value)
									}}
								/>
							)}
						</div>
						<hr />
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Address</p>
							{!change ? (
								<p className='infoSection__content'>{formData.address}</p>
							) : (
								<TextField
									className='infoSection__content'
									color='secondary'
									required
									fullWidth
									id='address'
									name='address'
									autoComplete='address'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							)}
						</div>
						<hr />
					</div>
				) : role === 'owner' ? (
					<div className='notification'>
						<p className='info__label'>Notification</p>
						{notifications.map((item) => (
							<div
								className={`notification__item ${item.read ? '' : 'unread'}`}
								onClick={() => {
									handleNotiItemClick(item)
								}}>
								<p>{item.content}</p>
								<hr />
							</div>
						))}
					</div>
				) : (
					''
				)}
			</Paper>
		</Paper>
	)
}

export default Account
