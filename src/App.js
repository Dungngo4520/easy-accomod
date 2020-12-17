import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Home'
import Header from './Header'
import SearchPage from './SearchPage'
import PageNotFound from './PageNotFound'
import Profile from './Profile'
import Account from './Account'
import SignIn from './SignIn'
import PropertyPage from './PropertyPage'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import SignUp from './SignUp'
import PrivateRoute from './PrivateRoute'
import { AuthProvider } from './Auth'

function App() {
	return (
		<div className='app'>
			<AuthProvider>
				<Router>
					<ScrollToTop />
					<Header />
					<Switch>
						<Route path='/properties/:propertyId' component={PropertyPage} />
						<Route path='/signup' component={SignUp} />
						<Route path='/signin' component={SignIn} />
						<PrivateRoute path='/account' component={Account} />
						<PrivateRoute path='/profile' component={Profile} />
						<Route path='/search' component={SearchPage} />
						<Route exact path='/' component={Home} />
						<Route path='*' component={PageNotFound} />
					</Switch>
					<Footer />
				</Router>
			</AuthProvider>
		</div>
	)
}

export default App
