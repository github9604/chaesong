import authentication from './authentication';
import recipe from './recipe';
import personalpage from './personalpage';
import personalgraph from './personalgraph';
import search from './search';
import recommendpage from './recommendpage';
import {combineReducers} from 'redux';
import ingredient from './ingredient';
import vegekeyword from './vegekeyword';

export default combineReducers({
    authentication,
    recipe,
    personalpage,
    search,
    ingredient,
    personalgraph,
    vegekeyword,
    recommendpage
});