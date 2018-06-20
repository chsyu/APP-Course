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

    @action.bound
    saveInfoToFirebase = async () => {
        const { currentUser } = firebase.auth();
        let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
        try {
            await dbUserid.set({ ...this.state });
        } catch(e) {
            console.log(e);
        }
    }
}

export default new PersonalStore();

