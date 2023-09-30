import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

const Dropdown = ({ options, selectedOption, onSelect }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionSelect = (option) => {
    onSelect(option);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleDropdown}>
        <View style={styles.selectedOption}>
          <Text>{selectedOption}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          {/* Transparent overlay to close modal */}
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => handleOptionSelect(item)}>
                  <View style={styles.optionItem}>
                    <Text>{item}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* /// Multi select  */}
      <MultiSelect
                    style={styles.dropdown}
                    data={data}
                    labelField="label"
                    valueField="value"
                    label="Multi Select"
                    placeholder="Select item"
                    search
                    searchPlaceholder="Search"
                    value={selected}
                    onChange={item => {
                    setSelected(item);
                        console.log('selected', item);
                    }}
                    renderItem={item => _renderItem(item)}
                />
    </View>





  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent overlay
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Modal appears at the bottom
  },
  dropdown: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: screenWidth * 0.5,
    position: 'absolute',
    top: 0,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default Dropdown;

