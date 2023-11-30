export type TCloseReason = 'backdropClick' | 'escapeKeyDown'

export type TToken = {
  currency: string
  date: string
  price: number
}

export type TTokenList = TToken & { amount: number }

export interface IDialogBaseRef {
  show: (callback?: () => void) => void
  hide: (_event?: object, reason?: TCloseReason) => void
}

export enum EDateTimeFormat {
  Date = 'YYYY-MM-DD',
  DateTime = 'YYYY-MM-DD HH:mm:ss',
}
