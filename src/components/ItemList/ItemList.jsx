import React, {Component} from 'react';
import './ItemList.css';
import Spinner from "../spinner";
import PropTypes from 'prop-types';

export default class ItemList extends Component {
    state = {
        itemList: null
    }

    //задаем значени е по умолчанию для onItemSelected
    static defaultProps = {
        onItemSelected: () => {}
    }

    //задаем что onItemSelected должна быть функцией
    static propTypes = {
        onItemSelected: PropTypes.func,
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({itemList})
            })
    }

    renderItems (arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);

            return (
                <li
                    className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}

                >
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList} = this.state;

        if(!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

