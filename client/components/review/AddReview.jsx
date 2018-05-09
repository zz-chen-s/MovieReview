import React, { Component } from 'react';
import AddReviewInput from './AddReviewInput';
import AddReviewResult from './AddReviewResult';
import axios from "axios";

class AddReView extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            data: null,
            movie:this.props.movie,
            isLoggedIn: sessionStorage.getItem('loggedIn') === 'true',
            done : false,
            author: sessionStorage.getItem('currentUser'),
        };
    }

    onSubmit(reviewData) {
        this.setState({
            data: reviewData
        });
    };

    componentWillMount() {
        axios
      .get("http://localhost:3000/api/searchReviewByAuthor?movie="+this.state.movie+"&author="+this.state.author).
      then(res=>{
        if(res.data.review.length>0)
        this.setState(
          {done: true,
          });
      });
    }

    render() {
        if(this.state.isLoggedIn){
            if(this.state.done){
                return(
                    <div>You have made review</div>
                )
            }else
            return (
                <div>
                    <h2>New Review:</h2><br />
                    <AddReviewInput onSubmit={this.onSubmit} movie={this.state.movie}></AddReviewInput>
                    <AddReviewResult data={this.state.data} ></AddReviewResult>
                </div>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }
}


export default AddReView;