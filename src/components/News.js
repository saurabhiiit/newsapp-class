import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps= {
        country : "in",
        paperSize: 8,
        category: 'general'
    }
    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
    }
    capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
            articles : [],
            //  articles: this.articles,
             loading: true,
             page:1,
             totalResults:0
        }
        
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
   }
   async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    this.setState({
        articles: parsedData.articles,
        totalResults:parsedData.totalResults,
        loading: false
    })
    this.props.setProgress(100);

   }
async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b83b2a34186b433a9325a157902a3760&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // this.setState({
    //     articles: parsedData.articles,
    //     totalResults:parsedData.totalResults,
    //     loading: false
    // })
    this.updateNews();
   }
   handlePrevClick= async()=>{

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b83b2a34186b433a9325a157902a3760&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // this.setState({
    //     page: this.state.page -1,
    //     articles:parsedData.articles,
    //     loading: false
    // })

    await this.setState({page:this.state.page - 1});
    this.updateNews();
   }

    handleNextClick=async ()=>{
       
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b83b2a34186b433a9325a157902a3760&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // this.setState({
    //     page: this.state.page +1,
    //     articles:parsedData.articles,
    //     loading: false
    // })
    await this.setState({page :this.state.page + 1});
    this.updateNews();
}

fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  
    this.setState({page:this.state.page + 1});
  
    // this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
        // loading: false
    })
  };


    render() {
    return (
      <>
        <h1 className="text-center" style={{margin:'35px 0',marginTop:'90px'}}>NewsMonekey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
         {this.state.loading &&  <Spinner/>} 
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
            <div className="container">
        <div className="row">
        {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
            {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://cdn.pixabay.com/photo/2016/10/26/19/00/domain-names-1772242_960_720.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
})}    
        </div>
        </div>
        </InfiniteScroll>
     
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News