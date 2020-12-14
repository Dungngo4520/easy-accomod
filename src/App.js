import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Home'
import Header from './Header'
import SearchPage from './SearchPage'

function App() {
	return (
		<div className='app'>
			<Router>
				<Header />

				<Switch>
					<Route path='/search'>
						<SearchPage />
					</Route>

					<Route path='/'>
						<Home />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
