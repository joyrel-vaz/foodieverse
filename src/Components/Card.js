import React from 'react'
import './Card.scss'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';

export default function Card(props) {
    return (
        <div className="card">
            <div className="card__body">
                <img src={props.img}
                alt="Recipe img"
                className="card_image"/>
                <h4 className="card__title">{props.title}</h4>
                <p className="card__description">{props.description}</p>
                <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <button className="card__btn">View Recipe</button>
      </CardActions>
      
        </div>
        </div>
    )
}
