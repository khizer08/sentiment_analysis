import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, typography } from '../theme';
import { getScreenTopPadding } from '../navLayout';

const features = [
  { icon: '🧠', title: 'Multi-Model NLP',   desc: 'VADER + TextBlob + BERT combined' },
  { icon: '⚡', title: 'Real-time',          desc: 'Instant results via REST API' },
  { icon: '📊', title: 'Detailed Scores',   desc: 'Confidence, compound, model breakdown' },
  { icon: '📜', title: 'History',            desc: 'Review all past analyses' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const topReservedSpace = getScreenTopPadding(insets.top);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: topReservedSpace }]} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.pill}>
            <View style={styles.dot} />
            <Text style={styles.pillText}>NLP ACADEMIC PROJECT</Text>
          </View>

          <Text style={styles.heroTitle}>
            Understand the{'\n'}<Text style={{ color: colors.cyan }}>Emotion</Text>{'\n'}behind any Text
          </Text>

          <Text style={styles.heroSub}>
            Paste any text and get instant sentiment classification using VADER, TextBlob and BERT.
          </Text>

          <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Analyzer')}>
            <Text style={styles.ctaText}>Start Analyzing →</Text>
          </TouchableOpacity>
        </View>

        {/* Feature grid */}
        <View style={styles.grid}>
          {features.map((f, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.cardIcon}>{f.icon}</Text>
              <Text style={styles.cardTitle}>{f.title}</Text>
              <Text style={styles.cardDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>

        {/* Architecture */}
        <View style={styles.archCard}>
          <Text style={styles.sectionLabel}>Architecture</Text>
          <View style={styles.archRow}>
            {[
              { label: 'React\nNative', sub: 'This app',     color: colors.cyan },
              { label: '→', arrow: true },
              { label: 'Node.js',      sub: 'Backend\nAPI',  color: colors.positive },
              { label: '→', arrow: true },
              { label: 'Python NLP',   sub: 'VADER+\nBERT+TextBlob',   color: colors.neutral },
            ].map((item, i) =>
              item.arrow ? (
                <Text key={i} style={styles.archArrow}>→</Text>
              ) : (
                <View key={i} style={[styles.archNode, { borderColor: item.color }]}>
                  <Text style={[styles.archLabel, { color: item.color }]}>{item.label}</Text>
                  <Text style={styles.archSub}>{item.sub}</Text>
                </View>
              )
            )}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },

  hero: { marginBottom: spacing.xl },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.xs,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 6,
    alignSelf: 'flex-start', marginBottom: spacing.lg,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.cyan },
  pillText: { ...typography.label },
  heroTitle: { fontSize: 34, fontWeight: '800', color: colors.textPrimary, lineHeight: 42, marginBottom: spacing.md },
  heroSub: { ...typography.body, marginBottom: spacing.lg },
  ctaBtn: { backgroundColor: colors.cyan, paddingHorizontal: spacing.lg, paddingVertical: 14, borderRadius: radius.md, alignSelf: 'flex-start' },
  ctaText: { color: '#0a0a0f', fontSize: 15, fontWeight: '700' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  card: { width: '47.5%', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md },
  cardIcon: { fontSize: 22, marginBottom: spacing.xs },
  cardTitle: { fontSize: 13, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
  cardDesc: { fontSize: 12, color: colors.textMuted },

  archCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md },
  sectionLabel: { ...typography.label, marginBottom: spacing.md },
  archRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.xs },
  archNode: { borderWidth: 1, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, backgroundColor: colors.surfaceAlt },
  archLabel: { fontSize: 12, fontWeight: '700' },
  archSub: { fontSize: 10, color: colors.textMuted },
  archArrow: { color: colors.textMuted, fontSize: 14 },
});
