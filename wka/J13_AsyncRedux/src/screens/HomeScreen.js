import React, { useEffect, useState } from "react";
import { Box } from "native-base";
import { useSelector, useDispatch } from "react-redux";

import List from "../components/List";
import { getBooks } from "../redux/actions/apiActions";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { bookData } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(getBooks());
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
