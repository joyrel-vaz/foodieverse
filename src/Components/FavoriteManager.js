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

    const addFav = async() => {
            if(currentUser === null)
            sendLogin();
        else
        {console.log(props.id)
          setIsLiked(true);
          setChange(!change)
          await addFavorites(currentUser.email,props.id);
        console.log('add to favs')
}
    }

    const delFav = async() =>{
          if(currentUser === null)
          sendLogin();
      else
      {
        setIsLiked(false);
        setChange(!change)
        await delFavorites(currentUser.email,props.id);
}
    }
  
    const sendLogin = () =>{
        history.push({
            pathname: '/login',
            state: { id : props.id}});
    }

    useEffect(() =>{
      setIsLiked(favs.includes(props.id));
    },[favs])

    useEffect(() =>{
        if(currentUser !== null)
      getAll();
    },[change])


    return (
        <div>
        { props.isMyFav === undefined ? 
            <div>      
            {isLiked ?
          <Button
              variant="danger"
              onClick={delFav}>
          <FavoriteIcon />
           </Button>   
           :
           <Button
              variant="light"
              onClick={addFav}>
          <FavoriteIcon />
           </Button>   
           }
          </div>
            :
          <div>
          <Button
          type="button"
          variant="danger"
          onClick={delFav}
          >
            <FavoriteIcon/>
          </Button>
          </div>
          }
          </div>
    );

}
