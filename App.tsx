import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PanResponder,
} from 'react-native';

const {height} = Dimensions.get('window');

const contacts = [
  {letter: 'A', data: ['Alice', 'Albert']},
  {letter: 'B', data: ['Bob', 'Barbara']},
  {letter: 'C', data: ['Charlie', 'Chris']},
  {letter: 'D', data: ['David', 'Diana']},
  {letter: 'E', data: ['Edward', 'Ella']},
  {letter: 'F', data: ['Frank', 'Fiona']},
  {letter: 'G', data: ['George', 'Grace']},
  {letter: 'H', data: ['Henry', 'Hannah']},
  {letter: 'I', data: ['Isaac', 'Ivy']},
  {letter: 'J', data: ['Jack', 'Jessica']},
  {letter: 'K', data: ['Kyle', 'Kara']},
  {letter: 'L', data: ['Liam', 'Lucy']},
  {letter: 'M', data: ['Michael', 'Mia']},
  {letter: 'N', data: ['Nathan', 'Nina']},
  {letter: 'O', data: ['Oliver', 'Olivia']},
  {letter: 'P', data: ['Paul', 'Pamela']},
  {letter: 'Q', data: ['Quincy', 'Quinn']},
  {letter: 'R', data: ['Robert', 'Rachel']},
  {letter: 'S', data: ['Samuel', 'Sophie']},
  {letter: 'T', data: ['Thomas', 'Tina']},
  {letter: 'U', data: ['Ulysses', 'Uma']},
  {letter: 'V', data: ['Victor', 'Vera']},
  {letter: 'W', data: ['William', 'Wendy']},
  {letter: 'X', data: ['Xander', 'Xena']},
  {letter: 'Y', data: ['Yale', 'Yvonne']},
  {letter: 'Z', data: ['Zachary', 'Zara']},
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function ContactList() {
  const sectionListRef = useRef(null);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const scrollToSection = letter => {
    setSelectedLetter(letter);
    const index = contacts.findIndex(section => section.letter === letter);
    if (index >= 0 && sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex: index,
        itemIndex: 0,
        animated: false, // No animation for fast scrolling
      });
    }
  };

  // PanResponder to detect sliding over the letters
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const touchY = gestureState.moveY; // Y position of the touch
        const letterIndex = Math.floor((touchY / height) * alphabet.length); // Calculate which letter the user is on
        if (letterIndex >= 0 && letterIndex < alphabet.length) {
          scrollToSection(alphabet[letterIndex]);
        }
      },
      onPanResponderRelease: () => {
        setSelectedLetter(null); // Clear the highlight when the user stops sliding
      },
    }),
  ).current;

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {/* Contact List */}
      <SectionList
        ref={sectionListRef}
        sections={contacts}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Text style={styles.contactItem}>{item}</Text>}
        renderSectionHeader={({section: {letter}}) => (
          <Text style={styles.sectionHeader}>{letter}</Text>
        )}
      />

      {/* Alphabet Sidebar */}
      <View style={styles.sidebarContainer} {...panResponder.panHandlers}>
        {alphabet.map(letter => (
          <TouchableOpacity
            key={letter}
            onPress={() => scrollToSection(letter)}>
            <Text
              style={[
                styles.sidebarLetter,
                selectedLetter === letter && styles.selectedLetter,
              ]}>
              {letter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
    padding: 5,
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sidebarContainer: {
    position: 'absolute',
    right: 10,
    top: 100,
    height: '80%',
    justifyContent: 'space-between',
  },
  sidebarLetter: {
    fontSize: 16,
    paddingVertical: 5,
    color: 'blue',
  },
  selectedLetter: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 24,
  },
});
