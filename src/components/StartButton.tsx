import { Button } from "@/components/ui/button"

export default function StartButton({inputText}:{inputText:string}) {
    
    const btnCick = ()=>{
        console.log("Clicked", inputText);
        
        // console.log(data,error,isFetching)
    }
    return (
      <Button onClick={btnCick} className="bg-white rounded-2xl text-red-500 h-[70px] w-[120px]" >Start Game</Button>
    );
  }
  