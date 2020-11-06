import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  // Стейт, в котором содержится значение инпута
  const [form, setForm] = useState({
    name: '',
    link: ''
  });


  function handleChange(e) {  // Обработчик изменения инпута обновляет стейт
    const input = e.target;
    // const name = input.name;
    // const value = input.value;
    setForm({    // ( {...values, { [name]: value }} )
      ...form,
      [input.name]: input.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(form);
  }

  return (
    <PopupWithForm
      name='confirm'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__label'>
        <input className='popup__input popup__input_place-name'
          type='text'
          name='name'
          value={form.name} // Значение элемента «привязывается» к значению стейта
          onChange={handleChange}
          autoComplete='off'
          placeholder='Название'
          minLength='1'
          maxLength='30'
          required />
        <span className='popup__error' />
      </label>
      <label className='popup__label'>
        <input className='popup__input popup__input_image_url'
          type='url'
          inputMode='url'
          name='link'
          value={form.link}
          onChange={handleChange}
          placeholder='Ссылка на картинку'
          required />
        <span className='popup__error' />
      </label>
      <button className='popup__button'
        type='submit'
        aria-label='Сохранить новую карточку'>Создать
      </button>
    </PopupWithForm>
  )
}

export default AddPlacePopup