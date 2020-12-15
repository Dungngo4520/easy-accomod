import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Home'
import Header from './Header'
import SearchPage from './SearchPage'
import PageNotFound from './PageNotFound'
import Profile from './Profile'
import Account from './Account'
import Login from './Login'
import PropertyPage from './PropertyPage'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

function App() {
	return (
		<div className='app'>
			<Router>
				<ScrollToTop />
				<Header />
				<Switch>
					<Route path='/properties/:propertyId' component={PropertyPage} />
					<Route path='/login' component={Login} />
					<Route path='/account' component={Account} />
					<Route path='/profile' component={Profile} />
					<Route path='/search' component={SearchPage} />
					<Route exact path='/' component={Home} />
					<Route path='*' component={PageNotFound} />
				</Switch>
				<Footer />
			</Router>
		</div>
	)
}

export default App
