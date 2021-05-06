import React, {Component} from 'react';
import './CharDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

export default class ItemDetails extends Component {

    state = {
        item: null
    }

    componentDidMount() {
        this.updateChar();
    }

    // всегда делать проверку с предыдущим компонентом, чтобы не создавать бесконечный цикл
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.itemId !== prevProps.itemId) {
            this.updateChar();
        }

    }

    updateChar ()  {
       const {itemId, getData} = this.props;

       if(!itemId) {
           return;
       }

       getData(itemId)
           .then((item) => {
               this.setState({item});
           })
    }

    render() {

        const {item} = this.state;

        if(!item) {
            return <span className='select-error'>Please select item in the list</span>
        }

        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                </ul>
            </div>
        );
    }

}

//React.Children.map(children, function[(thisArg)]) - Вызывает функцию для каждого непосредственного потомка,
// содержащегося в children передавая их по очереди в thisArg. Если children — это массив, он будет пройден,
// и функция будет вызвана для каждого потомка в массиве.
// Если children равен null или undefined, этот метод вернёт null или undefined, а не массив.

//React.cloneElement(child, {char}) - Клонирует и возвращает новый React элемент, используя элемент в качестве отправной точки.
// Полученный элемент будет иметь пропсы исходного элемента, а новые пропсы будут поверхностно слиты воедино.
// Новые дочерние элементы заменят существующие.