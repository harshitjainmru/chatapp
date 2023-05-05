export const REGEX ={
  NUMBER:/^\d{10}/,
  NAME: /^[a-z\ -]+$/i,
  EMAIL: /^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w{2,5}$/i,
  ONLY_NUMBER: /^\d+$/,
  PASSWORD:  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&`~:^])[A-Za-z\d@$!%*#?&`~:^]{8,16}$/,


}
export const LIMIT = {
  MAX_EMAIL_LENGTH: 100,
  MAX_NAME_LENGTH: 20,
  MIN_NAME_LENGTH: 3,
  MAX_PASSWORD_LENGTH:16,
  MIN_PASSWORD_LENGTH:8,
  MAX_PHONE_NUMBER_LENGTH:10,
  MAX_GROUP_LENGTH: 10,
  MAX_CHAT_LENGTH:600,


}
