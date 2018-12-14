import * as React from 'react';
import './Deck.css';

class Deck extends React.Component<any, {}> {

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
                    {this.props.cards.map((card: any) =>
                        <li>
                        {'x'+ card.qty + ' - ' + (card.info.name.length > 15 ? card.info.name.substr(0, 14) + '...' : card.info.name)}
                        <button className="btn btn-sm btn-secondary add-button">x</button>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Deck;