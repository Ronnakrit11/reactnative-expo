import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [email, setEmail] = useState<string | null>(null);
  const [goldPrices, setGoldPrices] = useState({
    spot: '2,900.785',
    purity9999: '99.99%',
    purity965: '96.5%',
  });

  useEffect(() => {
    const getUserEmail = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }
      if (user) {
        setEmail(user.email);
      }
    };

    getUserEmail();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>ยินดีต้อนรับ</Text>
        {email && <Text style={styles.emailText}>{email}</Text>}
        }
      </View>

      <View style={styles.priceCard}>
        <View style={styles.priceHeader}>
          <Ionicons name="trending-up" size={24} color="#FF6B35" />
          <Text style={styles.priceTitle}>GoldSpot 🏆</Text>
        </View>
        <Text style={styles.priceValue}>${goldPrices.spot}</Text>
        <View style={styles.purityContainer}>
          <View style={styles.purityItem}>
            <Text style={styles.purityLabel}>ทองคำ 99.99%</Text>
            <Text style={styles.purityValue}>{goldPrices.purity9999}</Text>
          </View>
          <View style={styles.purityItem}>
            <Text style={styles.purityLabel}>ทองคำ 96.5%</Text>
            <Text style={styles.purityValue}>{goldPrices.purity965}</Text>
          </View>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80' }}
          style={styles.chartImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoCards}>
        <View style={[styles.infoCard, styles.shadowProp]}>
          <Ionicons name="analytics-outline" size={24} color="#FF6B35" />
          <Text style={styles.infoTitle}>การวิเคราะห์</Text>
          <Text style={styles.infoDescription}>ดูการวิเคราะห์ทางเทคนิคล่าสุด</Text>
        </View>
        <View style={[styles.infoCard, styles.shadowProp]}>
          <Ionicons name="notifications-outline" size={24} color="#FF6B35" />
          <Text style={styles.infoTitle}>การแจ้งเตือน</Text>
          <Text style={styles.infoDescription}>ตั้งค่าการแจ้งเตือนราคา</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  emailText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  priceCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  priceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginVertical: 10,
  },
  purityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  purityItem: {
    flex: 1,
  },
  purityLabel: {
    fontSize: 14,
    color: '#666',
  },
  purityValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
  },
  chartContainer: {
    margin: 16,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  chartImage: {
    width: '100%',
    height: '100%',
  },
  infoCards: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  infoCard: {
    width: (width - 48) / 2,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  infoDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});