import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>ObservationList</Text>
        <Text style={styles.subtitle}>
          Android ve iOS icin hazirlanan ilk mobil uygulama iskeleti.
        </Text>
        <Text style={styles.body}>
          Buradan gozlem listeleri, notlar ve takip ekranlari gelistirilebilir.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#1f2937',
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    color: '#374151',
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 16,
    textAlign: 'center',
  },
  body: {
    color: '#6b7280',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
