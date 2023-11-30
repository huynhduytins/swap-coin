import Dialog from '@mui/material/Dialog'
import FormSearch from './FormSearch'
import { TToken, TTokenList } from '../../types'

export interface IModalSearch {
  open: boolean
  onClose: () => void
  handleChosenToken: (value: TTokenList | undefined) => void
  isToToken?: boolean
}

const ModalSearch = ({
  onClose,
  open,
  isToToken,
  handleChosenToken,
}: IModalSearch) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <FormSearch
        onClose={onClose}
        isToToken={isToToken}
        handleChosenToken={handleChosenToken}
      />
    </Dialog>
  )
}

export default ModalSearch
