import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

function ScoreBar({ label, score, color }) {
  // Map score from [-1, 1] to [0, 100]%
  const pct = Math.min(100, Math.max(0, ((score + 1) / 2) * 100));
  return (
    <View style={styles.row}>
      <Text style={styles.modelName}>{label}</Text>
      <View style={styles.barTrack}>
        <View style={styles.midLine} />
        <View style={[styles.barFill, { backgroundColor: color, width: `${pct}%` }]} />
      </View>
      <Text style={[styles.scoreText, { color }]}>
        {score >= 0 ? '+' : ''}{score.toFixed(3)}
      </Text>
    </View>
  );
}

export default function ModelBreakdown({ models }) {
  if (!models || models.length === 0) return null;

  const getColor = (score) =>
    score >= 0.05 ? colors.positive :
    score <= -0.05 ? colors.negative :
    colors.neutral;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>Model Breakdown</Text>
      {models.map((m) => (
        <ScoreBar key={m.model} label={m.model} score={m.score} color={getColor(m.score)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
  },
  sectionLabel: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  modelName: {
    width: 72,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  barTrack: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: radius.full,
    overflow: 'hidden',
    position: 'relative',
  },
  midLine: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: colors.borderLight,
    zIndex: 1,
  },
  barFill: {
    height: '100%',
    borderRadius: radius.full,
    opacity: 0.85,
  },
  scoreText: {
    width: 56,
    fontSize: 11,
    fontFamily: 'monospace',
    textAlign: 'right',
  },
});
