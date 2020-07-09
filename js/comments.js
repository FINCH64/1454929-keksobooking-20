// var images = document.querySelector('#images');


// if (Number(priceValue) < Number(currentMinPrice)) {
//   alert('Цена начинается от ' + Number(currentMinPrice) + ' ₽/ночь');
//   priceValidity = false;
// } else if (Number(priceValue) > 1000000) {
//   alert('Цена не может превышать 1 000 000' + ' ₽/ночь');
//   priceValidity = false;
// } else {
//   priceValidity = true;
// }

// switch (true) {
//   case titleV.value.length < 30:
//     titleValidity = false;
//     alert('Описание не может быть короче 30 символов');
//     break;
//   case titleV.value.length > 100:
//     titleValidity = false;
//     alert('Описание не может быть длиннее 100 символов');
//     break;
//   case titleV.value.length === 0:
//     titleValidity = false;
//     alert('Заполните поле с описанием');
//     break;
//   default:
//     titleValidity = true;
//     break;
// }
// if (titleValidity === false || priceValidity === false) {
//   var errDiv = document.createElement('div');
//   errDiv.className = 'error';
//   var errP = document.createElement('p');
//   errP.className = 'error__message';
//   errP.textContent = 'Ошибка загрузки объявления';
//   var errButton = document.createElement('button');
//   errButton.className = 'error_button';
//   errButton.textContent = 'Попробовать снова';
//   errDiv.appendChild(errP);
//   errDiv.appendChild(errButton);
//   window.main.map.appendChild(errDiv);
//   return;
// }

// var uList = {
//   author: {
//     avatar: 'img/avatars/default.png',
//   },

//   location: {
//     x: window.map.addressX,
//     y: window.map.addressY,
//   },

//   offer: {
//     title: titleV.value,
//     address: window.main.address.value,
//     price: priceInput.value,
//     type: houseType,
//     rooms: Number(roomNumber.value),
//     guests: Number(currentCapacity.value),
//     checkin: timein.value,
//     checkout: timeout.value,
//     features: 'washer',
//     description: description.value,
//     photos: 1,
//   },
// };
// window.data.uList = uList;
