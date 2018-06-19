import {observable} from 'mobx';

class CounterStore {
    @observable count = 0;
}

export default new CounterStore();

