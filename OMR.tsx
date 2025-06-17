import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type OMRProps = {
    questions: { [key: number]: { answer: string; type: string } };
    selectedAnswers: { [key: number]: string | string[] };
    setSelectedAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: string | string[] }>>;
    defaultOptions?: number;
};

const OMR: React.FC<OMRProps> = ({
    questions,
    selectedAnswers,
    setSelectedAnswers,
    defaultOptions = 5,
}) => {
    // 객체를 배열로 변환 + 번호 기준 오름차순 정렬
    const questionArray = React.useMemo(() => {
        return Object.entries(questions)
            .map(([key, value]) => ({ number: Number(key), ...value }))
            .sort((a, b) => a.number - b.number);
    }, [questions]);

    const handleSelect = (qNum: number, opt: string) => {
        const current = selectedAnswers[qNum] as string[] | undefined;
        const updated = current?.includes(opt)
            ? (current as string[]).filter(o => o !== opt)
            : [...(current || []), opt];

        setSelectedAnswers(prev => ({ ...prev, [qNum]: updated }));
    };

    const handleShortInput = (qNum: number, val: string, maxDigit: number) => {
        const sanitized = val.replace(/[^0-9]/g, '').slice(0, maxDigit);
        setSelectedAnswers(prev => ({ ...prev, [qNum]: sanitized }));
    };

    return (
        <ScrollView contentContainerStyle={styles.parent}>
            {questionArray.map(({ number, answer, type }) => {
                const currentAnswer = selectedAnswers[number];
                const digit = answer.length;
                const options = defaultOptions;

                return (
                    <View key={number} style={styles.questionRow}>
                        <Text style={styles.questionLabel}>{number}</Text>
                        <View style={styles.selectionsBox}>
                            {type === 'short' ? (
                                <TextInput
                                    style={styles.shortInput}
                                    keyboardType="number-pad"
                                    value={typeof currentAnswer === 'string' ? currentAnswer : ''}
                                    onChangeText={text => handleShortInput(number, text, digit)}
                                />
                            ) : (
                                Array.from({ length: options }).map((_, i) => {
                                    const label = (i + 1).toString();
                                    const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(label);
                                    return (
                                        <TouchableOpacity
                                            key={label}
                                            style={[styles.optionBox, isSelected && styles.optionBoxSelected]}
                                            onPress={() => handleSelect(number, label)}
                                        >
                                            <Text style={styles.optionText}>{label}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            )}
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    parent: {
        padding: 10,
    },
    questionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        flexWrap: 'wrap',
    },
    questionLabel: {
        width: 30,
        fontWeight: 'bold',
        fontSize: 16,
    },
    selectionsBox: {
        flexDirection: 'row',
        gap: 6,
    },
    optionBox: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
        width: 25,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionBoxSelected: {
        backgroundColor: '#333',
    },
    optionText: {
        color: '#000',
        fontSize: 14,
    },
    shortInput: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 8,
        width: 60,
        height: 40,
        textAlign: 'center',
        fontSize: 16,
    },
});

export default OMR;
