import React, {Component} from 'react'
import {getImageSearch} from '../api.js'
import {Button} from 'reactstrap'

class SearchImage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        image: null,
        tags: null,
        url: '',
        error: null
      };
  
      this.onImageChange = this.onImageChange.bind(this);
      this.onUrlChange = this.onUrlChange.bind(this);
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
          console.log(this.state.url);
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

              

              <Button type="button" onClick={this.onAnalyse}>Analyse</Button>
              {this.state.tags && console.log("this is state"+this.state.tags.result)}
            </div>
          </div>
        </div>
      );
    }
  }
  export default SearchImage;
  
