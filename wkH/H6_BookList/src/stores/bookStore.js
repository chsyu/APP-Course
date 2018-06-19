import { observable, action } from 'mobx';
import libraryList from '../json/libraryList.json';

class BookStore {
    @observable state = {
        libraryList,
        book: {}
    };
    @action.bound
    selectBook(book) {
        this.state.book = book;
    }
}

export default new BookStore();

