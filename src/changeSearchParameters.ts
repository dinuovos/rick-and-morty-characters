import {ChangeEvent} from "react";
import encodeQueryData from "./encodeQueryData"
import {characterUrl} from "./characterUrl";

export default function changeSearchParameters(e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>){
    // @ts-ignore
    var $self = this;
    let target = e.target;
    let searchItem = $self.state.searchItem;
    // @ts-ignore
    searchItem[target.id] = e.target.value
    $self.setState({searchItem});
    let url = "?" + encodeQueryData($self.state.searchItem);
    $self.changeState(characterUrl+url);
}