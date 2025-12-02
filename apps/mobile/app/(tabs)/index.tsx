import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '@/constants';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Daily Prompt Card */}
      <View style={styles.promptCard}>
        <Text style={styles.promptLabel}>TODAY'S PROMPT</Text>
        <Text style={styles.promptText}>
          What is your favorite childhood memory?
        </Text>
        <Link href="/record" asChild>
          <Pressable style={styles.recordButton}>
            <Ionicons name="mic" size={28} color={Colors.white} />
          </Pressable>
        </Link>
        <Text style={styles.recordLabel}>Tap to Record</Text>

        <View style={styles.recordOptions}>
          <Pressable style={styles.recordOption}>
            <View style={styles.recordOptionIcon}>
              <Ionicons name="mic-outline" size={24} color={Colors.heritageGreen} />
            </View>
            <Text style={styles.recordOptionLabel}>Audio</Text>
          </Pressable>
          <Pressable style={styles.recordOption}>
            <View style={styles.recordOptionIcon}>
              <Ionicons name="videocam-outline" size={24} color={Colors.heritageGreen} />
            </View>
            <Text style={styles.recordOptionLabel}>Video</Text>
          </Pressable>
          <Pressable style={styles.recordOption}>
            <View style={styles.recordOptionIcon}>
              <Ionicons name="cloud-upload-outline" size={24} color={Colors.heritageGreen} />
            </View>
            <Text style={styles.recordOptionLabel}>Upload</Text>
          </Pressable>
        </View>

        <Pressable style={styles.changePrompt}>
          <Text style={styles.changePromptText}>Choose another prompt →</Text>
        </Pressable>
      </View>

      {/* My Vault Preview */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Vault</Text>
          <Link href="/vault" asChild>
            <Pressable>
              <Text style={styles.seeAll}>See all →</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="folder-open-outline" size={48} color={Colors.heritageGreen + '40'} />
          <Text style={styles.emptyText}>Your stories will appear here</Text>
          <Text style={styles.emptySubtext}>Record your first memory to get started</Text>
        </View>
      </View>

      {/* Family Vault Preview */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Family Vault</Text>
          <Link href="/family" asChild>
            <Pressable>
              <Text style={styles.seeAll}>See all →</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={48} color={Colors.heritageGreen + '40'} />
          <Text style={styles.emptyText}>Connect with your family</Text>
          <Text style={styles.emptySubtext}>Invite family members to share stories</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ivoryLinen,
  },
  content: {
    padding: 20,
  },
  promptCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: Colors.charcoalInk,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 24,
  },
  promptLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: '600',
    color: Colors.heirloomGold,
    letterSpacing: 1,
    marginBottom: 12,
  },
  promptText: {
    fontSize: Typography.sizes['2xl'],
    color: Colors.charcoalInk,
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 24,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.heirloomGold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.heirloomGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  recordLabel: {
    marginTop: 12,
    fontSize: Typography.sizes.sm,
    fontWeight: '500',
    color: Colors.charcoalInk,
  },
  recordOptions: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 24,
  },
  recordOption: {
    alignItems: 'center',
    gap: 6,
  },
  recordOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.ivoryLinen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordOptionLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.charcoalInk + '99',
  },
  changePrompt: {
    marginTop: 20,
  },
  changePromptText: {
    fontSize: Typography.sizes.sm,
    color: Colors.heritageGreen,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: '600',
    color: Colors.charcoalInk,
  },
  seeAll: {
    fontSize: Typography.sizes.sm,
    color: Colors.heritageGreen,
  },
  emptyState: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: Typography.sizes.base,
    fontWeight: '500',
    color: Colors.charcoalInk,
  },
  emptySubtext: {
    marginTop: 4,
    fontSize: Typography.sizes.sm,
    color: Colors.charcoalInk + '80',
  },
});
