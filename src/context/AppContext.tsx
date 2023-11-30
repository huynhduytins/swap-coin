import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'
import { dummyData } from '../constants'
import { TTokenList } from '../types'
import { notify } from '../utils'

interface IAppContext {
  mode: string
  toTokenAmount: string
  fromToken: TTokenList | undefined
  toToken: TTokenList | undefined
  isSwapping: boolean
  tokenList: TTokenList[]
  fromTokenAmount: string
  handleSwapToken: () => void
  setMode: (mode: string) => void
  setIsSwapping: (value: boolean) => void
  handleCalcSwapToken: (value: string) => void
  setFromTokenAmount: (value: string) => void
  setFromToken: (value: TTokenList | undefined) => void
  setToToken: (value: TTokenList | undefined) => void
  handleSubmitSwap: () => void
}

const AppContext = createContext<IAppContext | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<string>('')

  const [fromToken, setFromToken] = useState<TTokenList | undefined>()
  const [toToken, setToToken] = useState<TTokenList | undefined>()

  const [tokenList, setTokenList] = useState<TTokenList[]>([])

  const [fromTokenAmount, setFromTokenAmount] = useState<string>('')
  const [toTokenAmount, setToTokenAmount] = useState<string>('0')

  const [isSwapping, setIsSwapping] = useState<boolean>(false)

  const changeMode = (chosenMode: string) => {
    document.documentElement.className = chosenMode
  }

  const handleChangeMode = () => {
    const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

    if (mode === 'system' || mode === '') {
      changeMode(systemMode)
    } else {
      changeMode(mode)
    }
  }

  const handleSwapToken = () => {
    setFromToken(toToken)
    setToToken(fromToken)
  }

  const handleCalcSwapToken = (value: string) => {
    const num = Number(value)
    const fromTokenToUSD = num * (fromToken?.price as number)
    const toUSTToToken = fromTokenToUSD / (toToken?.price as number)

    setToTokenAmount(toUSTToToken.toString())
    setIsSwapping(false)
  }

  const handleSubmitSwap = () => {
    if (fromTokenAmount === '0' || fromTokenAmount === '') {
      setIsSwapping(false)
      return
    }
    if (Number(fromTokenAmount) > (fromToken?.amount ?? 0)) {
      setIsSwapping(false)
      notify('Tokens is not enough', true)
    } else {
      const fromTokenAmountIndex = tokenList.findIndex(
        (el) =>
          el.currency + el.date ===
          (fromToken?.currency as string) + fromToken?.date
      )
      const toTokenAmountIndex = tokenList.findIndex(
        (el) =>
          el.currency + el.date ===
          (toToken?.currency as string) + toToken?.date
      )

      const newTokenList = [...tokenList]

      newTokenList[fromTokenAmountIndex] = {
        ...newTokenList[fromTokenAmountIndex],
        amount:
          newTokenList[fromTokenAmountIndex].amount - Number(fromTokenAmount),
      }

      newTokenList[toTokenAmountIndex] = {
        ...newTokenList[toTokenAmountIndex],
        amount: newTokenList[toTokenAmountIndex].amount + Number(toTokenAmount),
      }

      setTimeout(() => {
        setFromToken(newTokenList[fromTokenAmountIndex])
        setToToken(newTokenList[toTokenAmountIndex])
        setTokenList(newTokenList)
        setIsSwapping(false)
        notify('Success')
      }, 1000)
    }
  }

  useEffect(() => {
    handleChangeMode()
  }, [mode])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleCalcSwapToken(fromTokenAmount)
      setIsSwapping(false)
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [fromToken, fromTokenAmount])

  useEffect(() => {
    let tokens: TTokenList[] = [...new Set(dummyData)].map((el) => {
      if (el.currency === 'USD') {
        return {
          ...el,
          amount: 200,
        }
      }
      return {
        ...el,
        amount: 0,
      }
    })

    const USD = tokens.find((el) => el.currency === 'USD')
    const BUSD = tokens.find((el) => el.currency === 'BUSD')

    setMode(localStorage.getItem('mode') || '')
    setFromToken(USD)
    setToToken(BUSD)
    setTokenList(tokens)
  }, [])

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        handleSwapToken,
        fromToken,
        toToken,
        isSwapping,
        toTokenAmount,
        setIsSwapping,
        handleCalcSwapToken,
        setFromTokenAmount,
        tokenList,
        setToToken,
        setFromToken,
        fromTokenAmount,
        handleSubmitSwap,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useMode = () => {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
