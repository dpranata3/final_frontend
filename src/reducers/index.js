import {combineReducers} from 'redux'

const init ={
    id:'',
    username:'',
    error:'',
    success:'',
    countCart:'',
    userStat:''
}


const AuthReducer = (state= init, action)=>{
    
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, id: action.payload.id, username: action.payload.username, userStat: action.payload.userStat}

        case 'TIMEOUT':
            return{...state, error:'', success:''}

        case 'LOGOUT':
            return {...state, ...init}

        case 'AUTH_ERROR':
            return {...state, error:action.payload, success:''}

        case 'AUTH_SUCCESS':
            return {...state,error:'', success:action.payload}

        case 'ADD_PROD_SUCCESS':
            return{...state,error:'', success:action.payload}

        case 'ADD_PROD_ERROR':
            return{...state,error:action.payload, success:''}

        case 'EDIT_PROD_SUCCESS':
            return{...state,error:'', success:action.payload}

        case 'EDIT_PROD_ERROR':
            return{...state,error:action.payload, success:''}

        default:
           return state

    }
}


export default combineReducers(
    {
        auth: AuthReducer
        
    }
)