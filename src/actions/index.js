import { heroesFetching, heroesFetched, heroesFetchingError } from "../components/heroesList/heroesSlice";

export const fetchHeroes = (request) => (dispatch) => {
	dispatch(heroesFetching());
	request('http://localhost:3001/heroes')
		.then(data => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()))
}



export const filter = (element) =>({
	type: 'FILTER',
	payload: element
})

export const delFilter = () => ({
	type: 'DEL_FILTER'
})

export const addActiveBtn = (active) => ({
	
		
			type: 'ACTIVE_BTN',
	payload: active
			
})

// export const addActiveBtn = (active) => (dispatch) => {
// 	setTimeout(() => {
// 		dispatch({
// 			type: 'ACTIVE_BTN',
// 	payload: active
// 		})
// 	}, 1000)
	
// }