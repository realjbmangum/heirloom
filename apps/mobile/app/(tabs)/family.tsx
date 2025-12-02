import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '@/constants';

export default function FamilyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.emptyState}>
        <View style={styles.iconContainer}>
          <Ionicons name="people" size={64} color={Colors.heritageGreen + '30'} />
        </View>
        <Text style={styles.title}>Connect with your family</Text>
        <Text style={styles.subtitle}>
          Invite family members to share stories and build your legacy together
        </Text>
        <Pressable style={styles.inviteButton}>
          <Ionicons name="person-add" size={20} color={Colors.white} />
          <Text style={styles.inviteButtonText}>Invite Family Members</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ivoryLinen,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    paddingBottom: 100,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.heritageGreen + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: '600',
    color: Colors.charcoalInk,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    fontSize: Typography.sizes.base,
    color: Colors.charcoalInk + '80',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  inviteButton: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.heritageGreen,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 8,
  },
  inviteButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: '600',
    color: Colors.ivoryLinen,
  },
});
