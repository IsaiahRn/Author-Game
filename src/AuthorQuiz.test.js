import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const state = {
  turnData: {
    books: ['The shining', 'Harry potter', 'David Copperfield'],
    author:{
      name: 'J.k. Rowling',
      imageUrl: 'https://media1.popsugar-assets.com/files/thumbor/6j4QtP0kTb0cNF9A7vvMG2lWzbc/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2019/03/18/739/n/1922283/c460649f5c8fcb249041a7.72354065_/i/JK-Rowling-Backlash-LGBTQ-Inclusion-Comments.jpg',
      imageSource: 'wikimedia Commoms',
      books: ['Harry Potter and the sorcerers stone', 'David Copperfield']
    },
  },
  highlight: 'none'
}

describe("Author quiz", () => {
  it('rendrs withour crashing', () => {
    const div = document.createElement("div")
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}} />, div)
  });

  describe("When no answer has been selected", ()=>{
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}} />);
    });

    it("should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('')
    })
  });
  describe("When the wrong answer has been selected", ()=>{
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={() => {}} />);
    });

    it("should have a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red')
    })
  });
  describe("When the correct answer has been selected", ()=>{
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={() => {}} />);
    });

    it("should have a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green')
    })
  });
  describe("When the first answer is selected", ()=>{
    let wrapper;
    const handleAnswerSelected =  jest.fn();

    beforeAll(()=>{
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />);
      wrapper.find('.answer').first().simulate('click');
    });
    it("onAnswerSelected should be called", ()=>{
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it("should receive The shining", ()=>{
      expect(handleAnswerSelected).toHaveBeenCalledWith('The shining');
    });
  });
});
