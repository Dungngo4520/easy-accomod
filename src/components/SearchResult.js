import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import StarIcon from '@material-ui/icons/Star'
import '../style/SearchResult.css'

function SearchResult({ img, location, title, description, star, price, onClick }) {
	return (
		<div className='searchResult' onClick={onClick}>
			<img src={img} alt='' />
			<FavoriteBorderIcon className='searchResult__heart' />
			<div className='searchResult__info'>
				<div className='searchResult__infoTop'>
					<p>{location}</p>
					<h3>{title}</h3>
					<p>{description}</p>
				</div>
				<div className='searchResult__infoBottom'>
					<div className='searchResult_stars'>
						<StarIcon className='searchResult__star' />
						<p>
							<strong>{star}</strong>
						</p>
					</div>
					<div className='searchResult__price'>
						<h2>{price}</h2>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchResult
