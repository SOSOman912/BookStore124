import axios from 'axios';

export const fetchingBuyingHistoryData = async(id) => {
	const makeGetRequest = async(id) => {
		const res = await axios({
			url:'/api/getBuyingHistory',
			method:'get',
			params: {
				id: id
			}
		})
		let data = res.data;

		return data;
	}	
	var result = await makeGetRequest(id);

	return result;
}