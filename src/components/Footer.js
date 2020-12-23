import { Grid } from '@material-ui/core'
import React from 'react'

function Footer() {
	return (
		<div style={{paddingTop: '48px', backgroundColor:'#f7f7f7', borderTop:'1px solid #e7e7e7'}}>
				<Grid container spacing alignItems="center" style={{fontSize: '12px !important'}} >
					<Grid contaner item xs={1} >
					</Grid>
					<Grid contaner item xs={3}> <b>ABOUT</b>
						<Grid >Newsroom
						</Grid>
						<Grid >Investors
						</Grid>
	
					</Grid>

					<Grid contaner item xs={3}><b>COMMUNITY</b>
						<Grid >Invite friends
						</Grid>
						<Grid >Diversity & Belonging
						</Grid>
					</Grid>
					<Grid contaner item xs={3}><b>HOST</b>
						<Grid >Host your home
						</Grid>
						<Grid >Host an Online Experience
						</Grid>
					</Grid>
					<Grid contaner item xs={2}><b>SUPPORT</b>
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
