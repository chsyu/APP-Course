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

  async componentDidMount() {
    const { currentUser } = firebase.auth();
    let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
    try {
      let snapshot = await dbUserid.once('value');
      let username = snapshot.val().username;
      let email = snapshot.val().email;
      let city = snapshot.val().city;
      let phone = snapshot.val().phone;
      let gender = snapshot.val().gender;

      this.state = ({ username, email, city, phone, gender });
    } catch (err) { }
  }

}

export default new PersonalStore();

