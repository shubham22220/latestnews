import React, { Component } from 'react'

export default class NewsItems extends Component {
  render() {
    let {title,description,url,author,date,source} =this.props;
    return (
      
      <div className="container mt-4">
        <div className="card">

          <img src={url} className="card-mg-top" alt="NOT FOUND" />

             <div className="card-body">

          <span className="badge rounded-pill bg-danger text-light" style={{ display: "flex", justifyContent: "flex-end" ,position:"absolute",right:'0px',top:'0px'}}>{source}</span>
          <h5 className="card-title">{title.split("",50)}...</h5>

        <p className="card-text">{description?description.split("",200):"Nothing"}</p>

          <p>By : {author?author:"Anonymous"}</p>

    <hr />

    <p>{new Date(date).toLocaleTimeString()}| {" "} {new Date(date).toDateString()}</p>
    
  </div>
        </div>
      </div>

    )
  }
}