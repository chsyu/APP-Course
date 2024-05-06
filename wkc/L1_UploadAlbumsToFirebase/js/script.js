$(document).ready(function () {
  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyBBixpAodVLz3GxDGQooTYYjUUXeyu9bzA",
    authDomain: "f2e2021-44d38.firebaseapp.com",
    projectId: "f2e2021-44d38",
    storageBucket: "f2e2021-44d38.appspot.com",
    messagingSenderId: "657878254604",
    appId: "1:657878254604:web:50f895d5225f3006c81a29",
  });

  // REFERENCE FIREBASE DB
  const db = firebase.firestore();

  // REFERENCE DB COLLECTION
  const albumsRef = firebase.firestore().collection("albums");

  // Declare variables
  let filePath;

  // REGISTER JQUERY EVENTS
  $("#input-file").change(setFilePath);
  $("#jsonUpload").change(setFilePath);
  $("#btnUpload").click(uploadFileToFireStore);

  function setFilePath() {
    filePath = this.files[0];
    $(".input-label").append(filePath.name);
  }

  async function uploadFileToFireStore() {
    $("#btnUpload").html(
      `<span class = "spinner-border spinner-border-sm"></span>`
    );

    // Clear all documents in the collection
    try {
      const snapshot = await albumsRef.get()
      await snapshot.forEach(doc => {
          db.collection('albums').doc(doc.id).delete();
        });

      // Read the file and upload to Firebase
      const reader = new FileReader();
      reader.onload = function(event) {
        const jsonContent = event.target.result;
        
        try {
          const jsonArray = JSON.parse(jsonContent);
          
          // Assuming the JSON array contains album objects
          jsonArray.forEach(album => {
            albumsRef.add(album)
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
          });
          
          alert('JSON data uploaded to Firebase successfully!');
          $("#btnUpload").html(`Upload`);
          
        } catch (error) {
          console.error('Error parsing JSON file: ', error);
          alert('Error parsing JSON file. Please make sure the file is valid JSON.');
          $("#btnUpload").html(`Upload`);
        }
      };
      
      reader.readAsText(filePath);      
    } catch (error) {
      console.error('Error deleting documents: ', error);
      alert('Error uploading documents. Please try again.');
      $("#btnUpload").html(`Upload`);
    }

  }
});
