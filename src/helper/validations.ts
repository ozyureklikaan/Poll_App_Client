export function CheckTCKN(value) {
  value = value.toString();
  var isEleven = /^[0-9]{11}$/.test(value);
  var totalX = 0;
  for (var i = 0; i < 10; i++) {
    totalX += Number(value.substr(i, 1));
  }
  var isRuleX = totalX % 10 == value.substr(10, 1);
  var totalY1 = 0;
  var totalY2 = 0;
  for (var i = 0; i < 10; i += 2) {
    totalY1 += Number(value.substr(i, 1));
  }
  for (var i = 1; i < 10; i += 2) {
    totalY2 += Number(value.substr(i, 1));
  }
  var isRuleY = ((totalY1 * 7) - totalY2) % 10 == value.substr(9, 0);
  return isEleven && isRuleX && isRuleY;
};

export function  CheckVKN(kno) {
  var v1 = 0;
  var v2 = 0;
  var v3 = 0;
  var v4 = 0;
  var v5 = 0;
  var v6 = 0;
  var v7 = 0;
  var v8 = 0;
  var v9 = 0;
  var v11 = 0;
  var v22 = 0;
  var v33 = 0;
  var v44 = 0;
  var v55 = 0;
  var v66 = 0;
  var v77 = 0;
  var v88 = 0;
  var v99 = 0;
  var v_last_digit = 0;
  var toplam = 0;

  var isTen = /^[0-9]{10}$/.test(kno);
 

  if (kno.length == 10) {

      v1 = (Number(kno.charAt(0)) + 9) % 10;

      v2 = (Number(kno.charAt(1)) + 8) % 10;

      v3 = (Number(kno.charAt(2)) + 7) % 10;

      v4 = (Number(kno.charAt(3)) + 6) % 10;

      v5 = (Number(kno.charAt(4)) + 5) % 10;

      v6 = (Number(kno.charAt(5)) + 4) % 10;
      v7 = (Number(kno.charAt(6)) + 3) % 10;
      v8 = (Number(kno.charAt(7)) + 2) % 10;
      v9 = (Number(kno.charAt(8)) + 1) % 10;
      v_last_digit = Number(kno.charAt(9));

      v11 = (v1 * 512) % 9;
      v22 = (v2 * 256) % 9;
      v33 = (v3 * 128) % 9;
      v44 = (v4 * 64) % 9;
      v55 = (v5 * 32) % 9;
      v66 = (v6 * 16) % 9;
      v77 = (v7 * 8) % 9;
      v88 = (v8 * 4) % 9;
      v99 = (v9 * 2) % 9;

      if (v1 != 0 && v11 == 0) v11 = 9;
      if (v2 != 0 && v22 == 0) v22 = 9;
      if (v3 != 0 && v33 == 0) v33 = 9;
      if (v4 != 0 && v44 == 0) v44 = 9;
      if (v5 != 0 && v55 == 0) v55 = 9;
      if (v6 != 0 && v66 == 0) v66 = 9;
      if (v7 != 0 && v77 == 0) v77 = 9;
      if (v8 != 0 && v88 == 0) v88 = 9;
      if (v9 != 0 && v99 == 0) v99 = 9;
      toplam = v11 + v22 + v33 + v44 + v55 + v66 + v77 + v88 + v99;


      if (toplam % 10 == 0) toplam = 0;
      else toplam = (10 - (toplam % 10));

      if (isTen && toplam == v_last_digit) {


          return true;
      } else return false;

  } else return false;

};

export var inputRules = {
  tckn:value=>{
    if (value.length == 11){
      return (CheckTCKN(value)) || 'Girmiş olduğunuz TC Kimlik numarası hatalıdır';
    }

    if (value.length == 10){
      return (CheckVKN(value)) || 'Girmiş olduğunuz VKN Kimlik numarası hatalıdır';
    }

    if (value.length > 0){
      return 'Lütfen geçerli bir VKN veya TCKN giriniz';
    }

    return true;
  },
  vkn:value=>{
    if (value.length != 10) return true;
    return (CheckVKN(value)) || 'Girmiş olduğunuz VKN numarası hatalıdır';
  },
  required: value => !!value || 'Zorunlu',
  phoneNumber: value => {
    const pattern = /^0[2-9]\d{9}$/
    return (value === undefined || value === '' || isNaN(value) || (value !== '' && pattern.test(value))) || 'Geçersiz telefon numarası'
  },
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Geçersiz mail adresi'
  }
};
