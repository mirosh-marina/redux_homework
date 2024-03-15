import { heroesFetching, heroesFetched, heroesFetchingError } from "../components/heroesList/heroesSlice";

export const fetchHeroes = (request) => (dispatch) => {
	dispatch(heroesFetching());
	request('http://localhost:3001/heroes')
		.then(data => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()))
}




// export const addActiveBtn = (active) => (dispatch) => {
// 	setTimeout(() => {
// 		dispatch({
// 			type: 'ACTIVE_BTN',
// 	payload: active
// 		})
// 	}, 1000)
	
// }