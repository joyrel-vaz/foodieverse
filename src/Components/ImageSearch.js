import React, {Component} from 'react'
import {getImageSearch} from '../api.js'
import {Button} from 'reactstrap'

class SearchImage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        image: null,
        tags: null,
        error: null
      };
  
      this.onImageChange = this.onImageChange.bind(this);
      this.onAnalyse = this.onAnalyse.bind(this);
    }
  
    onImageChange = event => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        this.setState({
          image: URL.createObjectURL(img)
        });
      }
    };

    onAnalyse =async(taglist) => {
        try{
            //get user shopList
            taglist = await getImageSearch(this.state.image.slice(5, this.state.image.length));
            //console.log(taglist);
            this.setState({
                tags: taglist
              });
        }catch(err){
            this.setState({
                error: err
              });
        }  
      };
  
    render() {
      return (
        <div>
          <div>
            <div>
              <img src={this.state.image} />
              <h1>Select Image</h1>
              <input type="file" name="myImage" onChange={this.onImageChange} />
              {/* <p>{this.state.image}</p> */}
              <input type="text" name="imageURL" />
              <Button type="button" onClick={this.onAnalyse}>Analyse</Button>
              {console.log("this is state"+this.state.tags)}
            </div>
          </div>
        </div>
      );
    }
  }
  export default SearchImage;
  
