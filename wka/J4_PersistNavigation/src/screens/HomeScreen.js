import React, { useEffect, useState } from "react";
import { Box } from "native-base";
import { useSelector, useDispatch } from "react-redux";

import List from "../components/List";
import { getBooksAsync } from "../redux/store/contentSlice";
import { selectBookData } from "../redux/store/contentSlice";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const bookData = useSelector(selectBookData);

  useEffect(() => {
    dispatch(getBooksAsync());
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
