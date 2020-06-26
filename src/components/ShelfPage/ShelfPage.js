import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShelfPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_SHELF_ITEMS' });
    }


state = {
    image_url: '',
    description: ''
}


addToShelf = () => {
    console.log('In add to shelf')
    console.log('state/payload is:', this.state)
    this.props.dispatch({ type: 'ADD_TO_SHELF', payload: this.state });
    this.setState({
        image_url: '',
        description: ''
    })
}

updateUrl = (event) => {
    console.log('image_url is:', event.target.value);
    this.setState({
        ...this.state,
        image_url: event.target.value
    })
}

updateDescription = (event) => {
    console.log('description is:', event.target.value);
    this.setState({
        ...this.state,
        description: event.target.value
    })
}


    render() {
        return (
            <div>
                <p>Currently logged in as <b>{this.props.user.username}</b></p>

                <input onChange={(event) => this.updateUrl(event)} type="text" placeholder="Image URL"></input>
                <input onChange={(event) => this.updateDescription(event)} type="text" placeholder="Description"></input>
                <button onClick={this.addToShelf} >Add Item</button>
                <ul>
                    {this.props.items.map(item => (
                        <li>
                            Item on shelf: {item.image_url} | Description: {item.description}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(ShelfPage);
