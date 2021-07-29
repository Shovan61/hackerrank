import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalContext } from '../Context/context';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
    },
    btn: {
        marginTop: '2rem',
        display: 'flex',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

function News(props) {
    const classes = useStyles();
    const { title, url, points, author, num_comments, objectID } = props;
    const { handleRemove } = useGlobalContext();

    return (
        <Card className={classes.root}>
            <Typography variant='h6' component='h6'>
                {title}
            </Typography>
            <Typography
                style={{ alignSelf: 'flex-start', marginTop: '1rem' }}
                color='textSecondary'
                variant='subtitle1'
                component='subtitle1'>
                {points} points by {author} | {num_comments} comments
            </Typography>
            <div className={classes.btn}>
                <a
                    href={url}
                    target='_blank'
                    style={{ textDecoration: 'none' }}>
                    <Typography
                        color='primary'
                        variant='inherit'
                        component='inherit'>
                        Read More
                    </Typography>
                </a>
                <Typography
                    style={{ cursor: 'pointer' }}
                    color='secondary'
                    variant='inherit'
                    component='inherit'
                    onClick={() => handleRemove(objectID)}>
                    Remove
                </Typography>
            </div>
        </Card>
    );
}

export default News;
