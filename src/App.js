import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from "./components/Header/Header";
import RandomChar from "./components/RandomChar/RandomChar";
import BooksItem from './components/pages/booksItem';
import CharacterPage from "./components/pages/CharacterPage";
import HousesPage from "./components/pages/HousesPage";
import BooksPage from "./components/pages/BooksPage";
import ErrorMessage from "./components/errorMessage";
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CharacterItem from "./components/pages/characterItem";
import HousesItem from "./components/pages/housesItem";

export default class App extends Component  {

  state = {
    randomView: true,
    error: false
  }

  // если приложение упадет с ошибкой выведется сообщение для пользователя
  componentDidCatch(error, errorInfo) {
    this.setState({error: true})
  }


  toggleRandomChar = () => {
    this.setState((state) => {
      return {
        randomView: !state.randomView
      }
    })
  }

  render() {
    const {randomView, error} = this.state;

    const char = randomView ? <RandomChar interval={15000}/> : null;

    if(error) {
      return <ErrorMessage/>
    }

    return (
        <Router>
        <div className='app'>
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{size: 5, offset: 0}}>
                {char}
                <Button className='toggle-random-btn'
                        onClick={()=> this.toggleRandomChar()}
                >Toggle random character</Button>
              </Col>
            </Row>

            <Route path='/characters' exact component={CharacterPage}/>
            <Route path='/houses' exact component={HousesPage}/>
            <Route path='/books' exact component={BooksPage}/>
            <Route path='/books/:id' render={
              ({match, location, history}) => {
                const {id} = match.params;
                return <BooksItem bookId={id}/>
              }
            }/>
            <Route path='/characters/:id' render={
              ({match, location, history}) => {
                const {id} = match.params;
                return <CharacterItem charId={id}/>
              }
            }/>
            <Route path='/houses/:id' render={
              ({match, location, history}) => {
                const {id} = match.params;
                return <HousesItem houseId={id}/>
              }
            }/>

          </Container>
        </div>
        </Router>
    );
  }


}

//приходят при работе Route:
//match-объект с данными о том, как именно path совпал с текущим адресом, в нем есть параметр params.id
//location-объект состояние и положение нашего Route в настоящий момент (pathname: '/books/3')
//history-объект API для организации перехода между страницами