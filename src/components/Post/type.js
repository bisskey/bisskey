export type PostDataItem = {
  id: string,
  channel: {
    id: string,
    name: string,
    image: string
  },
  value: string
}

export type PostData = {
  [string]: PostDataItem[]
}
