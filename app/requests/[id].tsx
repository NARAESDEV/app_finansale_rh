import { RequestDetailView } from '@/src/features/vacations/components/RequestDetailView';
import { useLocalSearchParams } from 'expo-router';

export default function RequestDetailScreen() {
    const { id } = useLocalSearchParams(); // Obtenemos el ID de la URL
    return <RequestDetailView id={id as string} />;
}