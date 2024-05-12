export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password) => {
  var MinLength = 6;

  var meetsLengthRequirements = password.length >= MinLength;
  var hasUpperCasevarter = false;
  var hasLowerCasevarter = false;
  var hasDecimalDigit = false;

  if (meetsLengthRequirements) {
    for (var i = 0, len = password.length; i < len; i++) {
      var char = password.charAt(i);
      if (!isNaN(+char * 1)) {
        hasDecimalDigit = true;
      } else {
        if (char === char.toUpperCase()) {
          hasUpperCasevarter = true;
        }
        if (char === char.toLowerCase()) {
          hasLowerCasevarter = true;
        }
      }
    }
  }

  var isValid =
    meetsLengthRequirements &&
    hasUpperCasevarter &&
    hasLowerCasevarter &&
    hasDecimalDigit;
  return isValid;
};

export const validateEmpty = (value) => {
  if (!value) {
    return false;
  }
  return true;
};
