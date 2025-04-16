import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: 'checked-in',
                isPaid: true
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`);
            queryClient.invalidateQueries({ active: true });
            navigate('/');
        },
        onError: () => toast.error('Error while checking in')
    });
    return { isCheckingIn, checkin };
}
