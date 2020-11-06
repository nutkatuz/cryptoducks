// duckAuth.js

export const BASE_URL = 'https://api.nomoreparties.co';

export const register = (username, password, email) => {
  return fetch(`${BASE_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password, email})
  })
  .then((response) => {
    try {
      if (response.status === 200){
        return response.json();
      }
    } catch(e){
      return (e)
    }
  })
  .then((res) => {
    return res; // второй обработчик then вернёт ещё один res, содержащий данные пользователя (которые он ввёл в форму регистрации), адрес запроса и уникальный подписанный JWT-токен.
  })
  .catch((err) => console.log(err));
};