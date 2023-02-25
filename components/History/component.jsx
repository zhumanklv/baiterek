import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRef } from "react";
import { SearchBar } from "@rneui/themed";
import { Touchable } from "react-native";
export const History = () => {
  const inputRef = useRef();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        inputRef.current.blur();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.historyTitle}>History</Text>
        <ScrollView>
          <SearchBar
            placeholder="Search..."
            containerStyle={styles.search}
            ref={inputRef}
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    position: "absolute",
    width: "90%",
    marginLeft: "5%",
  },
  historyTitle: {
    fontSize: 30,
    fontWeight: "500",
    marginTop: 30,
  },
  search: {
    backgroundColor: "white",
    borderTopColor: "white",
    borderBottomColor: "white",
  },
});
