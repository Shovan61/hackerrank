import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalContext } from '../Context/context';
import CircularProgress from '@material-ui/core/CircularProgress';
import News from './News';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        marginTop: '3rem',
        marginBottom: '3rem',
        display: 'flex',
        flexDirection: 'column',
    },
    listContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 50%)',
        gap: '2rem',
    },
    loader: {
        position: 'relative',
        top: '4rem',
        height: '5rem',
        alignSelf: 'center',
    },
}));

function NewsList() {
    const classes = useStyles();
    const { data, isLoading, isDarkMode } = useGlobalContext();

    return (
        <div className={classes.root}>
            {isLoading ? (
                <CircularProgress
                    style={{ color: `${isDarkMode ? 'red' : 'blue'}` }}
                    className={classes.loader}
                    size='7rem'
                    thickness='2'
                />
            ) : (
                <div className={classes.listContainer}>
                    {data.map((cur) => (
                        <News {...cur} key={cur.objectID} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default NewsList;
