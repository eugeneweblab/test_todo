import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { reducer, initialState } from './reducer';
import { getUserTasks } from '../helpers/apiRequests';

const StoreContext = createContext(undefined);

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect( () => {

        if ( state?.user?.id ) {
            const fetchDataAndDispatch = async () => {
                try {
                    const data = await getUserTasks(state?.user?.id);
                    dispatch(
                        {
                            type: 'ADD_ALL_USER_TASKS',
                            payload: data
                        }
                    );
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchDataAndDispatch().then();
        }

    }, [state?.user?.id]);



    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};

export { StoreProvider, useStore };