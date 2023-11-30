import CoinContainer from '../CoinContainer'
import SwapButton from '../Button/SwapButton'
import SubmitButton from '../Button/SubmitButton'
import { useMode } from '../../context/AppContext'
import { convertDate } from '../../utils'

const Form = () => {
  const { fromToken, toToken, toTokenAmount } = useMode()

  return (
    <div className="basis-1/3 min-w-[380px] max-sm:basis-11/12 bg-white dark:nav-dark rounded-2xl px-6 py-8 h-[650px] min-h-[600px] mt-[72px] flex flex-col justify-between items-center">
      <CoinContainer
        title="Amount to send"
        token={fromToken?.currency as string}
        date={convertDate(fromToken?.date as string)}
        price={fromToken?.price.toString() ?? '0'}
        amount={fromToken?.amount.toString() ?? '0'}
      />
      <SwapButton />
      <CoinContainer
        title="Amount to receive"
        token={toToken?.currency as string}
        amount={toToken?.amount.toString() ?? '0'}
        date={convertDate(toToken?.date as string)}
        price={toToken?.price.toString() ?? '0'}
        isDisable
        toTokenAmount={toTokenAmount}
      />
      <SubmitButton />
    </div>
  )
}

export default Form
