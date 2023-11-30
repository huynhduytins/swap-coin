import { useState } from 'react'
import { MdSwapVert, MdOutlineArrowDownward } from 'react-icons/md'
import { useMode } from '../../../context/AppContext'
import IconButton from '@mui/material/IconButton'

const SwapButton = () => {
  const { handleSwapToken, isSwapping, setIsSwapping } = useMode()
  const [isHover, setIsHover] = useState<boolean>(false)

  return (
    <IconButton
      className="background-light text-dark-100 w-9 h-9 rounded-full flex items-center justify-center"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      disabled={isSwapping}
      onClick={() => {
        setIsSwapping(true)
        handleSwapToken()
      }}
    >
      {isHover ? (
        <MdSwapVert className="text-xl" />
      ) : (
        <MdOutlineArrowDownward className="text-lg" />
      )}
    </IconButton>
  )
}

export default SwapButton
