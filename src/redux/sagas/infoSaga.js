import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//write POST saga to handle input from the INFO page
function* postToShelf(action){
    
    try{
        //create POST request to server
        yield axios.post('/api/shelf', action.payload, config);

        //write dispatch to the reducer?
    }
    catch(error){
        console.log('Error with shelf post:', error);
    }
}

function* infoSaga(){
    yield takeLatest('ADD_TO_SHELF',postToShelf);
}


export default infoSaga;