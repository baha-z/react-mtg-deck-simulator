import * as React from 'react';
import './Deck.css';

class Deck extends React.Component<any, {cards:any, name:string, format: string}> {

    constructor(props: any) {
        super(props);
        this.state = {
            cards: [],
            name: '',
            format: ''
        };
    }

    public render() {
        return (
            <div className="well">
                <h4>Deck Builder</h4>
                <ul>
                    {this.props.cards.map((card: any, index: number) =>
                        <li>
                        {'x'+ card.qty + ' - ' + (card.info.name.length > 15 ? card.info.name.substr(0, 14) + '...' : card.info.name)}
                        <button className="btn btn-sm btn-secondary add-button" onClick={() => this.removeCard(index)}>x</button>
                        </li>
                    )}
                </ul>
            </div>
        )
    }

    removeCard(index:any) {
        const deck: any = this.props.cards.splice(index,1);
        this.updateDeckCards(deck);
    }

    updateDeckCards(deck: any) {
        this.setState({
            cards: deck
        });
    }
}



export default Deck;