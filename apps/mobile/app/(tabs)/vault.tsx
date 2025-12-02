import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '@/constants';

const CATEGORIES = ['All', 'Childhood', 'Career', 'Family', 'Faith', 'Legacy'];

export default function VaultScreen() {
  return (
    <View style={styles.container}>
      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {CATEGORIES.map((category, index) => (
          <Pressable
            key={category}
            style={[styles.filterPill, index === 0 && styles.filterPillActive]}
          >
            <Text
              style={[
                styles.filterText,
                index === 0 && styles.filterTextActive,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Stories Grid - Empty State */}
      <View style={styles.content}>
        <View style={styles.emptyState}>
          <Ionicons
            name="folder-open-outline"
            size={64}
            color={Colors.heritageGreen + '30'}
          />
          <Text style={styles.emptyTitle}>Your vault is empty</Text>
          <Text style={styles.emptySubtitle}>
            Record your first story to start building your legacy
          </Text>
          <Pressable style={styles.recordButton}>
            <Ionicons name="mic" size={20} color={Colors.white} />
            <Text style={styles.recordButtonText}>Record a Story</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ivoryLinen,
  },
  filterContainer: {
    maxHeight: 56,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.heritageGreen + '10',
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    flexDirection: 'row',
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.ivoryLinen,
  },
  filterPillActive: {
    backgroundColor: Colors.heritageGreen,
  },
  filterText: {
    fontSize: Typography.sizes.sm,
    color: Colors.charcoalInk,
  },
  filterTextActive: {
    color: Colors.ivoryLinen,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyTitle: {
    marginTop: 16,
    fontSize: Typography.sizes.xl,
    fontWeight: '600',
    color: Colors.charcoalInk,
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: Typography.sizes.base,
    color: Colors.charcoalInk + '80',
    textAlign: 'center',
    maxWidth: 280,
  },
  recordButton: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.heirloomGold,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  recordButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: '600',
    color: Colors.white,
  },
});
