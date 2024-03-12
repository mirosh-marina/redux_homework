const initialState = {
	heroes: [],
    heroesLoadingStatus: 'idle',
	filters: [],
	startFilter: 'no',
	activeBtn: 'all'
		
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
				case 'REMOVE_HERO':
					return {
						...state,
						heroes: state.heroes.filter(hero => hero.id !== action.payload.id)
					}
					case 'ADD_HERO':
						return {
							...state,							
							heroes: [...state.heroes, action.payload]
						}
			
				case 'FILTER':
					return {
						...state,
						filters: state.heroes.filter(hero => hero.element === action.payload),
						startFilter: 'yes'
					}
				case 'DEL_FILTER':
					return {
						...state,
						filters: [],
						startFilter: 'no',
						activeBtn: 'all'
					}
				case 'ACTIVE_BTN':
					return {
						...state,
						activeBtn: action.payload
					}
				
			default: return state
	}
}

export default reducer;