import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '@/constants';

export default function RecordScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <View style={styles.recordingIndicator}>
          <View style={styles.recordingDot} />
          <Text style={styles.recordingText}>Ready</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Timer */}
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>00:00</Text>
        <Text style={styles.timerLabel}>Tap to start recording</Text>
      </View>

      {/* Prompt Reminder */}
      <View style={styles.promptReminder}>
        <Text style={styles.promptReminderLabel}>YOUR PROMPT</Text>
        <Text style={styles.promptReminderText}>
          What is your favorite childhood memory?
        </Text>
      </View>

      {/* Waveform Placeholder */}
      <View style={styles.waveformContainer}>
        <View style={styles.waveformPlaceholder}>
          {Array.from({ length: 30 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.waveformBar,
                { height: 20 + Math.random() * 30 },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <Pressable style={styles.recordButtonLarge}>
          <Ionicons name="mic" size={36} color={Colors.white} />
        </Pressable>
        <Text style={styles.recordHint}>Tap to Record</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ivoryLinen,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: Typography.sizes.base,
    color: Colors.heritageGreen,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.charcoalInk + '40',
  },
  recordingText: {
    fontSize: Typography.sizes.base,
    fontWeight: '500',
    color: Colors.charcoalInk,
  },
  placeholder: {
    width: 60,
  },
  timerContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  timer: {
    fontSize: 64,
    fontWeight: '500',
    color: Colors.charcoalInk,
    letterSpacing: -2,
  },
  timerLabel: {
    marginTop: 8,
    fontSize: Typography.sizes.sm,
    color: Colors.charcoalInk + '60',
  },
  promptReminder: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.charcoalInk,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  promptReminderLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: '600',
    color: Colors.heirloomGold,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  promptReminderText: {
    fontSize: Typography.sizes.base,
    color: Colors.charcoalInk,
    textAlign: 'center',
    lineHeight: 22,
  },
  waveformContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  waveformPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    height: 80,
  },
  waveformBar: {
    width: 4,
    backgroundColor: Colors.heritageGreen + '30',
    borderRadius: 2,
  },
  controls: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  recordButtonLarge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.heirloomGold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.heirloomGold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  recordHint: {
    marginTop: 16,
    fontSize: Typography.sizes.base,
    fontWeight: '500',
    color: Colors.charcoalInk,
  },
});
