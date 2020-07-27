const loggedReducer = ( state = {}, action) => {
    switch(action.type){
        case 'SIGN_IN': 
            return action.payload;
        case 'LOG_OUT':
            return {};
        default:    
            return {}
    }
}

export default loggedReducer