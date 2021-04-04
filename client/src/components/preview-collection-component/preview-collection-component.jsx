import React from 'react'

import CollectionItem from '../collectionItems/collectionItem.component.jsx'

import { CollectionPreviewWrap, TitleWrap, PreviewWrap } from './preview-collection-style'

const CollectionPreview = ({collections}) => (
	<CollectionPreviewWrap className='collection-preview'>
			<div>
				<PreviewWrap >
				{
			 		collections.filter((item, idx) => idx < 16).map((item) => (
			 			<CollectionItem key={item.id} item = {item} />
			 			))
				}
	 			</PreviewWrap >
	 		</div>
	</CollectionPreviewWrap>
	)

export default CollectionPreview;