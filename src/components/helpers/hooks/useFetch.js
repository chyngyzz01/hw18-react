const useFetch = (
	urlBase = 'https://todo-tracker-b6e99-default-rtdb.firebaseio.com/',
) => {
	const postHandler = (url, formData) => {
		return fetch(`${urlBase} ${url}`, {
			method: 'POST',
			body: JSON.stringify(formData),
		});
	};
	const getHanler = (url = '') => {
		return fetch(`${urlBase} ${url}`).then((response) => response.json());
	};

	return {
		postHandler,
		getHanler,
	};
};

export default useFetch;
