import React, { useEffect, useState } from "react";
import { Box } from "native-base";
import List from "../components/List";
import { getBooksAPI } from "../api";


const HomeScreen = ({ navigation }) => {

  const [bookData, setBookData] = useState([]);
  const getBooks = async () => {
    const bookData = await getBooksAPI();
    setBookData(bookData.data);
  }
  
  useEffect(() => {
    getBooks();
  }, [])

  return (
    <Box>
      <List 
        list={bookData}
        navigation={navigation}
      />
    </Box>
  );
};

export default HomeScreen;
