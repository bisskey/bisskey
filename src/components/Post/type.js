export type PostDataItem = {
  id: string,
  channelId: string,
  bissKey: string
}

export type PostData = {
  [string]: PostDataItem[]
}
