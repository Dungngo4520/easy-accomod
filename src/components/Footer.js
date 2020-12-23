import { Grid } from '@material-ui/core'
import React from 'react'

function Footer() {
	return (
		<div>
			{/* style={{textAlign: 'center'}} */}
				<Grid container spacing alignItems="center" >
					<Grid contaner item xs={1} >
					</Grid>
					<Grid contaner item xs={3} >ABOUT
						<Grid >Newsroom
						</Grid>
						<Grid >Investors
						</Grid>
	
					</Grid>

					<Grid contaner item xs={3}>COMMUNITY
						<Grid >Invite friends
						</Grid>
						<Grid >Diversity & Belonging
						</Grid>
					</Grid>
					<Grid contaner item xs={3}>HOST
						<Grid >Host your home
						</Grid>
						<Grid >Host an Online Experience
						</Grid>
					</Grid>
					<Grid contaner item xs={2}>SUPPORT
						<Grid >Help Center
						</Grid>
						<Grid >Trust & Safety
						</Grid>
					</Grid>
				</Grid>
			<div style={{ bottom: '0', padding: '2rem', display: 'grid', placeContent: 'center', minWidth: '700px' }}>
				<p>© 2020 Easy Accomod, Inc. All rights reserved · Privacy · Terms · Sitemap</p>
			</div>
  		</div>
		
	)
}

export default Footer
