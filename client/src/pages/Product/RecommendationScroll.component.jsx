import React from 'react';
import { FilterPreview,
		 ArrowButtonWrapper,
		 ArrowButtonContainer,
		 FilterContentContainer,
		 FilterWrapper
		} from './Product.styles'
import 'bootstrap/dist/css/bootstrap.min.css'

import { connect } from 'react-redux';

import {createStructuredSelector} from 'reselect';

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

import { selectCollections } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collectionItems/collectionItem.component.jsx';

const RecommendationScroll = ({Collections,ItemCollections}) => {
	const [minimun,setminimun ] = React.useState(0);

	console.log(Collections);

	function subtract(minimun) {
		if (minimun > 0) {
			return setminimun(minimun - 1);
		}
	}

	if (Collections) {

		var realrecommendationlist = Collections.filter((item, idx) => idx  >= minimun && idx < minimun + 4).map((item) => {
						console.log()
						for ( var i = 0; i< ItemCollections.length; i++ ) {
          				if (item == ItemCollections[i].id) {
           				return {...ItemCollections[i]}
      				}
               }
			}		 			
		)
	} else {
		realrecommendationlist = [];
	}

	return (
		<FilterWrapper>
			<h2>YOU MAY LIKE THESE BOOK:</h2>	
			<FilterContentContainer>					
				<ArrowButtonContainer>
								<ArrowButtonWrapper onClick={() => subtract(minimun)}>
									<FaArrowAltCircleLeft size={50}/>
								</ArrowButtonWrapper>
							</ArrowButtonContainer>								
							<FilterPreview>
							{
								realrecommendationlist.map((item) => (
									<CollectionItem key={item.id} item = {item} />
									))
							}
							</FilterPreview>
							<ArrowButtonContainer>
								<ArrowButtonWrapper onClick={() => setminimun(minimun + 1)}>
									<FaArrowAltCircleRight size={50}/>
								</ArrowButtonWrapper>
							</ArrowButtonContainer>
		</FilterContentContainer>
		</FilterWrapper>
	)
}

const mapStateToProps = createStructuredSelector({
	ItemCollections: selectCollections,
})


export default connect(mapStateToProps)(RecommendationScroll);
