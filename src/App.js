import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Form from './Components/Form';
import NewsList from './Components/NewsList';
import Switch from '@material-ui/core/Switch';
import { useGlobalContext } from './Context/context';
import './App.css';

const useStyles = makeStyles({
    root: {},
    footer: {
        position: 'fixed',
        bottom: '1rem',
        right: '2.2rem',
    },
    switch: {
        position: 'fixed',
        top: '1rem',
        right: '2.2rem',
    },
});

function App() {
    const classes = useStyles();
    const { isDarkMode, handletheme } = useGlobalContext();

    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <div className={`App ${isDarkMode && 'dark'}`}>
            <div className={classes.switch}>
                <Switch
                    name='checkedA'
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    onChange={handletheme}
                />
            </div>
            <div className='header-container'>
                <div
                    className='emoji earth'
                    role='img'
                    aria-label='earth rotating'></div>
                <h1
                    className='header'
                    style={{ color: `${isDarkMode ? 'red' : ''}` }}>
                    Search News
                </h1>
            </div>
            <Form />
            <NewsList />
            <div className={classes.footer}>
                <span style={{ color: `${isDarkMode ? 'red' : ''}` }}>
                    &copy;Powered by
                </span>
                :
                <a href='https://hn.algolia.com/api' target='_blank'>
                    <span style={{ color: `${isDarkMode ? 'green' : ''}` }}>
                        HN Algolia
                    </span>
                </a>
            </div>
        </div>
    );
}

export default App;
