export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            const select = elements[elementName];
            if (select && select.tagName === 'SELECT') {
                while (select.options.length > 1) {
                    select.remove(1);
                }
                Object.values(indexes[elementName]).forEach(name => {
                    const el = document.createElement('option');
                    el.textContent = name;
                    el.value = name;
                    select.appendChild(el);
                });
            }
        });
    };

    const applyFiltering = (query, state, action) => {
        if (action && action.name === 'clear') {
            const parent = action.closest('.table-column');
            const input = parent?.querySelector('input, select');

            if (input) {
                input.value = '';
            }

            const fieldToClear = action.dataset.field;
            if (fieldToClear && state.hasOwnProperty(fieldToClear)) {
                state[fieldToClear] = '';
            }

           
            const filter = {};
            Object.keys(elements).forEach(key => {
                const el = elements[key];
                if (el && ['INPUT', 'SELECT'].includes(el.tagName) && el.value) {
                    filter[`filter[${el.name}]`] = el.value;
                }
            });

            return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
        }

        const filter = {};
        Object.keys(elements).forEach(key => {
            const el = elements[key];
            if (el && ['INPUT', 'SELECT'].includes(el.tagName) && el.value) {
                filter[`filter[${el.name}]`] = el.value;
            }
        });

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}