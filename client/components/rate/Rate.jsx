import React, { Component } from 'react';
import RateInput from './RateInput';
import RateResult from './RateResult';
import axios from "axios";

class Rate extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            data: null,
            movie:this.props.movie,
            isLoggedIn: sessionStorage.getItem('loggedIn') === 'true',
            done : false,
            author: sessionStorage.getItem('currentUser'),
            rate: 0,
        };
    }

    onSubmit(rateData) {
        this.setState({
            data: rateData
        });
    };

    componentWillMount() {
        axios
      .get("http://localhost:3000/api/searchRateByAuthor?movie="+this.state.movie+"&author="+this.state.author).
      then(res=>{
          if(res.data.rate.length>0)
        this.setState(
          {done: true,
            rate : res.data.rate[0].rate
          });
      });
    }

    render() {
        if(this.state.isLoggedIn){
            if(this.state.done){
                return(
                    <div>The Rate you chosen is {this.state.rate}</div>
                )
            }else
            return (
                <div>
                    <h2>New Rate:</h2><br />
                    <RateInput onSubmit={this.onSubmit} movie={this.state.movie}></RateInput>
                    <RateResult data={this.state.data} ></RateResult>
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


export default Rate;
