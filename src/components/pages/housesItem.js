import React, {Component} from 'react';
import ItemDetails, {Field} from "../CharDetails/ItemDetails";
import gotService from "../../services/gotService";

export default class HousesItem extends Component {
    gotService = new gotService();


    render() {
        return (
            <ItemDetails itemId={this.props.houseId}
                         getData={this.gotService.getHouse}
            >
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
                <Field field='overlord' label='Overlord'/>
            </ItemDetails>

        )
    }
}