//write a reducer to recieve shelf items form saga axios get request from
//the server and write them to the redux store.

const infoReducer = (state=[], action)=>{
    switch (action.type){
        case 'SET_SHELF_ITEMS':
            return action.payload;
        default:
            return state;
    }
};

export default infoReducer;