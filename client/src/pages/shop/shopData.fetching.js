import axios from 'axios';

export const fetchingDataFromServerforbasicUse = async() => {
	console.log("Start Fetching Data for Basic use");
	
	const makeGetRequest = async() => {
		var res = await axios.get('/api/getDataForBasicUse');
		
		let data = res.data;

		return data;
	}	
	var result = await makeGetRequest();

	return result;
}

export const fetchingDataFromServer = async() => {
	console.log("Start Fetching Data");
	
	const makeGetRequest = async() => {
		var res = await axios.get('/api/getData');
		
		let data = res.data;

		return data;
	}	
	var result = await makeGetRequest();

	return result;
}
