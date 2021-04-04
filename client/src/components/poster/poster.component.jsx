import React from 'react';
import {PosterWrapper, Image, CircleSelector, CircleSelectorContainer} from './posters.styles.jsx'
import {SliderData} from './SliderData.js'
import {selectPosterToShow} from '../../redux/shop/shop.selectors'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { changePosterToShow } from '../../redux/shop/shop.actions'

const Poster = ({PosterToShow, changePosterToShow}) => {
	return(
		<PosterWrapper>
				<Image src ={process.env.PUBLIC_URL + `${SliderData[PosterToShow].image}`} />
				<CircleSelectorContainer>
					<CircleSelector onMouseEnter={() => changePosterToShow(0)}/>
					<CircleSelector onMouseEnter={() => changePosterToShow(1)}/>
					<CircleSelector onMouseEnter={() => changePosterToShow(2)}/>
				</CircleSelectorContainer>
			</PosterWrapper>
		)
}

const mapStateToProps = createStructuredSelector({
	PosterToShow: selectPosterToShow
});

const mapDispatchToProps = (dispatch) => ({
	changePosterToShow: number => dispatch(changePosterToShow(number))
})

export default connect(mapStateToProps,mapDispatchToProps)(Poster);