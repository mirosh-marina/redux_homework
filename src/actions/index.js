export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const removeHero = (id) =>({
	type: 'REMOVE_HERO',
	payload: { id }
})

export const addNewHero = (data) =>({
	type: 'ADD_HERO',
	payload: data
})

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