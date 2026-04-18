import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

const sections = [
  {
    title: 'What is Sentiment Analysis?',
    content: 'Sentiment analysis (opinion mining) is an NLP technique to identify whether text expresses a positive, negative, or neutral opinion. Used in social media monitoring, customer feedback analysis, and brand reputation management.',
  },
  {
    title: 'Multi-Model Approach',
    content: 'This system combines three models:\n\n• VADER — Rule-based, optimized for social media text, handles emojis and slang.\n\n• TextBlob — Polarity-based, scores between -1 and +1 for general language.\n\n• BERT (DistilBERT) — Deep learning, understands context for highly accurate predictions.',
  },
  {
    title: 'Final Score Calculation',
    content: 'All three models analyze the input independently. The average compound score determines the final result:\n\n≥ 0.05  →  Positive\n≤ -0.05  →  Negative\nOtherwise  →  Neutral\n\nConfidence is averaged across all three models.',
  },
];

const pipeline = [
  { step: '01', title: 'User Input',      desc: 'Text entered in the app' },
  { step: '02', title: 'HTTP POST',       desc: 'Axios calls /api/analyze' },
  { step: '03', title: 'Node.js',         desc: 'Validates, calls Python' },
  { step: '04', title: 'Python NLP',      desc: 'VADER + TextBlob + BERT' },
  { step: '05', title: 'Aggregation',     desc: 'Scores averaged' },
  { step: '06', title: 'JSON Response',   desc: 'Sentiment returned' },
];

const thresholds = [
  { label: 'Positive', rule: 'avg ≥ 0.05',          color: colors.positive, bg: colors.positiveDim },
  { label: 'Neutral',  rule: '-0.05 < avg < 0.05',  color: colors.neutral,  bg: colors.neutralDim  },
  { label: 'Negative', rule: 'avg ≤ -0.05',          color: colors.negative, bg: colors.negativeDim },
];

export default function AboutScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.sectionLabel}>About</Text>
          <Text style={styles.title}>How it Works</Text>
          <Text style={styles.subtitle}>A deep dive into the NLP techniques powering this app.</Text>
        </View>

        {sections.map((s, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardTitle}>{s.title}</Text>
            <Text style={styles.cardContent}>{s.content}</Text>
          </View>
        ))}

        <Text style={[styles.sectionLabel, { marginBottom: spacing.sm, marginTop: spacing.sm }]}>Request Pipeline</Text>
        <View style={styles.pipelineGrid}>
          {pipeline.map((item) => (
            <View key={item.step} style={styles.pipelineCard}>
              <Text style={styles.pipelineStep}>{item.step}</Text>
              <Text style={styles.pipelineTitle}>{item.title}</Text>
              <Text style={styles.pipelineDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Classification Thresholds</Text>
          {thresholds.map((t) => (
            <View key={t.label} style={[styles.thresholdRow, { backgroundColor: t.bg }]}>
              <Text style={[styles.thresholdLabel, { color: t.color }]}>{t.label}</Text>
              <Text style={styles.thresholdRule}>{t.rule}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tech Stack</Text>
          <View style={styles.stackGrid}>
            {['React Native', 'Expo', 'Node.js', 'Express', 'Python', 'VADER', 'TextBlob', 'BERT', 'REST API'].map((t) => (
              <View key={t} style={styles.stackChip}>
                <Text style={styles.stackChipText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.lg },
  sectionLabel: { ...typography.label, marginBottom: spacing.xs },
  title: { ...typography.heading, marginBottom: spacing.xs },
  subtitle: { ...typography.body },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.sm },
  cardContent: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
  pipelineGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.sm },
  pipelineCard: { width: '47.5%', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, padding: spacing.sm },
  pipelineStep: { fontSize: 10, fontFamily: 'monospace', color: colors.textMuted },
  pipelineTitle: { fontSize: 13, fontWeight: '700', color: colors.textPrimary, marginTop: 2 },
  pipelineDesc: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  thresholdRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.sm, borderRadius: radius.sm, marginBottom: spacing.xs },
  thresholdLabel: { fontSize: 13, fontWeight: '700' },
  thresholdRule: { fontSize: 12, fontFamily: 'monospace', color: colors.textSecondary },
  stackGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  stackChip: { backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 10, paddingVertical: 5 },
  stackChipText: { fontSize: 12, color: colors.textSecondary },
});
