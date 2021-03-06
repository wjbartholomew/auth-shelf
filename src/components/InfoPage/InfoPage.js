import React, { Component } from 'react';
import { connect } from 'react-redux';

class InfoPage extends Component {

  
  componentDidMount() {
    // used to populate our shelf info page on load of the component
    this.getShelfItems();
  }


// holds information about our item for posting to database
  state = {
    image_url: '',
    description: ''
  }


// used to get 
  getShelfItems = () => {
    this.props.dispatch({ type: 'GET_SHELF_ITEMS' });
  }


  // sends a dispatch with information about an item to be added to the database
  // updates reducer with getShelfItems afterwards
  addToShelf = () => {
    console.log('In add to shelf');
    console.log('state/payload is:', this.state);
    this.props.dispatch({ type: 'ADD_TO_SHELF', payload: this.state });
    this.setState({
      image_url: '',
      description: ''
    })
    this.getShelfItems();
  }


  // tracks changes to input field
  updateUrl = (event) => {
    console.log('image_url is:', event.target.value);
    this.setState({
      ...this.state,
      image_url: event.target.value
    });
  }


  // tracks changes to input field
  updateDescription = (event) => {
    console.log('description is:', event.target.value);
    this.setState({
      ...this.state,
      description: event.target.value
    });
  }

  //allows a user to delete a specific item based on its ID
  deleteItem = (event) => {
    console.log('in deleteItem');
    console.log('payload:', event.target.value);
    this.props.dispatch({ type: 'DELETE_ITEM', payload: event.target.value });
    this.getShelfItems();
  }


  render() {
    return (
      <div>
        <p>Currently logged in as <b>{this.props.user.username}</b></p>

        <input value={this.state.image_url} onChange={(event) => this.updateUrl(event)} type="text" placeholder="Image URL"></input>
        <input value={this.state.description} onChange={(event) => this.updateDescription(event)} type="text" placeholder="Description"></input>
        <button  onClick={this.addToShelf} >Add Item</button>
       
        <ul>
          {this.props.info.map(item => (
            <li key={item.id}>
              Item on shelf: <img src={item.image_url} alt={item.description}/> | Description: {item.description}
               <br />
              <button onClick={(event)=>this.deleteItem(event)} value={item.id}>Delete Item</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  info: state.info,
});

export default connect(mapStateToProps)(InfoPage);




