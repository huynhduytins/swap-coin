import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useMode } from '../../context/AppContext'
import { useState, useEffect } from 'react'
interface ITokenInput {
  isDisable?: boolean
  toTokenAmount?: string
}

const TokenInput = ({ isDisable, toTokenAmount }: ITokenInput) => {
  const { mode, setIsSwapping, setFromTokenAmount, fromToken } = useMode()
  const [numToken, setNumToken] = useState<string>('')

  useEffect(() => {
    if (!isDisable) {
      setIsSwapping(true)

      const delayDebounceFn = setTimeout(() => {
        setFromTokenAmount(numToken)
      }, 500)

      return () => clearTimeout(delayDebounceFn)
    }
  }, [numToken])

  return (
    <div className="flex gap-2 p-3 py-5 items-center">
      <Button
        variant="text"
        className={`${isDisable ? 'invisible' : ''}`}
        onClick={() => setNumToken(fromToken?.amount.toString() || '0')}
      >
        <p className="font-bold font-kanit text-sm dark:text-light-850">Max</p>
      </Button>
      <TextField
        type="number"
        InputProps={{
          disableUnderline: true,
          inputProps: { min: 0 },
        }}
        value={isDisable ? (toTokenAmount ? toTokenAmount : '0') : numToken}
        disabled={isDisable}
        placeholder="0"
        variant="standard"
        className="flex-1"
        onChange={(e) => {
          setNumToken(e.target.value)
        }}
        sx={{
          '.MuiInputBase-input': {
            fontWeight: 'bold',
            fontFamily: 'Kanit',
            color: `${mode === 'dark' ? '#FDFDFD' : '#27262c'}`,
            marginLeft: `${isDisable ? '-20px' : ''}`,
          },
          '.Mui-disabled': {
            '-webkit-text-fill-color': `${
              mode === 'dark' ? '#FDFDFD' : '#27262c'
            }`,
          },
        }}
      />
    </div>
  )
}

export default TokenInput
