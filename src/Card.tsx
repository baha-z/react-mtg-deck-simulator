import * as React from 'react';
import './Card.css';

class Card extends React.Component<any, {}> {
    public render() {
        return (
            <div className="row">
                <div className="card-image col-lg-6">
                    <img src={this.props.selectedCard.imageUrl} alt={this.props.selectedCard.name}/>
                </div>
                <div className="card-info col-lg-5 text-left">
                    <h4>{this.props.selectedCard.name}</h4>
                    <dt className="card-info-item col-lg-7">{this.props.selectedCard.manaCost ? "Mana Cost" : null}</dt>
                    <dd className="card-info-item col-lg-5">{this.props.selectedCard.manaCost}</dd>
                    <dt className="card-info-item col-lg-7">{this.props.selectedCard.originalType ? "Types" : null}</dt>
                    <dd className="card-info-item col-lg-5">{this.props.selectedCard.originalType}</dd>
                    <dt className="card-info-item col-lg-12">{this.props.selectedCard.text ? "Card Text" : null}</dt>
                    <dd className="card-info-item col-lg-12"><em>{this.props.selectedCard.text}</em></dd>
                    <dt className="card-info-item col-lg-12">{this.props.selectedCard.flavor ? "Flavor Text" : null}</dt>
                    <dd className="card-info-item col-lg-12"><em>{this.props.selectedCard.flavor}</em></dd>
                    <dt className="card-info-item col-lg-7">{this.props.selectedCard.setName ? "Expansion" : null}</dt>
                    <dd className="card-info-item col-lg-5">{this.props.selectedCard.setName}</dd>
                    <dt className="card-info-item col-lg-7">{this.props.selectedCard.rarity ? "Rarity" : null}</dt>
                    <dd className="card-info-item col-lg-5">{this.props.selectedCard.rarity}</dd>
                    <dt className="card-info-item col-lg-7">{this.props.selectedCard.number ? "Card Number" : null}</dt>
                    <dd className="card-info-item col-lg-5">{this.props.selectedCard.number}</dd>
                    <dt className="card-info-item col-lg-7">{this.props.selectedCard.artist ? "Artist" : null}</dt>
                    <dd className="card-info-item col-lg-5">{this.props.selectedCard.artist}</dd>
                </div>
            </div>
        )
    } 
}

export default Card;