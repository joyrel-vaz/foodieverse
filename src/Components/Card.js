import React, { useEffect } from 'react'
import './Card.scss'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import {ToggleButton , ButtonGroup} from 'react-bootstrap';
import {IconButton} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import {Button , Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {delFavorites, addFavorites , getFavorites} from '../api.js'
import { useAuth } from '../Contexts/AuthContext'
import DeleteIcon from '@material-ui/icons/Delete';

export default function Card(props) {
    const { currentUser } = useAuth();
    const [favs,setFavs] = React.useState([]);
    const [error,setError] = React.useState('');
    const [data,setData] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true);

    const [isLiked,setIsLiked] = React.useState(favs.includes(props.id))

    const handleChange =(e) => {
      setIsLiked(e.currentTarget.checked)
  
    }
    const modifyFavorites = async() =>{
      try {
    if(!isLoading){
      if(isLiked)
        addFavorites(currentUser.email,props.id);
      else 
        {delFavorites(currentUser.email,props.id);
        //console.log('in delete')
        }
        
      }
      
      } catch (error) {
        setError(error)
      }}

    

    const getAll = async() =>{
      try {
      setData(await getFavorites(currentUser.email))        
      } catch (error) {
        setError(error)
      }
    }

  
    useEffect(() =>{
      modifyFavorites();
      getAll();}
    ,[isLiked])

    useEffect(() =>{
      //console.log(isLiked + props.id)
      if(data.length > 0)
        setFavs(data[0].Favorites);
        setIsLoading(false);
    },[data])


    return (
        <div className="card">
          {error && <Alert variant="danger">{error}</Alert>}
            <div className="card__body">
                <img src={props.img}
                alt="Recipe img"
                className="card__image"/>
                <h4 className="card__title">{props.title}</h4>
                <p className="card__description">{props.description}</p>
                <CardActions disableSpacing>
                  { props.isMyFav === undefined ? 
                  <div>
                  <ButtonGroup toggle className="mb-2">
                <ToggleButton
                    type="checkbox"
                    variant={favs.includes(props.id) || isLiked ? "danger":"secondary"}
                    checked={isLiked}
                    value="1"
                    onChange={e => handleChange(e)}
        >
                <FavoriteIcon />
                </ToggleButton>    
                </ButtonGroup></div>
                :
                <div>
                <Button
                type="button"
                variant="danger"
                onClick={() => {delFavorites(currentUser.email, props.id) ; 
                  //console.log('have clicked on delete')
                  props.setChanged(!props.changed)}}
                >
                <FavoriteIcon />
                </Button></div>
                
              }
    
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Link to={{ pathname:`/recipefull/${props.id}`,
                    state:{
                      id:props.id,
                      title:props.title,
                      instructions:props.instructions,
                      ingredients:props.ingredients,
                      img:props.img,
                      description:props.description
                      
                    }     
                      
                    }}>
  
        <Button variant="outline-danger" className="card__btn">
          <span>View Recipe</span>
          </Button>
        </Link>
      </CardActions>
      
        </div>
        </div>
    )
}
