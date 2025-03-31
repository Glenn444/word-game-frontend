import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

///Use session creates a new session for the user


export function useSession() {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        'https://word-game-api-rxap.onrender.com/session',
        {}
      );
      return response.data;
    },
  });
}
