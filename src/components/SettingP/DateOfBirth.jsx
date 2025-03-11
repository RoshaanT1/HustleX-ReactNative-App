import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DatePicker = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(new Date(2005, 2, 9)); // March is 2 because it starts from 0
  const [currentMonth, setCurrentMonth] = useState(new Date(2005, 2, 1));
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

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

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= days; i++) {
      daysArray.push(i);
    }

    return daysArray;
  };

  const handleDayPress = (day) => {
    if (day) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const daysArray = getDaysArray();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your date of birth</Text>
      <Text style={styles.selectedDate}>{formatDate(selectedDate)}</Text>

      <View style={styles.monthSelector}>
        <Text style={styles.monthYear}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={goToPreviousMonth}>
            <Text style={styles.arrow}>&lt;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNextMonth}>
            <Text style={styles.arrow}>&gt;</Text>
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

      <TouchableOpacity style={styles.updateButton} onPress={()=>navigation.goBack()}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent:'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DatePicker;
