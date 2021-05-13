import React from 'react';
import { LeftSide,
		 RightSide,
		 Image,
		 Title,
		 Content,
		 DetailWrap,
		 ContentDetail,
		 RatingWrap,
		 StarRating,
		 StarIconWrapper,
		 RatingNumber,
		 CustomButtonWrap,
		 FirstSection
		} from './Product.styles.jsx'
import {togglelogininmessagehidden} from '../../redux/shop/shop.actions.js';
import {selectCurrentUser} from '../../redux/cart/cart.selectors';
import { addItem } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';


function StarIcon(props) {
	  const { fill = 'none' } = props;
	  return (
	    <svg className="w-6 h-6" fill={fill} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
	  );
	}

function RatingIcon(props) {
	const {index, rating} = props;

	const fill = React.useMemo(() => {
		if (rating >= index) {
			return 'yellow'
		}
		return 'none';
	}, [rating,index]);

	return (
		<StarIconWrapper>
			<StarIcon fill={fill} />
		</StarIconWrapper>
		)
}

const LeftSideComponent = ({item,CurrentUser,addItem,loginmessageHidden}) => {
	const {image_url, title,original_title,sale_price,book_id, books_count,language_code,isbn,original_publication_year,isbn13,ratings_1,ratings_2,ratings_3,ratings_4,ratings_5} = item[0];
	return (
			<FirstSection>
				<LeftSide>
					<Image src={image_url} />
				</LeftSide>
				<RightSide>
					<Title>{`BookTitle: ${original_title}`}</Title>
					<Title>{`OriginalBookTitle: ${title}`}</Title>
					<Content>{`Sale_Price:  USD  $${sale_price}`}</Content>
					<Content>* This book is ten and a half inches long, seven and a half inches wide, and two inches thick.  It is bound in brown canvas and is in fair shape.  The only thing on the cover is the book's title.  It contains a few color illustrations.s</Content>
					<Content>* This book is six and a half inches long, six and a half inches wide, and an inch and a half thick.  It is bound in dark green canvas and is in good shape.  The cover has a small illustration.  It contains many black and white illustrations.</Content>
					<DetailWrap>
					<ContentDetail>{`* book_id:  ${book_id}`}</ContentDetail>
					<ContentDetail>{`* books_count:  ${books_count}`}</ContentDetail>
					<ContentDetail>{`* language_code:  ${language_code}`}</ContentDetail>
					<ContentDetail>{`* publication_year:  ${original_publication_year}`}</ContentDetail>
					<ContentDetail>{`* isbn_code:  ${isbn}`}</ContentDetail>
					<ContentDetail>{`* isbn13_code:  ${isbn13}`}</ContentDetail>
					<ContentDetail>* Rating:</ContentDetail>
					</DetailWrap>
					<RatingWrap>
						<StarRating>
						{[1,2,3,4,5].map((index) => {
									return (
										<RatingIcon key={index} index={index} rating={1}> 
										</RatingIcon>
										)
								})} 
						</StarRating>
						<RatingNumber>{`: ${ratings_1}`}</RatingNumber>
					</RatingWrap>
					<RatingWrap>
						<StarRating>
						{[1,2,3,4,5].map((index) => {
									return (
										<RatingIcon key={index} index={index} rating={2}> 
										</RatingIcon>
										)
								})} 
						</StarRating>
						<RatingNumber>{`: ${ratings_2}`}</RatingNumber>
					</RatingWrap>
					<RatingWrap>
						<StarRating>
						{[1,2,3,4,5].map((index) => {
									return (
										<RatingIcon key={index} index={index} rating={3}> 
										</RatingIcon>
										)
								})} 
						</StarRating>
					<RatingNumber>{`: ${ratings_3}`}</RatingNumber>
					</RatingWrap>
					<RatingWrap>
						<StarRating>
						{[1,2,3,4,5].map((index) => {
									return (
										<RatingIcon key={index} index={index} rating={4}> 
										</RatingIcon>
										)
								})} 
						</StarRating>
					<RatingNumber>{`: ${ratings_4}`}</RatingNumber>
					</RatingWrap>
					<RatingWrap>
						<StarRating>
						{[1,2,3,4,5].map((index) => {
									return (
										<RatingIcon key={index} index={index} rating={5}> 
										</RatingIcon>
										)
								})} 
						</StarRating>
					<RatingNumber>{`: ${ratings_5}`}</RatingNumber>
					</RatingWrap>			
					<CustomButtonWrap inverted onClick={() => CurrentUser? addItem(item[0]) : loginmessageHidden()}> Add to cart</CustomButtonWrap>
				</RightSide> 
			</FirstSection>
		)
}

const mapStateToProps = createStructuredSelector({
	CurrentUser: selectCurrentUser, 
});

const mapDispatchToProps = (dispatch) => ({
	addItem: item => dispatch(addItem(item)),
	loginmessageHidden: () => dispatch(togglelogininmessagehidden())
});

export default connect(mapStateToProps,mapDispatchToProps)(LeftSideComponent);