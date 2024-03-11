const emptyUser = {
    name: null,
    firstName: null,
    token: null,
    id: null
}

export const initialState = {
    user: {
        ...emptyUser
    },
    tasks: [
        {}
    ],
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                user: action.payload,
                tasks: [],
            };
        case 'UPDATE_USER':
            return {
                ...state,
                user: {
                    ...state.user,
                    token: action.payload.token,
                    id: action.payload.id,
                }
            };
        case 'UPDATE_TASK':
            const updatedTasks = state.tasks.map(task => {
                return +task.id === +action.payload.id ? { ...task, content: action.payload.content } : task;
            });

            return {
                ...state,
                tasks: updatedTasks,
            };
        case 'ADD_ALL_USER_TASKS':
            return {
                ...state,
                tasks: [...action.payload]
            };
        case 'SIGN_OUT':
            return {
                tasks: [],
                user: {...emptyUser}
            };
        case 'ADD_NEW_TASK':

            const newTasksState = (state.tasks.length) ? [...state.tasks, action.payload] : [action.payload];

            return {
                ...state,
                tasks: newTasksState,
            };
        case 'REMOVE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter( item => item.id !== action.payload.id )
            };
        default:
            return state;
    }
};