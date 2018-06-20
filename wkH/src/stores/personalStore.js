import * as firebase from 'firebase';
import { observable, action } from 'mobx';

class PersonalStore {
    @observable state = {
        email: null,
        username: null,
        city: null,
        phone: null,
        gender: null
    };

    @action.bound
    clearPersonalStore() {
        this.state = {
            email: null,
            username: null,
            city: null,
            phone: null,
            gender: null
        };
    }

}

export default new PersonalStore();

