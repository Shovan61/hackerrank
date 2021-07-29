import React, { useReducer, useEffect, useContext } from 'react';
import {
    Set_Loading,
    Set_Loading_False,
    Set_Data,
    Set_Query,
    Set_Page,
    Set_Remove,
    Set_Theme,
} from './helperVar';

let searchUrl = `http://hn.algolia.com/api/v1/search?query=`;

export const AppContext = React.createContext();

function reducer(state, action) {
    switch (action.type) {
        case Set_Loading:
            return { ...state, isLoading: true };
        case Set_Loading_False:
            return { ...state, isLoading: false };
        case Set_Data:
            return { ...state, data: action.payload };
        case Set_Query:
            return { ...state, query: action.payload };
        case Set_Page:
            return { ...state, page: action.payload };
        case Set_Remove:
            return { ...state, data: action.payload };
        case Set_Theme:
            return { ...state, isDarkMode: !state.isDarkMode };
        default:
            throw new Error(`action type: ${action.type} Not Found!`);
    }
}

let initialState = {
    data: [],
    isLoading: true,
    query: 'react',
    page: 0,
    isDarkMode: false,
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchData();
    }, [state.query, state.page]);

    const fetchData = async () => {
        try {
            dispatch({ type: Set_Loading });
            const response = await fetch(
                `${searchUrl}${state.query}&page=${state.page}`
            );

            const getData = await response.json();

            dispatch({ type: Set_Data, payload: getData.hits });
            dispatch({ type: Set_Loading_False });
        } catch (error) {
            console.log(error);
        }
    };

    const handleQuery = (q) => {
        dispatch({ type: Set_Query, payload: q });
    };

    const handlePage = (p) => {
        dispatch({ type: Set_Page, payload: p });
    };

    const handleRemove = (id) => {
        const newData = state.data.filter((cur) => cur.objectID !== id);
        dispatch({ type: Set_Remove, payload: newData });
    };

    const handletheme = () => {
        dispatch({ type: Set_Theme });
    };

    return (
        <AppContext.Provider
            value={{
                isLoading: state.isLoading,
                data: state.data,
                handleQuery,
                query: state.query,
                page: state.page,
                handlePage,
                handleRemove,
                isDarkMode: state.isDarkMode,
                handletheme,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
