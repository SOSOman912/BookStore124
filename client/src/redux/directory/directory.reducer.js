const INITIAL_STATE = {
	sections: [
					   {
		  			    title: 'hats',
		  			    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
		  			    id: 1,
		  			    linkUrl: 'shop/hats'
		  			  },
		  			  {
		  			    title: 'jackets',
		  			    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
		  			    id: 2,
		  			    linkUrl: 'shop/jackets'
		  			  },
		  			  {
		  			    title: 'sneakers',
		  			    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
		  			    id: 3,
		  			    linkUrl: 'shop/sneakers'
		  			  }]
	};

const directoryReducer = ( state = INITIAL_STATE, action) => {
	switch(action.type) {
		default:
			return state;
	}
}

export default directoryReducer;