import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm'
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/images/marktwain.jpg?itok=JjdBNDn1',
        imageSource: 'wikimedia Commoms',
        books: [
            'The adventures of Huckleberry finn',
            'Life on the mississippi',
            'Roughin it'
        ]
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'https://www.biography.com/.image/t_share/MTIwNjA4NjMzNzc3MjYwMDQ0/joseph-conrad-9255343-1-402.jpg',
        imageSource: 'wikimedia Commoms',
        books: ['Heart of Darkness']
    },
    {
        name: 'J.k. Rowling',
        imageUrl: 'https://media1.popsugar-assets.com/files/thumbor/6j4QtP0kTb0cNF9A7vvMG2lWzbc/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2019/03/18/739/n/1922283/c460649f5c8fcb249041a7.72354065_/i/JK-Rowling-Backlash-LGBTQ-Inclusion-Comments.jpg',
        imageSource: 'wikimedia Commoms',
        imageAttribution: 'Daniel Ogren',
        books: ['Harry Potter and the sorcerers stone']
    },
    {
        name: 'Stephen King',
        imageUrl: 'https://assets3.thrillist.com/v1/image/2831641/size/sk-2017_04_featured_listing_mobile.jpg',
        imageSource: 'wikimedia Commoms',
        imageAttribution: 'Pinguino',
        books: ['The shining', 'IT']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'https://www.biography.com/.image/t_share/MTY2NTQ1NTM2OTM2MDYwMTQ2/charles-dickens.jpg',
        imageSource: 'wikimedia Commoms',
        books: ['David Copperfield', 'A tale of Two city']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'https://www.thoughtco.com/thmb/JAXvkwmi2O2IF0ITt3rSRKF3weU=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/william-shakespeare--portrait-of-william-shakespeare-1564-1616--chromolithography-after-hombres-y-mujeres-celebres-1877--barcelona-spain-118154739-59b9b0ec054ad900116fb824.jpg',
        imageSource: 'wikimedia Commoms',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    }
];

function getTurnData(authors){
    const allBooks = authors.reduce(function (p, c, i){
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return{
        books: fourRandomBooks,
        author: authors.find((author) => author.books.some((title) => title === answer))
    }
}

function resetState(){
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}

let state = resetState();

function onAnswerSelected(answer){
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}


function App(){
    return <AuthorQuiz {...state}
     onAnswerSelected={onAnswerSelected}
     onContinue = {() => {
         state = resetState();
         render();
     }}/>;
}

const AuthorWrapper = withRouter(({ history }) =>
   <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');
    }} />
);

function render(){
    ReactDOM.render(
    <BrowserRouter>
     <Route exact path='/' component={App} />
     <Route exact path='/add' component={AuthorWrapper} />
    </BrowserRouter>, document.getElementById('root'));
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
