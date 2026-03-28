import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, TextInput as RNTextInput, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, Avatar, Text } from 'react-native-paper';
import { useAuthStore } from '../../auth/store/useAuthStore';
interface NotesChatModalProps {
    visible: boolean;
    onClose: () => void;
    ticketId: string;
}

type MessageType = 'text' | 'image' | 'file' | 'system';

interface ChatMessage {
    id: string; type: MessageType; text?: string; sender: 'me' | 'other' | 'system'; senderName?: string; time: string; fileUrl?: string; fileName?: string; isUploading?: boolean; progress?: number;
}

export const NotesChatModal = ({ visible, onClose, ticketId }: NotesChatModalProps) => {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Estado de Carga para Skeleton
    const { userName } = useAuthStore();
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 'sys1', type: 'system', text: 'Ticket vinculado a solicitud de vacaciones', sender: 'system', time: '09:50 AM' },
        { id: '1', type: 'text', text: 'Hola Josué, revisé tu solicitud. ¿Podrías confirmarme si las fechas son inamovibles?', sender: 'other', senderName: 'Ana (RRHH)', time: '10:00 AM' },
        { id: '2', type: 'text', text: 'Hola Ana. Sí, ya tengo los vuelos comprados.', sender: 'me', time: '10:05 AM' },
    ]);

    // Simular carga de red (Skeleton)
    useEffect(() => {
        if (visible) {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 1500);
        }
    }, [visible]);

    const handleSendText = () => {
        if (inputText.trim() === '') return;
        setMessages(prev => [...prev, { id: Date.now().toString(), type: 'text', text: inputText, sender: 'me', senderName: userName, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        setInputText('');
    };

    // SKELETON LOADER COMPONENT
    const ChatSkeleton = () => (
        <View style={{ padding: 16 }}>
            <View style={[styles.skeletonBubble, styles.skeletonOther]} />
            <View style={[styles.skeletonBubble, styles.skeletonOther, { width: '40%' }]} />
            <View style={[styles.skeletonBubble, styles.skeletonMe]} />
            <View style={[styles.skeletonBubble, styles.skeletonOther]} />
        </View>
    );

    const renderBubble = ({ item }: { item: ChatMessage }) => {
        if (item.type === 'system') {
            return (
                <View style={styles.systemBubbleWrapper}>
                    <View style={styles.systemBubble}>
                        <Text style={styles.systemText}>{item.text}</Text>
                    </View>
                </View>
            );
        }

        const isMe = item.sender === 'me';
        // COLORES CORPORATIVOS APLICADOS AQUÍ
        const bubbleColor = isMe ? '#3E77BC' : '#EDF2F7';
        const textColor = isMe ? '#FFFFFF' : '#1E293B';

        const getInitials = (name?: string) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'RH';

        return (
            <View style={[styles.bubbleWrapper, isMe ? styles.bubbleWrapperMe : styles.bubbleWrapperOther]}>
                {!isMe && (
                    <Avatar.Text size={32} label={getInitials(item.senderName)} style={styles.avatar} labelStyle={{ fontSize: 12, color: '#3E77BC', fontWeight: '900' }} />
                )}
                <View style={[styles.bubbleContentGroup, isMe && { alignItems: 'flex-end' }]}>
                    {!isMe && <Text style={[styles.senderName, isMe ? { marginLeft: 0, marginRight: 12 } : {}]}>
                        {isMe ? 'Tú' : item.senderName}
                    </Text>}
                    <View style={[styles.bubble, { backgroundColor: bubbleColor }, isMe ? styles.bubbleMeShape : styles.bubbleOtherShape]}>
                        {item.type === 'text' && <Text style={{ color: textColor, fontSize: 14, lineHeight: 20 }}>{item.text}</Text>}
                        <View style={styles.timeContainer}>
                            <Text style={[styles.time, { color: isMe ? 'rgba(255,255,255,0.7)' : '#64748B' }]}>{item.time}</Text>
                            {isMe && <MaterialCommunityIcons name="check-all" size={14} color="rgba(255,255,255,0.8)" style={{ marginLeft: 4 }} />}
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={styles.container}>

                <Appbar.Header style={styles.appBar} statusBarHeight={Platform.OS === 'ios' ? 40 : 0}>
                    <Appbar.BackAction onPress={onClose} color="#3E77BC" />
                    <View style={styles.headerAvatarWrapper}>
                        <Avatar.Icon size={38} icon="headset" style={{ backgroundColor: '#E3F2FD' }} color="#3E77BC" />
                        <View style={styles.onlineBadge} />
                    </View>
                    <Appbar.Content title={`Folio #${ticketId}`} titleStyle={styles.appBarTitle} subtitle="Soporte RH en línea" subtitleStyle={styles.appBarSubtitle} />
                    <Appbar.Action icon="dots-vertical" color="#64748B" onPress={() => { }} />
                </Appbar.Header>

                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

                    {isLoading ? (
                        <ChatSkeleton />
                    ) : (
                        <FlashList
                            data={messages}
                            renderItem={renderBubble}
                            estimatedItemSize={90}
                            keyExtractor={item => item.id}
                            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
                            showsVerticalScrollIndicator={false}
                        />
                    )}

                    <View style={styles.floatingInputArea}>
                        <View style={styles.floatingPill}>
                            <TouchableOpacity style={styles.attachBtn}>
                                <MaterialCommunityIcons name="paperclip" size={24} color="#64748B" />
                            </TouchableOpacity>

                            <RNTextInput
                                style={styles.input}
                                placeholder="Escribe un mensaje..."
                                placeholderTextColor="#94A3B8"
                                value={inputText}
                                onChangeText={setInputText}
                                multiline
                            />

                            <TouchableOpacity
                                style={[styles.sendBtn, { backgroundColor: inputText.trim() ? '#3E77BC' : '#CBD5E1' }]}
                                onPress={handleSendText}
                                activeOpacity={0.8}
                                disabled={!inputText.trim()}
                            >
                                <MaterialCommunityIcons name="send" size={18} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FCFF' },

    // AppBar
    appBar: { backgroundColor: 'white', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3 },
    appBarTitle: { fontWeight: 'bold', color: '#1E293B', fontSize: 16 },
    appBarSubtitle: { color: '#15803D', fontSize: 12, fontWeight: '600' },
    headerAvatarWrapper: { position: 'relative', justifyContent: 'center', marginLeft: 10 },
    onlineBadge: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: '#15803D', borderWidth: 2, borderColor: 'white' },

    // Skeleton Styles
    skeletonBubble: { height: 60, borderRadius: 20, marginBottom: 15, backgroundColor: '#E2E8F0', opacity: 0.6 },
    skeletonOther: { width: '70%', borderBottomLeftRadius: 0 },
    skeletonMe: { width: '60%', alignSelf: 'flex-end', borderBottomRightRadius: 0, backgroundColor: '#DBEAFE' },

    // System Bubble
    systemBubbleWrapper: { alignItems: 'center', marginVertical: 15 },
    systemBubble: { backgroundColor: '#F1F5F9', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
    systemText: { fontSize: 10, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5 },

    // Bubbles
    bubbleWrapper: { marginBottom: 15, flexDirection: 'row', alignItems: 'flex-end' },
    bubbleWrapperMe: { justifyContent: 'flex-end', paddingLeft: 60 },
    bubbleWrapperOther: { justifyContent: 'flex-start', paddingRight: 60 },
    bubbleContentGroup: { flexShrink: 1, alignItems: 'flex-start' },
    avatar: { marginRight: 10, marginBottom: 2, backgroundColor: '#E0F2F1' },
    senderName: { fontSize: 10, fontWeight: 'bold', marginLeft: 12, marginBottom: 4, color: '#64748B' },

    bubble: { padding: 14, paddingHorizontal: 16, elevation: 1, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
    bubbleMeShape: { borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 4 },
    bubbleOtherShape: { borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 4 },

    timeContainer: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 6 },
    time: { fontSize: 10, fontWeight: 'bold' },

    // Input Area "Brutal"
    floatingInputArea: { paddingHorizontal: 16, paddingBottom: Platform.OS === 'ios' ? 30 : 20, paddingTop: 10, backgroundColor: '#F9FCFF' },
    floatingPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 30, paddingHorizontal: 10, paddingVertical: 5, elevation: 8, shadowColor: '#3E77BC', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12 },
    attachBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
    input: { flex: 1, maxHeight: 100, fontSize: 15, color: '#1E293B', paddingHorizontal: 10, paddingTop: Platform.OS === 'ios' ? 12 : 8, paddingBottom: Platform.OS === 'ios' ? 12 : 8 },
    sendBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 4 },
});