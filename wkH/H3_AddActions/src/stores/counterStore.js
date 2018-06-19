import { observable, action } from 'mobx';

class CounterStore {
    @observable count = 0;

    @action.bound 
    incCounter() {
        this.count += 1;
    }

    @action.bound 
    decCounter() {
        this.count -= 1;
    }
}

export default new CounterStore();

