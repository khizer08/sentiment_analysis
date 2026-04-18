import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';

const config = {
  Positive: { bg: colors.positiveDim, text: colors.positive, border: colors.positive },
  Negative: { bg: colors.negativeDim, text: colors.negative, border: colors.negative },
  Neutral:  { bg: colors.neutralDim,  text: colors.neutral,  border: colors.neutral  },
};

export default function SentimentBadge({ sentiment, size = 'md' }) {
  const c = config[sentiment] || config.Neutral;
  const isLg = size === 'lg';

  return (
    <View style={[
      styles.badge,
      { backgroundColor: c.bg, borderColor: c.border },
      isLg && styles.badgeLg,
    ]}>
      <Text style={[styles.text, { color: c.text }, isLg && styles.textLg]}>
        {sentiment?.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeLg: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  textLg: {
    fontSize: 13,
    letterSpacing: 1.5,
  },
});
