import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItems from './NewsItems';
import Spinner from './Spinner';

export default class News extends Component {

    static defaultProps ={
        country:"in",
        pageSize:10,
        category:"general"
    }

    static propTypes ={
        country:PropTypes.string.isRequired,
        pageSize:PropTypes.number.isRequired,
        category:PropTypes.string.isRequired
    }



   articles =[
    
        ];
    
        constructor(props){
            super()
            console.log("im contructor");
            this.state ={
                articles:[],
                loading:false,
                page:1,
                totalResults:0,
               
            };
            document.title=`News - ${props.category}`
        }
        
       async componentDidMount(){
           this.props.setProgress(10);
           console.log("i am mouted");
           let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0b462f7386c470dbdb7868161206cdb&page=1&pageSize=${this.props.pageSize}`

           {this.setState({
               loading:true
           })}
           let data=await fetch(url);
           this.props.setProgress(30);
           let parsedData= await data.json();
           this.props.setProgress(50);
           console.log(parsedData);
           this.setState({articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false,
           
        
        
        });
        this.props.setProgress(100);
       }

    handlePrev = async () =>{
        this.props.setProgress(10);
        {this.setState({
            loading:true
        })}
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0b462f7386c470dbdb7868161206cdb&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        let data=await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);


        this.setState({
            page:this.state.page-1,
            articles:parsedData.articles,
        loading:false}
            )
            this.props.setProgress(100);

        
        
    }

    handleNext = async () =>{
        this.props.setProgress(10);

        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0b462f7386c470dbdb7868161206cdb&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        {this.setState({
            loading:true
        })}
        let data=await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({
            page:this.state.page+1,
            articles:parsedData.articles,
            loading:false
            
        })
        this.props.setProgress(100);

        
        
    }



  
  render() {
    return (
     <>
    {this.state.loading &&  <Spinner />}
     
<div className="container mt-3">

    <div className="row">

        {this.state.articles.map((element)=>{
            return(

                <div className="col-md-4" key={element.url}>

                    <NewsItems 
                    title={element.title}
                    description={element.description}
                    url={element.urlToImage}
                    linkUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    />

                </div>
            )

        })}
    </div>

    <div className="container d-flex justify-content-between">

    <button
              className="btn btn-dark"
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.handlePrev}
            >
              &laquo; Prev
            </button>

            <button className="btn btn-dark" onClick={this.handleNext} disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)}>
              Next &raquo;
            </button>
    </div>
    <br />



</div>


     
     </>
    )
  }
}