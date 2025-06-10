import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons'
import { DocumentDirectoryPath } from '@dr.pogodin/react-native-fs';
import { useRef, useState } from 'react';
import { Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PencilKitView, { type PencilKitRef, type PencilKitTool, } from 'react-native-pencil-kit';
import OMR from '../components/OMR';
import SlideOver from '../components/SlideOverPanel';
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';

const allPens: { label: string; value: string; icon: string; }[] = [
    { label: '펜', value: 'pen', icon: 'pen' },
    { label: '연필', value: 'pencil', icon: 'pencil-outline' },
    { label: '마커', value: 'marker', icon: 'format-color-highlight' },
    { label: '크레용', value: 'crayon', icon: 'border-color' },
    { label: '모노라인', value: 'monoline', icon: 'vector-line' },
    { label: '수채화', value: 'watercolor', icon: 'brush' },
    { label: '붓펜', value: 'fountainPen', icon: 'fountain-pen-tip' },
];

const allErasers: { label: string; value: string; icon: string; }[] = [
    { label: '비트맵 지우개', value: 'eraserBitmap', icon: '' },
    { label: '벡터 지우개', value: 'eraserVector', icon: '' },
    { label: '고정폭 지우개', value: 'eraserFixedWidthBitmap', icon: '' },
];


export default function App() {
    const ref = useRef<PencilKitRef>(null);
    const path = `${DocumentDirectoryPath}/drawing.dat`;
    const [imageBase64, setImageBase64] = useState('');
    const [toolColors, setToolColors] = useState<Record<PencilKitTool, string>>({});
    const [currentTool, setCurrentTool] = useState<PencilKitTool | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string[] }>({});
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<'front' | 'slide'>('front');

    function handleSubmit() {
        console.log('선택된 답안:', selectedAnswers);

        const answerKey = { 0: ['3'], 1: ['2'] };
        let correct = 0;

        Object.entries(answerKey).forEach(([qIndex, correctAnswer]) => {
            const selected = selectedAnswers[+qIndex] || [];
            if (
                correctAnswer.length === selected.length &&
                correctAnswer.every((val, i) => selected[i] === val)
            ) {
                correct += 1;
            }
        });
    }

    return (
        <View style={styles.pageMain} >
            <View style={styles.toolbarSection}>
                <View style={styles.tabGroup}>
                    <Btn onPress={() => ref.current?.showToolPicker()} text="도구 보이기" />
                    <Btn onPress={() => ref.current?.hideToolPicker()} text="도구 숨기기" />
                    <Btn onPress={() => ref.current?.clear()} text="모두 지우기" />
                    <Btn onPress={() => ref.current?.undo()} text="실행 취소" />
                    <Btn onPress={() => ref.current?.redo()} text="다시 실행" />
                </View>
                <View style={styles.toolGroup} >
                    <View style={styles.functionToolGroup}>
                        <Btn
                            text={isDrawerOpen ? 'OMR 닫기' : 'OMR 열기'}
                            onPress={() => setDrawerOpen(!isDrawerOpen)}
                            variant={2}
                        />
                    </View>
                    <View style={styles.drawingToolGroup}>
                        <ToolButtons
                            tools={allPens}
                            onSelect={(tool) => {
                                ref.current?.setTool({ toolType: tool, width: 4, color: 'black' });
                                setCurrentTool(tool);
                            }}
                        />
                    </View>
                    <View style={styles.eraserToolGroup}>
                        <ToolButtons
                            tools={allErasers}
                            onSelect={(tool) => {
                                ref.current?.setTool({ toolType: tool, width: 4, color: 'black' });
                                setCurrentTool(tool);
                            }}
                        />
                    </View>
                </View>
                {/* </ScrollView> */}
            </View>
            <SlideOver
                drawerType={drawerType}
                backTouchable={false}
                open={isDrawerOpen}
                setOpen={setDrawerOpen}
                innerComponent={
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setDrawerType(prev => prev === 'front' ? 'slide' : 'front')
                            }}
                        >
                            <MaterialCommunityIcons name={drawerType === 'slide' ? 'view-column' : 'dock-right'} size={24} color="blurgb(0, 122, 255)" />
                        </TouchableOpacity>

                        <ScrollView>
                            <OMR
                                numQuestions={10}
                                optionsPerQuestion={['1', '2', '3', '4', '5']}
                                selectedAnswers={[]}
                                setSelectedAnswers={() => { }}
                            />
                            <Button title="제출 및 채점" onPress={() => { }} />
                        </ScrollView>
                    </View>
                }
                mainContent={
                    < View style={styles.canvasWrapper} >
                        <PencilKitView
                            ref={ref}
                            style={styles.canvas}
                            alwaysBounceVertical={false}
                            alwaysBounceHorizontal={false}
                            backgroundColor={'#f0ebc0'}
                        />
                        {
                            imageBase64 ? (
                                <Image
                                    style={styles.previewImage}
                                    source={{ uri: imageBase64 }}
                                />
                            ) : null}
                    </View>
                }
            />
        </View>
    )
}

const Btn = ({
    onPress,
    text,
    variant = 1,
    icon = 'face-man',
}: {
    onPress: () => void;
    text: string;
    variant?: number;
    icon?: any;
}) => {
    let output;
    if (icon === '' || !icon) {
        variant = 1
    }
    switch (variant) {
        case 0:   // 아이콘으로 표사
            output = (
                <TouchableOpacity onPress={onPress} style={[styles.button]} >
                    <MaterialCommunityIcons name={icon} size={22} color="black" />
                </TouchableOpacity >
            )
            break;
        case 1:   // 텍스트로 표시
            output = (
                <TouchableOpacity onPress={onPress} style={[styles.button]} >
                    <Text> {text} </Text>
                </TouchableOpacity>
            )
            break;
        default:
            output = (
                <TouchableOpacity onPress={onPress} style={[styles.defaultButton, { borderColor: '#000000', borderStyle: 'solid', borderWidth: 1, borderRadius: 12, }]} >
                    <Text style={[styles.defaultButton]}> {text} </Text>
                </TouchableOpacity>
            )
    }
    return output;
};

const ToolButtons = ({
    tools,
    onSelect,
}: {
    tools: { label: string; value: string; icon: string; }[];
    onSelect: (tool: string) => void;
}) => (
    <>
        {tools.map(({ label, value, icon }) => (
            <Btn key={value} variant={0} text={label} icon={icon} onPress={() => onSelect(value)} />
        ))}
    </>
);


// Styles
const styles = StyleSheet.create({
    pageMain: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        width: '100%',
    },
    toolbarSection: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        backgroundColor: '#FFE560',
        paddingTop: Platform.OS === 'ios' ? 24 : 0,
    },
    tabGroup: {
        flexDirection: 'row',
        width: '100%',
        height: 48
    },
    toolGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 40,
        paddingHorizontal: 8,
        backgroundColor: '#FFF1A8',
    },
    functionToolGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 6,
        flex: 1
    },
    drawingToolGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0,
        flex: 1
    },
    eraserToolGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 6,
        flex: 1
    },

    button: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    defaultButton: {
        backgroundColor: '#000000',
        paddingHorizontal: 6,
        paddingVertical: 3,
        color: '#ffffff',
    },


    canvasWrapper: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    canvas: {
        flex: 1,
    },
    previewImage: {
        borderWidth: 1,
        borderColor: '#2224',
        borderRadius: 12,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        width: 160,
        height: 160,
    },
});
