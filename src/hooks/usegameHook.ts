import {  getSession, makeGuess, startGame } from "@/api/wordbridge";
import { useMutation, useQuery } from "@tanstack/react-query";


export function useGetCreateSession(){
    return useQuery({ queryKey: ['current_session'], queryFn: getSession })
}


export function useStartGame(){
    return useQuery({ queryKey: ['game'], queryFn: startGame })
}

export function useMakeGuess() {
    return useMutation({
      mutationFn: async ({ pairId, position, word }: { pairId: number; position: number; word: string }) => {
        const response = await makeGuess(pairId, position, word);
        return response;
      },
    });
  }
  