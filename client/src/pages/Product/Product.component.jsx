import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { useParams} from "react-router-dom";
import LeftSideComponent from './Product_Content.component'
import { selectCurrentUser } from '../../redux/cart/cart.selectors';
import { selectCollections, selectIsCollectionFetching } from '../../redux/shop/shop.selectors'
import { ProductPageContainer,
		 FirstPart,
		 SecondPart
		} from './Product.styles.jsx';
import { BeatLoader } from 'react-spinners'
import RecommendationScroll from './RecommendationScroll.component';
import {selectRecommendationlist, selectIsAnalyzing} from '../../redux/shop/shop.selectors';

const ProductPage = ({Collections, isFetching,isAnalyzing, CurrentUser,Recommendationlist}) => {
	let { id } = useParams();
	if (Collections) {
    	Collections = Collections.filter(function(item){ return item.id == id});
	}
	return (
		<ProductPageContainer>
			<FirstPart>
			{ isFetching ?
			<BeatLoader loading	/>
			  : <LeftSideComponent item={Collections} />
			}
			</FirstPart>
			<SecondPart>
			{ isFetching ? 
			<BeatLoader loading	/>	
			  : CurrentUser ?
			  	CurrentUser.recommendionlist ?
			  <RecommendationScroll Collections={CurrentUser.recommendionlist} RecommendationList = {null}/>
			  : isAnalyzing ?
			  <BeatLoader loading	/>
			  : Recommendationlist ?
			  	<RecommendationScroll Collections={null} RecommendationList = {Recommendationlist} />
			  :null
			  :null
			}
			</SecondPart>
		</ProductPageContainer>


		)
}

const mapStateToProps = createStructuredSelector({
	Collections: selectCollections,
	isFetching: selectIsCollectionFetching,
	CurrentUser: selectCurrentUser,
	isAnalyzing: selectIsAnalyzing,
	Recommendationlist: selectRecommendationlist,
});

export default connect(mapStateToProps)(ProductPage);