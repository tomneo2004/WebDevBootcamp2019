import React, {Component} from 'react';
import tachyons from "tachyons";
import SearchBox from "../Components/SearchBox";
import {searchCharacter} from "../StarWarUtil";
import CardList from "../Components/CardList";


class App extends Component{

  constructor(){
    super();

    this.state = {
      searchKeyword: "",
      characters: []
    }
  }

  onSearch = (event) => {

    this.setState({searchKeyword:event.target.value});
  }

  componentDidMount(){

    searchCharacter(this.state.searchKeyword)
    .then((result)=>{
      this.setState({characters:result});
    })
  }

  render(){

    const filterList = this.state.characters.filter((cha)=>{

        if(cha.name.toLowerCase().includes(this.state.searchKeyword.toLowerCase())){
          return true;
        }

        return false;
    });

    return(

      <div className="tc">
        <h1>Star War Database</h1>
        <hr />
        <SearchBox onSearch={this.onSearch}/>
        <CardList characters={filterList} />
      </div>
    );
  }
}

export default App;
