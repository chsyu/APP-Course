import React, { memo } from "react";
import { Text, Pressable, useColorMode } from "native-base";

const FilterComponent = (props) => {
  const { filterDay, filterText, selectedRange, setSelectedRange } = props;
  const { colorMode } = useColorMode();
  const isFilterSelected = (filter) => filter === selectedRange;
  const filteredColor = colorMode === "dark" ? "#1e1e1e" : '#0e7490';
  const unFilteredColor = "transparent";

  return (
    <Pressable
      px="2"
      py="1"
      borderRadius="md"
      bg={isFilterSelected(filterDay) ? filteredColor : unFilteredColor}
      onPress={() => setSelectedRange(filterDay)}
    >
      <Text style={{ color: isFilterSelected(filterDay) ? "white" : colorMode === "dark" ? "lightgray" : "black" }}>{filterText}</Text>
    </Pressable>
  );
};

export default memo(FilterComponent);
