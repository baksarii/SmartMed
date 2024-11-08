import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker"; // Picker 임포트

export default function AlertSet() {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [tempTime, setTempTime] = useState(new Date());

  const [selectedDays, setSelectedDays] = useState([]);
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const [startDate, setStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);

  const [duration, setDuration] = useState(7); // 복약 기간
  const [tempDuration, setTempDuration] = useState(7); // 임시 상태 추가
  const [showDurationPicker, setShowDurationPicker] = useState(false); // Picker 표시 상태

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) setTempTime(selectedTime);
  };

  const applySelectedTime = () => {
    setTime(tempTime);
    setShowPicker(false);
  };

  const handleDaySelect = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const calculateEndDate = () => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + duration - 1); // 복약 시작일 포함해서 계산
    return endDate.toLocaleDateString("ko-KR");
  };

  const applyDuration = () => {
    setDuration(tempDuration);
    setShowDurationPicker(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>알림 설정</Text>

      <Text style={styles.label}>알림 시간</Text>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.timeButton}
      >
        <Text style={styles.timeText}>{time.toLocaleTimeString("ko-KR")}</Text>
      </TouchableOpacity>

      {showPicker && (
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={tempTime}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={handleTimeChange}
          />
          <TouchableOpacity
            onPress={applySelectedTime}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.label}>요일 설정</Text>
      <View style={styles.dayContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDays.includes(day) && styles.selectedDayButton,
            ]}
            onPress={() => handleDaySelect(day)}
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>복약 시작일</Text>
      <TouchableOpacity
        onPress={() => setShowStartDatePicker(true)}
        style={styles.timeButton}
      >
        <Text style={styles.timeText}>
          {startDate.toLocaleDateString("ko-KR")}
        </Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="calendar"
          onChange={handleStartDateChange}
        />
      )}

      <Text style={styles.label}>복약 기간 (일)</Text>
      <TouchableOpacity
        onPress={() => setShowDurationPicker(true)}
        style={styles.timeButton}
      >
        <Text style={styles.timeText}>{duration} 일</Text>
      </TouchableOpacity>

      {showDurationPicker && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tempDuration}
            onValueChange={(value) => setTempDuration(value)}
            style={styles.picker}
          >
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <Picker.Item key={day} label={`${day} 일`} value={day} />
            ))}
          </Picker>
          <TouchableOpacity
            onPress={applyDuration}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.endDateText}>
        알림은 {calculateEndDate()}에 중단됩니다.
      </Text>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => alert("알림 설정이 저장되었습니다!")}
      >
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: { fontSize: 18, marginVertical: 10 },
  timeButton: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  timeText: { fontSize: 18 },
  pickerContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
  },
  confirmButtonText: { color: "#fff", fontWeight: "bold" },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  dayButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 5,
  },
  selectedDayButton: { backgroundColor: "#007bff" },
  dayText: { color: "#fff" },
  picker: {
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  endDateText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
});
