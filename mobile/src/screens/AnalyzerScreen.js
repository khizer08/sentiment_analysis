import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  ActivityIndicator, StyleSheet, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { analyzeSentiment } from '../services/api';
import SentimentBadge from '../components/SentimentBadge';
import ConfidenceRing from '../components/ConfidenceRing';
import ModelBreakdown from '../components/ModelBreakdown';
import { colors, spacing, radius, typography } from '../theme';

const EXAMPLES = [
  "I absolutely love this product!",
  "The service was terrible and I'm very disappointed.",
  "The package arrived on Tuesday as expected.",
  "This is the best day of my life!",
  "I'm not sure how I feel about this.",
];

const SENTIMENT_EMOJI = { Positive: '😊', Negative: '😞', Neutral: '😐' };

export default function AnalyzerScreen() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const charLimit = 1000;

  const handleAnalyze = async () => {
    if (!text.trim()) { setError('Please enter some text to analyze.'); return; }
    setError(''); setLoading(true); setResult(null);
    try {
      const data = await analyzeSentiment(text.trim());
      setResult(data);
    } catch (err) {
      const msg =
        err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK'
          ? 'Cannot connect to backend.\nMake sure the Node.js server is running and BASE_URL is set correctly in api.js.'
          : err.response?.data?.error || 'Analysis failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.sectionLabel}>Sentiment Analyzer</Text>
          <Text style={styles.title}>Analyze your text</Text>
          <Text style={styles.subtitle}>Enter any English text for instant multi-model sentiment classification.</Text>
        </View>

        {/* Input card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionLabel}>Input Text</Text>
            <Text style={[styles.charCount, text.length > charLimit * 0.9 && { color: colors.negative }]}>
              {text.length}/{charLimit}
            </Text>
          </View>

          <TextInput
            value={text}
            onChangeText={(v) => { if (v.length <= charLimit) setText(v); if (error) setError(''); }}
            placeholder="Type or paste your text here..."
            placeholderTextColor={colors.textMuted}
            style={styles.textInput}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          {!!error && <Text style={styles.errorText}>⚠ {error}</Text>}

          {/* Examples */}
          <Text style={[styles.sectionLabel, { marginTop: spacing.md, marginBottom: spacing.xs }]}>Try an example:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.examplesRow}>
            {EXAMPLES.map((ex, i) => (
              <TouchableOpacity key={i} style={styles.exampleChip} onPress={() => { setText(ex); setError(''); }} activeOpacity={0.7}>
                <Text style={styles.exampleText} numberOfLines={1}>"{ex.slice(0, 32)}{ex.length > 32 ? '…' : ''}"</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Actions */}
          <View style={styles.actions}>
            {!!text && (
              <TouchableOpacity style={styles.clearBtn} onPress={() => { setText(''); setError(''); setResult(null); }} activeOpacity={0.7}>
                <Text style={styles.clearBtnText}>Clear</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.analyzeBtn, (!text.trim() || loading) && styles.analyzeBtnDisabled]}
              onPress={handleAnalyze}
              disabled={!text.trim() || loading}
              activeOpacity={0.8}
            >
              {loading
                ? <ActivityIndicator size="small" color="#0a0a0f" />
                : <Text style={styles.analyzeBtnText}>Analyze →</Text>
              }
            </TouchableOpacity>
          </View>
        </View>

        {/* Loading */}
        {loading && (
          <View style={styles.centerCard}>
            <ActivityIndicator size="large" color={colors.cyan} />
            <Text style={styles.loadingText}>Analyzing sentiment…</Text>
            <Text style={styles.loadingSubtext}>Running VADER · TextBlob · BERT</Text>
          </View>
        )}

        {/* Result */}
        {!!result && !loading && (
          <View style={styles.resultCard}>
            <Text style={styles.sectionLabel}>Analysis Result</Text>
            <View style={styles.resultHeader}>
              <View style={styles.resultLeft}>
                <Text style={styles.resultEmoji}>{SENTIMENT_EMOJI[result.sentiment]}</Text>
                <View>
                  <SentimentBadge sentiment={result.sentiment} size="lg" />
                  <Text style={styles.timestamp}>{new Date(result.analyzedAt).toLocaleTimeString()}</Text>
                </View>
              </View>
              <View style={styles.resultRight}>
                <ConfidenceRing value={result.confidence} sentiment={result.sentiment} size={76} />
                <Text style={styles.confidenceLabel}>Confidence</Text>
              </View>
            </View>

            <View style={styles.textPreview}>
              <Text style={styles.sectionLabel}>Analyzed Text</Text>
              <Text style={styles.previewText} numberOfLines={3}>"{result.text}"</Text>
            </View>

            <View style={styles.compoundRow}>
              <Text style={styles.compoundLabel}>Compound Score</Text>
              <View style={styles.compoundBadge}>
                <Text style={styles.compoundValue}>{result.compound?.toFixed(4) ?? 'N/A'}</Text>
              </View>
            </View>

            {!!result.models && <ModelBreakdown models={result.models} />}
          </View>
        )}

        {/* Empty state */}
        {!result && !loading && (
          <View style={styles.centerCard}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>Awaiting analysis</Text>
            <Text style={styles.emptyDesc}>Results will appear here after you analyze text.</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.lg },
  sectionLabel: { ...typography.label, marginBottom: spacing.xs },
  title: { ...typography.heading, marginBottom: spacing.xs },
  subtitle: { ...typography.body },

  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  charCount: { ...typography.label },
  textInput: { backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, padding: spacing.sm, color: colors.textPrimary, fontSize: 14, minHeight: 120 },
  errorText: { color: colors.negative, fontSize: 13, marginTop: spacing.xs },
  examplesRow: { marginBottom: spacing.sm },
  exampleChip: { backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 10, paddingVertical: 6, marginRight: spacing.xs },
  exampleText: { fontSize: 11, color: colors.textSecondary },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: spacing.md, gap: spacing.sm },
  clearBtn: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: 10 },
  clearBtnText: { color: colors.textSecondary, fontSize: 14 },
  analyzeBtn: { backgroundColor: colors.cyan, borderRadius: radius.sm, paddingHorizontal: spacing.lg, paddingVertical: 12, minWidth: 120, alignItems: 'center' },
  analyzeBtnDisabled: { opacity: 0.4 },
  analyzeBtnText: { color: '#0a0a0f', fontSize: 15, fontWeight: '700' },

  centerCard: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.xl, alignItems: 'center', marginBottom: spacing.md, gap: spacing.sm },
  loadingText: { color: colors.textSecondary, fontSize: 15, marginTop: spacing.sm },
  loadingSubtext: { color: colors.textMuted, fontSize: 12 },
  emptyIcon: { fontSize: 40 },
  emptyTitle: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  emptyDesc: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },

  resultCard: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.md, marginBottom: spacing.md },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md, marginTop: spacing.xs },
  resultLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  resultEmoji: { fontSize: 36 },
  resultRight: { alignItems: 'center', gap: 2 },
  timestamp: { fontSize: 11, color: colors.textMuted, marginTop: 4 },
  confidenceLabel: { fontSize: 10, color: colors.textMuted },
  textPreview: { backgroundColor: colors.surfaceAlt, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.border, padding: spacing.sm, marginBottom: spacing.sm },
  previewText: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  compoundRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  compoundLabel: { fontSize: 12, color: colors.textMuted },
  compoundBadge: { backgroundColor: colors.surfaceAlt, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 4 },
  compoundValue: { fontSize: 12, fontFamily: 'monospace', color: colors.textPrimary },
});
