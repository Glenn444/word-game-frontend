/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMakeGuess } from "@/hooks/usegameHook";



type ButtonProps = {
  inputText: string;
  pairId:number | undefined;
  position:number;
  setLoadingGuess:React.Dispatch<React.SetStateAction<any>>
  setCurrentPosition: React.Dispatch<React.SetStateAction<any>>
  setResponse:React.Dispatch<React.SetStateAction<any>>
};
export default function ButtonComponent({
  inputText,
  pairId,
  position,
  setResponse,
  setCurrentPosition,
  setLoadingGuess
}:ButtonProps) {
  const mutation = useMakeGuess()
  //const guessMutation = useGuessWord();
  if (!pairId) return
  const handleClick = async(e:any) => {
    try {
  
      const word: string = e.target.innerText;
      setLoadingGuess(true)
     const res = await mutation.mutateAsync({pairId,position, word});
     setLoadingGuess(false)
      setResponse(res)
      if (res.correct && !res.game_completed){
        setCurrentPosition(res.next_position)
      }
    
    } catch (error) {
      console.log(error);
      
    }
  }
    //const queryClient = useQueryClient();
  //const cachedData:WordGameQuestion | undefined = queryClient.getQueryData(["game"])
  
  return (
    <div className="flex items-center space-x-4 cursor-pointer" onClick={handleClick}>
      <div className="bg-white h-[4rem] w-[12rem] flex justify-center items-center rounded-2xl">
        <h1 className="text-green-700">{inputText ?? ""}</h1>
      </div>
    </div>
  );
  }
