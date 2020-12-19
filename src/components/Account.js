import { Badge, Button, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import '../style/Account.css'

function Account() {
	const [selection, setSelection] = useState(1)

	const handleInfoClick = () => {
		setSelection(1)
	}

	const handleNotiClick = () => {
		setSelection(2)
	}

	const handleNotiItemClick = (id) => {
		setNotification(
			notification.map((item) =>
				item.id === id
					? {
							...item,
							read: !item.read,
					  }
					: item
			)
		)
	}

	const userInfo = {
		id: 1,
		fullname: 'Ngo Duc Dung',
		gender: '1',
		dateOfBirth: '05/04/2000',
		email: 'notdungngo4520@gmail.com',
		phone: '0123456789',
		governmentID: '01123456789',
		address: 'Cau Giay, Ha Noi',
	}

	const [notification, setNotification] = useState([
		{
			id: 2,
			timestamp: '01/01/2021',
			read: false,
			content: 'Add your work email to unlock extra perks for business trips, like simplified expensing. ',
		},
		{
			id: 1,
			timestamp: '01/01/2021',
			read: false,
			content:
				'Please confirm your email address by clicking on the link we just emailed you. If you cannot find the email, you can request a new confirmation email or change your email address.',
		},
	])

	return (
		<Paper elevation={3} className='account'>
			<Paper variant='outlined' square className='account__navbar'>
				<Button className={`navbar__item ${selection === 1 ? 'active' : ''}`} onClick={handleInfoClick}>
					Personal Info
				</Button>
				<Button className={`navbar__item ${selection === 2 ? 'active' : ''}`} onClick={handleNotiClick}>
					<Badge
						badgeContent={notification.filter((item) => !item.read).length}
						color='secondary'
						className='notification__badge'>
						Notification
					</Badge>
				</Button>
			</Paper>
			<Paper variant='outlined' square className='account__content'>
				{selection === 1 ? (
					<div className='personal__info'>
						<p className='info__label'>personal Info</p>
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Full name</p>
							<p className='infoSection__content'>{userInfo.fullname}</p>
						</div>
						<hr />
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Gender</p>
							<p className='infoSection__content'>{userInfo.gender === 1 ? 'Male' : 'Female'}</p>
						</div>
						<hr />
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Date of birth</p>
							<p className='infoSection__content'>{userInfo.dateOfBirth}</p>
						</div>
						<hr />
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Email address</p>
							<p className='infoSection__content'>{userInfo.email}</p>
						</div>
						<hr />
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Phone number</p>
							<p className='infoSection__content'>{userInfo.phone}</p>
						</div>
						<hr />
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Government ID</p>
							<p className='infoSection__content'>{userInfo.governmentID}</p>
						</div>
						<hr />
						<div className='personalInfo__section'>
							<p className='infoSection__field'>Address</p>
							<p className='infoSection__content'>{userInfo.address}</p>
						</div>
						<hr />
					</div>
				) : (
					<div className='notification'>
						<p className='info__label'>Notification</p>
						{notification.map((item) => (
							<div
								className={`notification__item ${item.read ? '' : 'unread'}`}
								onClick={() => {
									if (!item.read) handleNotiItemClick(item.id)
								}}>
								<p>{item.content}</p>
								<hr />
							</div>
						))}
					</div>
				)}
			</Paper>
		</Paper>
	)
}

export default Account
