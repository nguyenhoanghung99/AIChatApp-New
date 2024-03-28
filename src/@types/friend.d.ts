type TAddFriendForm = {
  recipient: string
}
type TAcceptForm = {
  request: string,
  status?: "ACCEPTED"
}

type TFriendForm = {
  friendId: string
}