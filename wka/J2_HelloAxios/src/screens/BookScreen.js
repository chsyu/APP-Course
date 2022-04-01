import React, { useEffect, useState } from "react";
import { Box } from "native-base";
import BookList from "../components/BookList";
import axios from "axios"


const BookScreen = ({ navigation }) => {

  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const bookData = await axios.get('http://example-data.draftbit.com/books?_limit=20');
      setBookData(bookData.data);
    }
    getBooks();
  }, [])

  return (
    <Box>
      <BookList
        list={bookData}
        navigation={navigation}
      />
    </Box>
  );
};

export default BookScreen;
