import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


=======
import Home from './components/Home'
import Header from './components/Header'
import SearchPage from './components/SearchPage'
import PageNotFound from './components/PageNotFound'
import Profile from './components/Profile'
import Account from './components/Account'
import SignIn from './components/SignIn'
import PropertyPage from './components/PropertyPage'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './components/Auth'
>>>>>>> 1f849e1b2ab314d59587b6c781ca09a11d0a9ad7

function App() {
	return (
		<div className='app'>
			<AuthProvider>
				<Router>
					<ScrollToTop />
					<Header />
					<Switch>

						<Route path='/postProperty' component={PostProperty} />
						<PrivateRoute path='/properties/:propertyId' component={PropertyPage} />
						<PrivateRoute path='/account' component={Profile} />
						<PrivateRoute path='/profile' component={Account} />
						<Route path='/signup' component={SignUp} />
						<Route path='/signin' component={SignIn} />
						<Route path='/forgot' component={ForgotPassword} />
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
