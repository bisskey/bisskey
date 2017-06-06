export type PostDataItem = {
  id: string,
  channel: {
    id: string,
    name: string
  },
  bissKey: string
}

export type PostData = {
  [string]: PostDataItem[]
}
