import axios from 'axios';

export const fetchingRecommendationListData = async(id) => {
	const makeGetRequest = async(id) => {
		const res = await axios.get('/api/fetchRecommendationList', {
            params: {
              id:id
            }
          })
		let data = res.data;

		return data;
	}	
	var result = await makeGetRequest(id);

	return result;
}