export function initSearching(searchFieldName) {
    return (query, state, action) => {
        if (action && action.name === 'reset') {
            state[searchFieldName] = '';
        }

        const searchValue = state[searchFieldName];
        return searchValue ? Object.assign({}, query, { search: searchValue }) : query;
    };
}