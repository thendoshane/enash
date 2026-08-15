import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyCJildeISBmIo1qPNxEJfRYVMibfAexpWM',
  authDomain: 'enashmain.firebaseapp.com',
  projectId: 'enashmain',
  storageBucket: 'enashmain.firebasestorage.app',
  messagingSenderId: '465283505564',
  appId: '1:465283505564:web:8c040e57c3e67239d57c59',
  measurementId: 'G-TJE7GVZ5VQ',
};

export const app = initializeApp(firebaseConfig);

export const functions = getFunctions(
  app,
  import.meta.env.VITE_FUNCTIONS_REGION || 'us-central1'
);

if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        getAnalytics(app);
      }
    })
    .catch(() => {});
}
