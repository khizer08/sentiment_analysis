import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, ActivityIndicator,
  StyleSheet, Alert, RefreshControl, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHistory, clearHistory } from '../services/api';
import SentimentBadge from '../components/SentimentBadge';
import { colors, spacing, radius, typography } from '../theme';
import { getScreenTopPadding } from '../navLayout';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const topReservedSpace = getScreenTopPadding(insets.top);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchData = useCallback(async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    setError('');
    try {
      const data = await getHistory();
      setEntries(data);
    } catch {
      setError('Could not load history. Is the backend running?');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleClear = () => {
    Alert.alert('Clear History', 'Delete all past analyses? This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear All', style: 'destructive',
        onPress: async () => {
          try { await clearHistory(); setEntries([]); }
          catch { Alert.alert('Error', 'Failed to clear history.'); }
        },
      },
    ]);
  };

  const stats = entries.reduce(
    (acc, e) => { acc.total++; if (e.sentiment === 'Positive') acc.positive++; else if (e.sentiment === 'Negative') acc.negative++; else acc.neutral++; return acc; },
    { total: 0, positive: 0, negative: 0, neutral: 0 }
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: topReservedSpace }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchData(true); }} tintColor={colors.cyan} />}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.sectionLabel}>History</Text>
            <Text style={styles.title}>Past Analyses</Text>
          </View>
          {entries.length > 0 && (
            <TouchableOpacity onPress={handleClear} activeOpacity={0.7} style={styles.clearBtn}>
              <Text style={styles.clearBtnText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        {!loading && entries.length > 0 && (
          <View style={styles.statsRow}>
            {[
              { label: 'Total',    value: stats.total,    color: colors.textPrimary },
              { label: 'Positive', value: stats.positive, color: colors.positive },
              { label: 'Negative', value: stats.negative, color: colors.negative },
              { label: 'Neutral',  value: stats.neutral,  color: colors.neutral },
            ].map((s) => (
              <View key={s.label} style={styles.statCard}>
                <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        )}

        {!!error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>⚠ {error}</Text>
          </View>
        )}

        {loading && (
          <View style={styles.centerCard}>
            <ActivityIndicator size="large" color={colors.cyan} />
            <Text style={styles.loadingText}>Loading history…</Text>
          </View>
        )}

        {!loading && !error && entries.length === 0 && (
          <View style={styles.centerCard}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>No analyses yet</Text>
            <Text style={styles.emptyDesc}>Run some analyses on the Analyzer tab to see history here.</Text>
          </View>
        )}

        {!loading && entries.map((entry, idx) => (
          <View key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryIndex}>{String(idx + 1).padStart(2, '0')}</Text>
              <SentimentBadge sentiment={entry.sentiment} />
              <Text style={styles.entryTime}>{new Date(entry.analyzedAt).toLocaleTimeString()}</Text>
            </View>
            <Text style={styles.entryText} numberOfLines={2}>{entry.text}</Text>
            <View style={styles.entryFooter}>
              <View style={styles.confidenceBar}>
                <View style={[styles.confidenceFill, {
                  width: `${Math.round(entry.confidence * 100)}%`,
                  backgroundColor: entry.sentiment === 'Positive' ? colors.positive : entry.sentiment === 'Negative' ? colors.negative : colors.neutral,
                }]} />
              </View>
              <Text style={styles.confidenceText}>{Math.round(entry.confidence * 100)}%</Text>
              <Text style={styles.compoundText}>{entry.compound?.toFixed(3) ?? '—'}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: spacing.lg },
  sectionLabel: { ...typography.label, marginBottom: spacing.xs },
  title: { ...typography.heading },
  clearBtn: { borderWidth: 1, borderColor: colors.negative, borderRadius: radius.sm, paddingHorizontal: 12, paddingVertical: 6 },
  clearBtnText: { color: colors.negative, fontSize: 13, fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: spacing.xs, marginBottom: spacing.lg },
  statCard: { flex: 1, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, padding: spacing.sm, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 10, color: colors.textMuted, marginTop: 2 },
  errorCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.negative, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  errorText: { color: colors.negative, fontSize: 13 },
  centerCard: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.xl, alignItems: 'center', gap: spacing.sm },
  loadingText: { color: colors.textSecondary, fontSize: 14, marginTop: spacing.sm },
  emptyIcon: { fontSize: 36 },
  emptyTitle: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  emptyDesc: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  entryCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  entryHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.xs },
  entryIndex: { fontSize: 11, fontFamily: 'monospace', color: colors.textMuted, width: 22 },
  entryTime: { fontSize: 11, color: colors.textMuted, marginLeft: 'auto' },
  entryText: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.sm },
  entryFooter: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  confidenceBar: { flex: 1, height: 4, backgroundColor: colors.border, borderRadius: radius.full, overflow: 'hidden' },
  confidenceFill: { height: '100%', borderRadius: radius.full },
  confidenceText: { fontSize: 11, color: colors.textMuted, width: 32, textAlign: 'right' },
  compoundText: { fontSize: 11, fontFamily: 'monospace', color: colors.textMuted, width: 44, textAlign: 'right' },
});
