import React from 'react'

export default class EpisodeItem extends React.Component<{key:number,index:number,idString:string|undefined},{}> {
  render(){
    let url = `https://rickandmortyapi.com/api/episode/${this.props.idString}`
    return <span>
      {this.props.index>0 ? "," : ""}
      <a href={url} target="blank">#{this.props.idString}</a>
    </span>
  }
}