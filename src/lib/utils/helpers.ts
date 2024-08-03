import toast from 'svelte-french-toast';
import ToastSuccessIcon from '$lib/components/shared/icons/ToastSuccessIcon.svelte';

export const showToast = (message: string, status: ToastType): void => {
  if (status === 'success') {
    toast.success(message, {
      position: 'bottom-right',
      duration: 3000,
      icon: ToastSuccessIcon
    });
  }

  if (status === 'error') {
    toast.error(message, {
      position: 'bottom-right',
      duration: 3000
    });
  }
};
