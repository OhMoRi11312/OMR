import OMR from '@/components/ui/OMR';
import SlideOver from '@/components/ui/SlideOverPanel';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';

export default function App() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string[] }>({})
  function handleSubmit() {
    console.log('선택된 답안:', selectedAnswers)

    // 예시 처리: 단순히 정답 개수 세기 (정답이 ['3']이라고 가정)
    const answerKey = { 0: ['3'], 1: ['2'] }
    let correct = 0

    Object.entries(answerKey).forEach(([qIndex, correctAnswer]) => {
      const selected = selectedAnswers[+qIndex] || []
      if (
        correctAnswer.length === selected.length &&
        correctAnswer.every((val, i) => selected[i] === val)
      ) {
        correct += 1
      }
    })

    alert(`정답 수: ${correct}개`)
  }

  return (
    <SlideOver innerComponent={
      <View>
        <OMR numQuestions={10}
          optionsPerQuestion={['1', '2', '3', '4', '5']}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
        />
        <Button title="제출 및 채점" onPress={handleSubmit} />
      </View>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});