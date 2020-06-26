import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//write POST saga to handle input from the INFO page
function* postToShelf(action){
    
    try{
        //create POST request to server
        yield axios.post('/api/shelf', action.payload);
        //write dispatch to the reducer?
        yield put({ type: 'GET_SHELF_ITEMS' });
    }
    catch(error){
        console.log('Error with shelf post:', error);
    }
}

function* getItemFromServer(){

    try{
    const shelfItemsFromServerResponse = yield axios.get('/api/shelf');
        console.log(shelfItemsFromServerResponse.data)
    yield put({ type: 'SET_SHELF_ITEMS', payload: shelfItemsFromServerResponse.data});
    }catch(error){
        console.log('Shelf Get request failerd: error:', error);
    }
}

function* deleteItemFromServer(action){
    console.log('Inside of delete saga, action.payload', action.payload);
    try{
        yield axios.delete(`/api/shelf/${action.payload}`);

        yield put({ type: 'GET_SHELF_ITEMS'});
    }catch(error){
        console.log('Shelf Delete request failed, error:', error);
    }
}

function* infoSaga(){
    yield takeLatest('ADD_TO_SHELF',postToShelf);
    yield takeLatest('GET_SHELF_ITEMS', getItemFromServer);
    yield takeLatest('DELETE_ITEM', deleteItemFromServer);
}


export default infoSaga;