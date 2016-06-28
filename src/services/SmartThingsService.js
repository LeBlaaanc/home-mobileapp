export default class SmartThingsService {

	static apiURL = 'https://graph.api.smartthings.com/api/smartapps/installations/2d504317-3766-4583-aa59-59e5a9cc16bc';
	static apiKey = '9aaf9b68-9302-4625-ab89-1d6338dff48d';

	static getDashboard() {
		const url = SmartThingsService.apiURL + '/Dashboard';
		const headers = {
			Authorization: 'Bearer ' + SmartThingsService.apiKey,
		};

		fetch(url, headers)
		.then(res => {
			if (res.ok) return res.json();
			else return Promise.reject('');
		})
		.catch(err => Promise.reject(err));
	}

}