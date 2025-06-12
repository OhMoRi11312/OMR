import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConfirmDialog({
    visible,
    onConfirm,
    onCancel,
    message = 'Message.',
}: {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message?: string;
}) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.dialogBox}>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={onCancel} style={styles.button}>
                            <Text style={styles.cancelText}>취소</Text>
                        </TouchableOpacity>
                        <View style={styles.distinctLine} />
                        <TouchableOpacity onPress={onConfirm} style={styles.button}>
                            <Text style={styles.confirmText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    dialogBox: {
        width: 270,
        backgroundColor: '#ffffff',
        borderRadius: 14,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        alignItems: 'center',
    },
    message: {
        fontSize: 15,
        textAlign: 'center',
        padding: 20,
        marginBottom: 20,
        color: '#111',
    },
    buttonRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-evenly',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    distinctLine: {
        width: 0,
        height: '100%',
        borderStartWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    cancelText: {
        color: '#007AFF',
        fontSize: 17,
    },
    confirmText: {
        color: '#007AFF',
        fontSize: 17,
        fontWeight: '600',
    },
});
