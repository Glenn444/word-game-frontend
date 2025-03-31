/* eslint-disable react-refresh/only-export-components */

import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { useStartGame } from '@/hooks/usegameHook';

export default () => {
  const { width, height } = useWindowSize()
    const {  refetch: refetchGame } = useStartGame();
  return (
    <Confetti
      width={width}
      height={height}
      onConfettiComplete={()=>refetchGame()}
    />
  )
}