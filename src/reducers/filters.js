const initialState = {
	
	filters: [],
	startFilter: 'no',
	activeBtn: 'all'
		
}

const filters = (state = initialState, action) => {
	switch (action.type) {
		
			
				case 'FILTER':
					return {
						...state,						
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

export default filters;