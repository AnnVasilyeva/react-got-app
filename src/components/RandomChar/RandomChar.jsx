import React, {Component} from 'react';
import './RandomChar.css';
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import PropTypes from 'prop-types';

export default class RandomChar extends Component {

    gotService = new GotService();

    state = {
       char: {},
        loading: true,
        error: false
    }

    //задаем значение интервала по умолчанию, если его не передадут в App.js
    static defaultProps = {
        interval: 15000
    }


    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
         const id = Math.floor(Math.random()*140 + 25); //25-140
        // const id = 1300000;
        // для проверки ошибки
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null; //если ошибка - выводится сообщение об ошибке
        const spinner = loading ? <Spinner/> : null; //если грузится - выводится спиннер

        const content = !(loading || error) ? <View char={char}/> : null;
            //если нет загрузки и нет ошибки - выводится контент

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

RandomChar.propTypes = {
    interval: PropTypes.number
}


const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}