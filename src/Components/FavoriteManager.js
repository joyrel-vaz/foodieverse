import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import {delFavorites, addFavorites , getFavorites} from '../api.js'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useAuth } from '../Contexts/AuthContext'
import {Button} from 'react-bootstrap'

export function FavoriteManager(props){
    const { currentUser } = useAuth();
    const [favs,setFavs] = React.useState([]);
    const [isLiked,setIsLiked] = React.useState('');
    const [change,setChange] = React.useState();

    const history = useHistory();

    const getAll = async() =>{
      const data = await getFavorites(currentUser.email);  
      setFavs(data[0].Favorites)      
    }
  
    const sendLogin = () =>{
        history.push({
            pathname: '/login',
            state: { id : props.id}});
    }

    useEffect(() =>{
      setIsLiked(favs.includes(props.id));
      console.log(favs)
    },[favs])

    useEffect(() =>{
        if(currentUser !== null)
      getAll();
      console.log('getting all')
    },[change])


    return (
        <div>
        { props.isMyFav === undefined ? 
            <div>       
            {isLiked ?
          <Button
              variant="danger"
              onClick={() => {
                  if(currentUser === null)
                    sendLogin();
                else
                {delFavorites(currentUser.email,props.id);
                setIsLiked(false);
                setChange(!change)}}}>
          <FavoriteIcon />
           </Button>   
           :
           <Button
              variant="secondary"
              onClick={() => {
                if(currentUser === null)
                    sendLogin();
                else
                {addFavorites(currentUser.email,props.id);
                console.log('add to favs')
                setIsLiked(true);
              setChange(!change)}}}>
          <FavoriteIcon />
           </Button>   }
          </div>
          :
          <div>
          <Button
          type="button"
          variant="danger"
          onClick={() => {
            if(currentUser === null)
                sendLogin();  
            delFavorites(currentUser.email, props.id) ; 
            console.log('have clicked on delete')
            props.setChanged(!props.changed)}}
          >
          <FavoriteIcon />
          </Button></div>
        }
                  </div>
    );

}
