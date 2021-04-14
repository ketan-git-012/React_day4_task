import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import { useHistory } from 'react-router';
// import trainees from './Trainees';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      width : '500px',
      margin : '10px',
      textAlign : 'center'
    },
    media: {
      height: 250,
      opacity : 0.8
    },
    button : {
        width : '100%'
    },
    cardActions : {
        backgroundColor : 'rgba(0, 0, 0, 0.1)',
    },
    cardContent : {
        position : 'relative',
        top : '150px',
        color : 'red',
        opacity : 1,
        fontWeight : '900'
    }
  });


export default function ViewProfile(props){
    const classes = useStyles();
    // const history = useHistory();

    // const goToProfile = (id) =>{
    //     if(id){
    //         console.warn("selected id is:", id);
    //     history.push(`/trainee/${id}`);
    // }
// }

function getImage(img){
    const image =  `./../../images/${img}`;
    return image;
}

    // const IMAGE = (img) =>{
    //     return `./../../images/${img}`
    // }


    // const index = trainees.findIndex((element)=>{
    //     if(element.id === props.id){
    //         return element.id;
    //     }
    // })

    // const photo = IMAGE(trainees[index].image);
    getImage('virat.jpg');

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia 
                    className={classes.media}
                    image={props.img}
                    title={props.title}
                >
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                        {props.name}
                    </Typography>
                    <Typography variant="body1" component="h5">
                        {props.profile}
                    </Typography>
                </CardContent>
                </CardMedia>
            </CardActionArea>

            <CardActions className={classes.cardActions}>
                <div className={classes.button}>
                    <Link to={'/trainee/'+props.id} id={props.id}>
                        <Button size="small">
                            View Profile
                        </Button>
                    </Link>
                </div>
            </CardActions>
        </Card>
    )
}
