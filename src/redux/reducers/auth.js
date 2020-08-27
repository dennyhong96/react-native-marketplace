import { SIGNUP, SIGNIN, LOGOUT } from "../actions/actionTypes";

const INITIAL_STATE = {
  userId: null,
  token: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP:
    case SIGNIN:
      return { ...state, token: payload.idToken, userId: payload.localId };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

/*

Object {
  "email": "hong9611272@gmail.com",
  "expiresIn": "3600",
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyODA5ZGQyMzlkMjRiZDM3OWMwYWQxOTFmOGIwZWRjZGI5ZDM5MTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcm4tc2hvcC01YzdjMyIsImF1ZCI6InJuLXNob3AtNWM3YzMiLCJhdXRoX3RpbWUiOjE1OTg0OTE3MzcsInVzZXJfaWQiOiIya0NqU0xFUGVaYnZPTDQ0STU2QnRzN0NkTk8yIiwic3ViIjoiMmtDalNMRVBlWmJ2T0w0NEk1NkJ0czdDZE5PMiIsImlhdCI6MTU5ODQ5MTczNywiZXhwIjoxNTk4NDk1MzM3LCJlbWFpbCI6Imhvbmc5NjExMjcyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJob25nOTYxMTI3MkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.hdbhaWTewkCtxgdI37LWUTfxEcLzQ-J4PXuHHF9hXvIsfH3TycZzxri9HOS9gMlFMQvzI4WQNElMkpD-1dwOCgoJM3zYO_QhIVk0PekLl4yqF5US56xa6bKCn9GWX-iJZeq6XflxeU0awLq0ZjrZR-tSTzVFEJKLoVqlzRDbDnf25FJmTVhX1dhBgKvguvx1wFbyks-e0zqdxb7exqBzReE50pNeeWWTKZBB1oB7xhuKsF4teZi6tNbgqXZ_4o55cOmPkqnZTuVoASKnoqRwwhC3BwRougqf7ylGBMHqnrwsqgaS2wVadTRqtjXXJdoYg0L2bKdRsbNTX8k40CaKKA",
  "kind": "identitytoolkit#SignupNewUserResponse",
  "localId": "2kCjSLEPeZbvOL44I56Bts7CdNO2",
  "refreshToken": "AE0u-NcMXdN4zWIE4kcU8MeCy8vqIA2eZCOBtSmBHJA3PcGX4Wq5MzVLCu90DUvH_DqHjfIxUh4gTMTRQ6ibp8UuDJxJF-qXwH4fJat3Fb_6KJRzbhK47j3SSdeJqPQOXXMMqWBRJTbNzO9RODRgvVWI5ypP26otMGK3MEhh1ptwn7WZ6BduYaXAGvrBO4fmheIIJ-09c70Zw1CL1WjUocsO8miEgvYetQ",
}

*/
