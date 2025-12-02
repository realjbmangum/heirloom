import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '@/constants';

const MENU_ITEMS = [
  { icon: 'settings-outline', label: 'Settings', href: '/settings' },
  { icon: 'notifications-outline', label: 'Notifications', href: '/notifications' },
  { icon: 'shield-checkmark-outline', label: 'Privacy & Security', href: '/privacy' },
  { icon: 'help-circle-outline', label: 'Help & FAQ', href: '/help' },
  { icon: 'document-text-outline', label: 'Terms of Service', href: '/terms' },
  { icon: 'information-circle-outline', label: 'About Heirloom', href: '/about' },
];

export default function AccountScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={Colors.heritageGreen} />
        </View>
        <Text style={styles.name}>Welcome</Text>
        <Text style={styles.email}>Sign in to access your account</Text>
        <Pressable style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </Pressable>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {MENU_ITEMS.map((item, index) => (
          <Pressable key={item.label} style={styles.menuItem}>
            <Ionicons
              name={item.icon as any}
              size={22}
              color={Colors.heritageGreen}
            />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.charcoalInk + '40'}
            />
          </Pressable>
        ))}
      </View>

      {/* Version */}
      <Text style={styles.version}>Heirloom v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ivoryLinen,
  },
  profileSection: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.heritageGreen + '10',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.heritageGreen + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: Typography.sizes.xl,
    fontWeight: '600',
    color: Colors.charcoalInk,
  },
  email: {
    marginTop: 4,
    fontSize: Typography.sizes.sm,
    color: Colors.charcoalInk + '80',
  },
  signInButton: {
    marginTop: 20,
    backgroundColor: Colors.heritageGreen,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  signInButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: '600',
    color: Colors.ivoryLinen,
  },
  menuSection: {
    marginTop: 16,
    backgroundColor: Colors.white,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.heritageGreen + '08',
    gap: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: Typography.sizes.base,
    color: Colors.charcoalInk,
  },
  version: {
    textAlign: 'center',
    padding: 24,
    fontSize: Typography.sizes.sm,
    color: Colors.charcoalInk + '50',
  },
});
