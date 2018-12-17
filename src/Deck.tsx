import * as React from 'react';
import './Deck.css';

class Deck extends React.Component<any, {totalCards: number, cards:any, name:string, selectedFormat: string, formats: any}> {

    constructor(props: any) {
        super(props);
        this.state = {
            cards: [],
            name: '',
            selectedFormat: '',
            formats: [], 
            totalCards: 0
        };
    }

    componentWillMount(){
        fetch('https://api.magicthegathering.io/v1/formats')
        .then ((response: any) => response.json())
        .then (formats => {
            this.setState({
                formats: formats.formats
            })
        }) 
    }

    public render() {
        setInterval(()=> {
            this.cardTotal()
        }, 1000)
        return (
            <div className="well">
                <h4>Deck Builder</h4>
                <input placeholder="Deck Name" className="form-control" onBlur={evt => this.updateInputValue(evt)}/>
                <select defaultValue="" className="form-control" onChange={evt => this.handleChange(evt)}>
                <option value="" disabled>Select Format</option>
                {this.state.formats.map((format:any, index: number) => 
                    <option value={format} key={index}>{format}</option>)}
                </select>
                <hr/>
                <h2><span className="label label-default">{this.state.name != '' ? 'Deck: ' + this.state.name : null }</span></h2>
                <h5>{this.state.totalCards > 0 ? 'Cards Total: ' + this.state.totalCards : null }</h5>
                <ul>
                    {this.props.cards.map((card: any, index: number) =>
                        <li key={card.info.id}>
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

    updateInputValue(evt: any) {
        this.setState({
            name: evt.target.value 
        });
    }

    handleChange(evt: any) {
        this.setState({ 
          selectedFormat: evt.target.value 
        });
    }

    cardTotal(){
        let total: number = 0;
        this.props.cards.map((card: any) => {
            total += card.qty 
        })

        this.setState({
            totalCards: total
        })
    }
}



export default Deck;