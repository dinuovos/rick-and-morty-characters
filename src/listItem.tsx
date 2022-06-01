import React from 'react'
import dataInnerItem from "./dataInnerItem";

export default class ListItem extends React.Component<{key:number,dataItem:dataInnerItem,changeModalItem:Function,favourites:string|null,
  toggleFavourite:Function},{}> {
  render() {
    let isFavourite = this.props.favourites && this.props.favourites.split(",").includes(""+this.props.dataItem.id);
    let favouriteClass = isFavourite ? "favourite checked" : "favourite";
    return <figure className="item" ><img src={this.props.dataItem.image} alt={this.props.dataItem.name} width="300" height="300"/>
      <span className={favouriteClass} onClick={()=>this.props.toggleFavourite(this.props.dataItem.id)}></span>
      <figcaption>
        <div><b>Name:</b>{this.props.dataItem.name} <button onClick={()=>this.props.changeModalItem(this.props.dataItem)}>Show details</button></div>
      </figcaption>
    </figure>
  }
}