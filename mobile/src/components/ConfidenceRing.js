import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../theme';

export default function ConfidenceRing({ value, sentiment, size = 80 }) {
  const strokeWidth = 5;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = Math.round(value * 100);
  const offset = circumference - (pct / 100) * circumference;

  const strokeColor =
    sentiment === 'Positive' ? colors.positive :
    sentiment === 'Negative' ? colors.negative :
    colors.neutral;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={colors.border}
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <Text style={[styles.label, { color: strokeColor }]}>{pct}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
});
