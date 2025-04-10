import { useStore } from '@/src/store/Store';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, TextInput } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { API_URL } from '../config';
const DatePicker = ({ navigation }) => {
  const today = new Date();
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useStore();
  const { token } = useStore();
  const [selectedDate, setSelectedDate] = useState(new Date(
    Math.min(2005, today.getFullYear() - 1),
    2,
    Math.min(9, today.getDate())
  ));
  const [currentMonth, setCurrentMonth] = useState(new Date(
    Math.min(2005, today.getFullYear() - 1),
    2,
    1
  ));
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const { age, setAge } = useStore();
  const [isAgeEditing, setIsAgeEditing] = useState(false);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Generate years from 1900 to current year
  const currentYear = today.getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  // Calculate age whenever selectedDate changes
  useEffect(() => {
    const calculatedAge = calculateAge(selectedDate);
    if (calculatedAge !== "Selected date is in the future") {
      setAge(calculatedAge.toString());
    } else {
      setAge('');
    }
  }, [selectedDate]);

  // Generate days based on current selected month and year
  const getDaysInSelectedMonth = () => {
    const days = daysInMonth(selectedDate.getMonth(), selectedDate.getFullYear());
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const getDaysArray = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);

    let daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= days; i++) {
      // Only include days that are in the past
      const cellDate = new Date(year, month, i);
      if (cellDate <= today) {
        daysArray.push(i);
      } else {
        daysArray.push(null);
      }
    }

    return daysArray;
  };

  const handleDayPress = (day) => {
    if (day) {
      const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      setSelectedDate(newDate);
    }
  };

  const handleMonthSelect = (monthIndex) => {
    // When selecting month, make sure we don't go beyond current month in current year
    const year = selectedDate.getFullYear();
    let newDate;

    if (year === currentYear && monthIndex > today.getMonth()) {
      // If selecting future month in current year, default to current month
      newDate = new Date(year, today.getMonth(), Math.min(selectedDate.getDate(), today.getDate()));
      setCurrentMonth(new Date(year, today.getMonth(), 1));
    } else {
      newDate = new Date(year, monthIndex, Math.min(selectedDate.getDate(), daysInMonth(monthIndex, year)));
      setCurrentMonth(new Date(year, monthIndex, 1));
    }

    setSelectedDate(newDate);
    setShowMonthPicker(false);
  };

  const handleDaySelect = (day) => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    setSelectedDate(newDate);
    setShowDayPicker(false);
  };

  const handleYearSelect = (year) => {
    // Adjust day if it's invalid for the new year/month (e.g., Feb 29)
    const month = selectedDate.getMonth();
    const daysInNewMonth = daysInMonth(month, year);
    let day = Math.min(selectedDate.getDate(), daysInNewMonth);

    // If selecting current year, make sure we don't go beyond current month/day
    if (year === currentYear) {
      if (month > today.getMonth()) {
        // If selected month is in the future, default to current month
        const newDate = new Date(year, today.getMonth(), Math.min(day, today.getDate()));
        setSelectedDate(newDate);
        setCurrentMonth(new Date(year, today.getMonth(), 1));
      } else if (month === today.getMonth() && day > today.getDate()) {
        // If selected day is in the future, default to current day
        day = today.getDate();
        const newDate = new Date(year, month, day);
        setSelectedDate(newDate);
        setCurrentMonth(new Date(year, month, 1));
      } else {
        const newDate = new Date(year, month, day);
        setSelectedDate(newDate);
        setCurrentMonth(new Date(year, month, 1));
      }
    } else {
      const newDate = new Date(year, month, day);
      setSelectedDate(newDate);
      setCurrentMonth(new Date(year, month, 1));
    }

    setShowYearPicker(false);
  };

  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    setCurrentMonth(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    // Only allow going to next month if it's not in the future
    if (nextMonth <= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(nextMonth);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);

    if (birthDateObj > today) {
      return "Selected date is in the future";
    }

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  };

  const handleAgeChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    setAge(cleanedText);
  };

  const handleAgeSubmit = () => {
    setIsAgeEditing(false);
    if (age && !isNaN(age)) {
      const ageNum = parseInt(age, 10);
      if (ageNum >= 0 && ageNum <= 120) {
        const today = new Date();
        const birthYear = today.getFullYear() - ageNum;
        const newDate = new Date(birthYear, selectedDate.getMonth(), selectedDate.getDate());

        // Check if the new date is in the future (birthday hasn't occurred yet this year)
        if (newDate > today) {
          newDate.setFullYear(birthYear - 1);
        }

        setSelectedDate(newDate);
        setCurrentMonth(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
      }
    }
  };

  const handleUpdate = async () => {
    if (userId != 0) {

      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/update-age/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            age: age,
          }),
        });

      } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Error', error.message || 'Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    console.log(`Selected date: ${formatDate(selectedDate)}`);
    console.log(`Age: ${age}`);
    navigation.goBack();
  };

  const daysArray = getDaysArray();
  const isCurrentMonth = currentMonth.getFullYear() === today.getFullYear() &&
    currentMonth.getMonth() === today.getMonth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your date of birth</Text>

      {/* Age Display/Edit Field */}
      <View style={styles.ageContainer}>
        <Text style={styles.ageLabel}>Age:</Text>
        {isAgeEditing ? (
          <TextInput
            style={styles.ageInput}
            value={age}
            onChangeText={handleAgeChange}
            onSubmitEditing={handleAgeSubmit}
            onBlur={handleAgeSubmit}
            keyboardType="numeric"
            maxLength={3}
            autoFocus
          />
        ) : (
          <TouchableOpacity
            style={styles.ageDisplay}
            onPress={() => setIsAgeEditing(true)}
          >
            <Text style={styles.ageText}>{age || 'Tap to enter age'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Date display with dropdown triggers */}
      <View style={styles.dateDisplayContainer}>
        <TouchableOpacity onPress={() => setShowMonthPicker(true)}>
          <Text style={styles.datePart}>{monthNames[selectedDate.getMonth()]}</Text>
        </TouchableOpacity>
        <Text style={styles.dateSeparator}>/</Text>
        <TouchableOpacity onPress={() => setShowDayPicker(true)}>
          <Text style={styles.datePart}>{selectedDate.getDate()}</Text>
        </TouchableOpacity>
        <Text style={styles.dateSeparator}>/</Text>
        <TouchableOpacity onPress={() => setShowYearPicker(true)}>
          <Text style={styles.datePart}>{selectedDate.getFullYear()}</Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.selectedDate}>{formatDate(selectedDate)}</Text> */}

      {/* Month Picker Modal */}
      <Modal visible={showMonthPicker} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <ScrollView>
              {monthNames.map((month, index) => {
                // Disable future months in current year
                const isFutureMonth = selectedDate.getFullYear() === currentYear && index > today.getMonth();
                return (
                  <TouchableOpacity
                    key={month}
                    style={[styles.pickerItem, isFutureMonth && styles.disabledPickerItem]}
                    onPress={() => !isFutureMonth && handleMonthSelect(index)}
                    disabled={isFutureMonth}
                  >
                    <Text style={[styles.pickerItemText, isFutureMonth && styles.disabledPickerItemText]}>
                      {month}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowMonthPicker(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Day Picker Modal */}
      <Modal visible={showDayPicker} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <ScrollView>
              {getDaysInSelectedMonth().map((day) => {
                // Disable future days in current month/year
                const isFutureDay = selectedDate.getFullYear() === currentYear &&
                  selectedDate.getMonth() === today.getMonth() &&
                  day > today.getDate();
                return (
                  <TouchableOpacity
                    key={day}
                    style={[styles.pickerItem, isFutureDay && styles.disabledPickerItem]}
                    onPress={() => !isFutureDay && handleDaySelect(day)}
                    disabled={isFutureDay}
                  >
                    <Text style={[styles.pickerItemText, isFutureDay && styles.disabledPickerItemText]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowDayPicker(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Year Picker Modal */}
      <Modal visible={showYearPicker} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <ScrollView>
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={styles.pickerItem}
                  onPress={() => handleYearSelect(year)}
                >
                  <Text style={styles.pickerItemText}>{year}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowYearPicker(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Calendar View */}
      <View style={styles.monthSelector}>
        <Text style={styles.monthYear}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={goToPreviousMonth}>
            <Text style={styles.arrow}>&lt;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goToNextMonth}
            disabled={isCurrentMonth}
          >
            <Text style={[styles.arrow, isCurrentMonth && styles.disabledArrow]}>&gt;</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.daysOfWeekContainer}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Text key={index} style={styles.dayOfWeek}>{day}</Text>
        ))}
      </View>

      <View style={styles.calendar}>
        {daysArray.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              day === selectedDate.getDate() &&
                currentMonth.getMonth() === selectedDate.getMonth() &&
                currentMonth.getFullYear() === selectedDate.getFullYear()
                ? styles.selectedDayContainer
                : null,
              !day ? styles.disabledDayContainer : null,
            ]}
            onPress={() => handleDayPress(day)}
            disabled={!day}
          >
            <Text
              style={[
                styles.day,
                day === selectedDate.getDate() &&
                  currentMonth.getMonth() === selectedDate.getMonth() &&
                  currentMonth.getFullYear() === selectedDate.getFullYear()
                  ? styles.selectedDay
                  : null,
                !day ? styles.disabledDay : null,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} color="#000000" size="large" />
      ) : (
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ageLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  ageDisplay: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    minWidth: 100,
  },
  ageInput: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    minWidth: 100,
    borderWidth: 1,
    borderColor: 'gray',
  },
  ageText: {
    fontSize: 18,
    textAlign: 'center',
  },
  dateDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  datePart: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 2,
  },
  dateSeparator: {
    fontSize: 18,
    marginHorizontal: 2,
  },
  selectedDate: {
    fontSize: 18,
    marginBottom: 20,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  monthYear: {
    fontSize: 16,
  },
  arrowContainer: {
    flexDirection: 'row',
  },
  arrow: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  disabledArrow: {
    color: 'lightgray',
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 5,
  },
  dayOfWeek: {
    width: 30,
    textAlign: 'center',
    color: 'gray',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  dayContainer: {
    width: 30,
    height: 30,
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledDayContainer: {
    backgroundColor: 'transparent',
  },
  day: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedDayContainer: {
    backgroundColor: 'seagreen',
  },
  selectedDay: {
    color: 'white',
  },
  disabledDay: {
    color: 'lightgray',
  },
  updateButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '60%',
    width: '80%',
  },
  pickerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pickerItemText: {
    fontSize: 18,
    textAlign: 'center',
  },
  disabledPickerItem: {
    backgroundColor: '#f5f5f5',
  },
  disabledPickerItemText: {
    color: 'lightgray',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'seagreen',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default DatePicker;