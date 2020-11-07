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

export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({identifier, password})
  })
  .then((response => response.json()))
  // .then((data) => {
  //   if (data.user){
  //     localStorage.setItem('jwt', data.jwt);
  //     return data;
  //   }
  // })
  .then((data) => {
    if (data.jwt){
      localStorage.setItem('jwt', data.jwt);
      return data;
    } else {
      return;
    }
  })
  .catch(err => console.log(err))
};

// Проверяем, есть ли свойство jwt в объекте data, который вернул сервер. Если пользователь нашёлся и его учётные данные действительны, у нас есть доступ к токену. Токен сохраним в localStorage пользователя, чтобы он был там всякий раз, когда пользователь вернётся в приложение. Наконец, вернём объект с данными пользователя. В противном случае, если свойство user отсутствует, ничего не вернётся и токена не будет.

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .then(data => data)
}//Функция getContent() принимает в качестве параметра один аргумент — JWT. Он будет отправлен на сервер (API) по маршруту /users/me, и, если токен действителен, вернёт ответ с информацией о пользователе.