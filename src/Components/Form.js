import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useGlobalContext } from '../Context/context';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
        },
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pagination: {
        alignSelf: 'center',
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    textContainer: {
        padding: '1rem',
    },
}));

function Form() {
    const classes = useStyles();
    const { handleQuery, query, page, handlePage, isDarkMode } =
        useGlobalContext();

    const handleBackward = () => {
        let newPage = page;
        if (newPage > 0) {
            newPage = newPage - 1;
        } else {
            newPage = 49;
        }

        handlePage(newPage);
    };

    const handleForward = () => {
        let newPage = page;
        if (newPage < 49) {
            newPage = newPage + 1;
        } else {
            newPage = 0;
        }

        handlePage(newPage);
    };

    return (
        <form className={classes.root}>
            <Card className={classes.textContainer}>
                <TextField
                    style={{ width: '100%' }}
                    label='Search News'
                    variant='outlined'
                    value={query}
                    onChange={(e) => handleQuery(e.target.value)}
                />
            </Card>

            <div className={classes.pagination}>
                <IconButton aria-label='back' onClick={handleBackward}>
                    <ArrowBackIosIcon
                        style={{ color: `${isDarkMode ? 'red' : 'blue'}` }}
                    />
                </IconButton>
                <span
                    style={{ color: `${isDarkMode ? 'white' : 'black'}` }}>{`${
                    page + 1
                } out of ${50}`}</span>
                <IconButton aria-label='forward' onClick={handleForward}>
                    <ArrowForwardIosIcon
                        style={{ color: `${isDarkMode ? 'red' : 'blue'}` }}
                    />
                </IconButton>
            </div>
        </form>
    );
}

export default Form;
