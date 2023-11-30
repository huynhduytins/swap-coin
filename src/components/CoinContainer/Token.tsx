import { MdKeyboardArrowDown } from 'react-icons/md'

import { useState } from 'react'
import ModalSearch from '../ModalSearch'
import { useMode } from '../../context/AppContext'
import { TTokenList } from '../../types'

interface IToken {
  token: string
  isToToken?: boolean
}

const Token = ({ token, isToToken }: IToken) => {
  const { setFromToken, setToToken, handleSwapToken, fromToken, toToken } =
    useMode()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChosenToken = (value: TTokenList | undefined) => {
    setOpen(false)
    if (isToToken) {
      if (
        value?.currency === fromToken?.currency &&
        value?.date === fromToken?.date
      ) {
        handleSwapToken()
      } else {
        setToToken(value)
      }
    } else {
      if (
        value?.currency === toToken?.currency &&
        value?.date === toToken?.date
      ) {
        handleSwapToken()
      } else {
        setFromToken(value)
      }
    }
  }

  return (
    <>
      <div className="flex-1 flex items-center gap-2 token-form-light dark:token-form-dark py-4 px-6">
        <img
          src={`/assets/tokens/${token}.svg`}
          alt="token"
          className="w-7 h-7"
        />
        <div>
          <p className="text-xs">Token</p>
          <div
            className="flex items-center cursor-pointer gap-1"
            onClick={handleClickOpen}
          >
            <p className="text-base">{token}</p>
            <MdKeyboardArrowDown />
          </div>
        </div>
      </div>
      <ModalSearch
        open={open}
        onClose={handleClose}
        handleChosenToken={handleChosenToken}
        isToToken={isToToken}
      />
    </>
  )
}

export default Token
