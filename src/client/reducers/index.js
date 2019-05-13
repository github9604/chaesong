import authentication from './authentication';
import recipe from './recipe';
import personalpage from './personalpage'
import search from './search';
import recommendpage from './recommendpage';
import {combineReducers} from 'redux';

export default combineReducers({
    authentication,
    recipe,
    personalpage,
    search,
    recommendpage
});