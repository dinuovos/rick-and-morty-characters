import React, {ChangeEvent, ChangeEventHandler} from 'react'
import ListItem from './listItem'
import dataItem from './dataItem'
import './App.css';
import dataInnerItem from "./dataInnerItem";
import infoItem from "./infoItem";
import searchItem from "./searchItem";
import {characterUrl} from "./characterUrl";
import {keyStorage} from "./keyStorage";
import changeState from "./changeState";
import changeSearchParameters from "./changeSearchParameters";
import encodeQueryData from "./encodeQueryData";
import EpisodeItem from "./episodeItem"

class App extends React.Component<{}, { checkFav:boolean,searchItem:searchItem,info:infoItem,results:[],currentItem:dataInnerItem,errorString:string,page:number,favourites:string }> {
  constructor(props:dataItem) {
    super(props)
    this.state = {
      page:1,
      info: props.info,
      results:props.results,
      errorString : "",
      checkFav:false,
      favourites : localStorage.getItem(keyStorage) || "",
      searchItem : {
        name:"",
        status:"",
        species:"",
        type:"",
        gender:""
      },
      currentItem:{
        id:-1,
        name:"",
        status:"",
        species:"",
        type:"",
        gender:"",
        image:"",
        episode:[]
      }
    };
    this.changeModalItem = this.changeModalItem.bind(this)
    this.changeState = this.changeState.bind(this)
    this.toggleFavourite = this.toggleFavourite.bind(this)
  }
  changeModalItem(dataItem:dataInnerItem){
    this.setState({currentItem:dataItem});
    let modalDialog = document.getElementById('modal-dialog') as HTMLDialogElement
    modalDialog.showModal();
  }
  changeState = changeState;
  changePage(e:ChangeEvent<HTMLInputElement>){
    this.changeState(characterUrl+"?page="+e.target.value);
  }
  changeSearchParameters = changeSearchParameters;
  toggleFavourite(id:number){
    let favouritesSplitted = this.state.favourites ? this.state.favourites.split(",") : [];
    let isFavourite = favouritesSplitted.includes(""+id);
    let favourites = "";
    if(isFavourite){
      let isFavouriteIndex = favouritesSplitted.indexOf(""+id);
      favouritesSplitted.splice(isFavouriteIndex,1);
      favourites = favouritesSplitted.join(",");
    }
    else
      favourites=this.state.favourites ? this.state.favourites+","+id : ""+id;
    localStorage.setItem(keyStorage, favourites);
    let results = this.state.results;
    if(this.state.checkFav){
      results.splice(results.findIndex((v:dataInnerItem)=>v.id === id),1);
    }
    if(!results.length) {
      this.setState({checkFav: false,favourites});
      let url = "?" + encodeQueryData(this.state.searchItem) + "&page=" + this.state.page;
      this.changeState(characterUrl+url);
    }
    else
      this.setState({favourites,results});
  }
  changeViewFav(e:ChangeEvent<HTMLInputElement>){
    let checked = e.target.checked;
    this.setState({checkFav:checked});
    if(checked)
      this.changeState(characterUrl + "/" + this.state.favourites,true)
    else{
      let url = "?" + encodeQueryData(this.state.searchItem) + "&page=" + this.state.page;
      this.changeState(characterUrl+url);
    }
  }
  render() {
    let nextButton = this.state.info?.next ?
        <button onClick={()=>this.changeState(this.state.info.next || "")} style={{alignSelf: "flex-end",marginLeft: "auto"}}>Next page</button> : ""
    let prevButton = this.state.info?.prev ? <button onClick={()=>this.changeState(this.state.info.prev || "")}>Previous page</button> : <button style={{visibility:"hidden"}}>Previous page</button>
    let hideFavouritesCheck = this.state.favourites ? "" : "hide";
    let hideDetails = this.state.checkFav ? "hide" : "";
    return (
        <main>
          <label className={hideFavouritesCheck}>
            <input type="checkbox"
                   checked={this.state.checkFav}
                   onChange={this.changeViewFav.bind(this)}/>
            Show favourites</label>
          <header className={hideDetails}>
            <details>
              <summary>Open Search Parameters</summary>
              <section>
                <div className="class-form">
                  <label htmlFor="name" >Name:</label>
                  <input placeholder="name" name="name" id="name"
                         value={this.state.searchItem.name}
                         onChange={this.changeSearchParameters.bind(this)}/>
                </div>
                <div className="class-form">
                  <label htmlFor="status">Status:</label>
                  <select name="status" id="status" value={this.state.searchItem.status}
                          onChange={this.changeSearchParameters.bind(this)}>
                    <option selected disabled value="">Choose status</option>
                    <option value="alive">alive</option>
                    <option value="dead">dead</option>
                    <option value="unknown">unknown</option>
                  </select>
                </div>
                <div className="class-form">
                  <label htmlFor="species">Species:</label>
                  <input placeholder="species" id="species"
                         value={this.state.searchItem.species}
                         onChange={this.changeSearchParameters.bind(this)}/>
                </div>
                <div className="class-form">
                  <label htmlFor="type" >Type:</label>
                  <input placeholder="type"
                         id="type"
                         value={this.state.searchItem.type}
                         onChange={this.changeSearchParameters.bind(this)}/>
                </div>
                <div className="class-form">
                  <label htmlFor="gender" >Gender:</label>
                  <select name="gender" id="gender" value={this.state.searchItem.gender}
                          onChange={this.changeSearchParameters.bind(this)}>
                    <option selected disabled value="">Choose gender</option>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="genderless">genderless</option>
                    <option value="unknown">unknown</option>
                  </select>
                </div>
              </section>
            </details>
            <footer style={{display:"flex"}}>
            {prevButton}
              <div style={{flexGrow:1,textAlign:"center"}}>
                Page <input type="number"
                        value={this.state.page}
                        min="1" max={this.state.info.pages}
                        onChange={this.changePage.bind(this)}/> of {this.state.info.pages}</div>
            {nextButton}
            </footer>
          </header>
          <section className="main-section">
          {
            this.state.results.map((v:dataInnerItem,i:number) => {
              return <ListItem key={i} dataItem={v} changeModalItem={this.changeModalItem.bind(this)}
                               favourites={this.state.favourites} toggleFavourite={this.toggleFavourite.bind(this)}/>
            })
          }
          </section>
          <dialog id="modal-dialog">
            <form method="dialog">
              <div><b>Name:</b>{this.state.currentItem.name} </div>
              <div><b>Status:</b>{this.state.currentItem.status} </div>
              <div><b>Species:</b>{this.state.currentItem.species} </div>
              <div><b>Type:</b>{this.state.currentItem.type} </div>
              <div><b>Gender:</b>{this.state.currentItem.gender}</div>
              <div><b>Episodes:</b>{this.state.currentItem.episode.map((v:string,i:number) => {
                let episodeNumber = v.split("/").pop();
                return <EpisodeItem key={i} index={i} idString={episodeNumber} />
              })}</div>
              <div className="dialog-close">
                <button value="cancel"></button>
              </div>
            </form>
          </dialog>
          <dialog id="modal-dialog-error">
            <form method="dialog">
              <div>{this.state.errorString}</div>
              <div>
                <button value="cancel">Close</button>
              </div>
            </form>
          </dialog>
          <div id="modal-dialog-wait">
            <div>Loading data, please wait...</div>
          </div>
        </main>
    );
  }
}

export default App;
