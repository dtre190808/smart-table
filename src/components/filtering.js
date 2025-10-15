export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }));
        });
    }

    const applyFiltering = (query, state, action) => {
        if (action === 'clear') {
            const parent = action.closest('.table-column'); 
            const input = parent.querySelector('input, select'); 

            if (input) {
                input.value = '';
            }

            const fieldToClear = action.dataset.field;
            if (fieldToClear) {
                state[fieldToClear] = '';
            }
        }

        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        });

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    }

    return {
        updateIndexes,
        applyFiltering
    };
}