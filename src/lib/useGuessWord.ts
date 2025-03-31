import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type GuessPayload = {
  guess: string;
  session_id: string;
};

export function useGuessWord() {
  return useMutation({
    mutationFn: async ({ guess, session_id }: GuessPayload) => {
      const response = await axios.post(
        'https://wordgameservice-561835270123.europe-west1.run.app/guess',
        { guess, session_id }
      );
      return response.data;
    },
  });
}
