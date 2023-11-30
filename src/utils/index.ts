import dayjs from 'dayjs'
import { EDateTimeFormat } from '../types'
import { Id, toast, ToastOptions } from 'react-toastify'

export const convertDate = (input: string): string => {
  const dateTime = dayjs(input)
  const formattedDate = dateTime.format(EDateTimeFormat.DateTime)
  return formattedDate
}

const notifyStyle: ToastOptions = {
  theme: 'colored',
  autoClose: 3000,
  position: 'top-center',
  hideProgressBar: false,
  progressStyle: {
    backgroundColor: 'white',
  },
}

export const notify = (message: string, err?: boolean): Id => {
  try {
    if (err) {
      return toast.error(message, notifyStyle)
    }
    return toast.success(message, notifyStyle)
  } catch (e) {
    console.error('notify.show.fail', e)
    return ''
  }
}
