export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); //'user name' => 'user&20name'
    let encodedValue = encodeURIComponent(params[property]); //aakash 123 => aaksh%20123

    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&"); // 'username=aakash&password=123'
};
