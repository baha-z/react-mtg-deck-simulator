import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import mtg_logo from './Magicthegathering-logo.svg'
import Deck from './Deck';
import Card from './Card';

const mtg = require('mtgsdk');
class App extends React.Component<{}, 
{ inputValue: string, searchResult: any ,selectedSet: any, 
  selectedCard: any, sets: any, deckCards: any }> {

  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '',
      searchResult: [],
      selectedCard: {},
      selectedSet: '',
      sets: [],
      deckCards: [],
    };
    this.loadSets();
  }
  
  public render() {

    return (
      <div className="App">
        <div className="App-header">
          <img className="Mtg-logo" src={mtg_logo} alt="mtg_logo"/>
          <img className="App-logo" src={logo} alt="react-logo"/>
        </div>
        <div className="container">
          <div className="Card-list">
            <input placeholder="Card Name" className="form-control" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
            <select className="form-control" onChange={evt => this.handleChange(evt)}>
              {this.state.sets.map((set:any) => 
                <option key={set.code} value={set.code}>{set.name}</option>)}
            </select>
            <button className="btn btn-success search-button" onClick= {() => this.searchCard()}>Search</button>
              <ul>
                {this.state.searchResult.map((card: any) =>
                  <li key={card.id}>
                    <a onClick={() => this.selectCard(card)}>{card.name.length > 18 ? card.name.substr(0, 17) + '...' : card.name}</a>
                    <div className="btn-group add-buttons" role="group" aria-label="add-cards">
                      <button type="button" className="btn btn-sm btn-secondary" onClick={()=> this.updateDeck(true, card)}>+</button>
                      <button type="button" className="btn btn-sm btn-secondary" onClick={()=> this.updateDeck(false, card)}>-</button>
                    </div>
                  </li>
                )}
              </ul>            
          </div>

          <div className="Card-info">
            <Card selectedCard= {this.state.selectedCard} />    
          </div>
          <div className="Deck-container">
            <Deck cards={this.state.deckCards}/>
          </div>

        </div>
      </div>
    );
  }

  updateDeck(add: boolean, card: any){
  
    let deckCards: any = this.state.deckCards;
    let qty: number = 1;
    let index: number = 0;
    let updatedCard: any = {};
    let itsDuplicated: boolean = false;

    this.state.deckCards.map((deckCard:any, i: number)=> {
      if (deckCard.info.name === card.name ){
        qty = deckCard.qty;
        itsDuplicated = true;
        index = i;
        updatedCard = deckCard;
        if (add){
          qty++ 
        } else {
          qty-- 
        }
        updatedCard =
        {
        info: card,
        qty: qty
        }
      }
    })
      
    if (!itsDuplicated) {
      if (!add) {
        return
      } else {
        deckCards.push(
          {
          info: card,
          qty: qty
          })
      }
    } else {
      if (qty <= 0) {
        deckCards.splice(index,1);
      } else {
        deckCards.splice(index,1,updatedCard);
      }
    }

    this.setState({ 
      deckCards: deckCards,
    });
  }

  searchCard() {
    mtg.card.where({ name: this.state.inputValue, set: this.state.selectedSet })
    .then((cards: any) => {
      this.setState({
        searchResult: cards
      });   
    })
  }

  loadSets() {
    const sets: any = [{name: 'All sets', code: ''}]
    mtg.set.all()
    .on('data', (set: any) => {
      sets.push({name: set.name, code: set.code})
      this.setState({
        sets: sets
        })
    })
  }

  selectCard(card: any) {
    this.setState({
      selectedCard: card
    });
  }

  updateInputValue(evt: any) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  handleChange(evt: any) {
    this.setState({ 
      selectedSet: evt.target.value 
    });
  }

}

export default App;
