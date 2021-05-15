import React from 'react';
import { FilterPreview,
		 ArrowButtonWrapper,
		 ArrowButtonContainer,
		 FilterContentContainer,
		 FilterWrapper
		} from './Product.styles'
import 'bootstrap/dist/css/bootstrap.min.css'

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

import CollectionItem from '../../components/collectionItems/collectionItem.component.jsx';

const RecommendationScroll = ({Collections}) => {
	const [minimun,setminimun ] = React.useState(0);

	function subtract(minimun) {
		if (minimun > 0) {
			return setminimun(minimun - 1);
		}
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
								Collections.filter((item, idx) => idx  >= minimun && idx < minimun + 4).map((item) => (
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


export default RecommendationScroll;
