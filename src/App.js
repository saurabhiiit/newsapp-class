import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'


export default class  App extends Component {
  pageSize = 5;
  apiKey = "b83b2a34186b433a9325a157902a3760";
  // apiKey = process.env.local.REACT_APP_NEWS_API
  state = {
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress: progress})

  }
  render() {
    return (
      <div> 
        <BrowserRouter>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height = {3}
        
      />
      
        <Routes>
        
        {/* <News setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="sports"/> */}
        <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="general" country="in" category="general"/>} />
        <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="business" country="in" category="business"/>} />
        <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="entertainment" country="in" category="entertainment"/>} />
        <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="general" country="in" category="general"/>} />
        <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="health" country="in" category="health"/>} />
        <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="science" country="in" category="science"/>} />
        <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="sports" country="in" category="sports"/>} />
        <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="technology" country="in" category="technology"/>} />

        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
 