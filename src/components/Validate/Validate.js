const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password) => {
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

const validateEmpty = (value) => {
  if (!value) {
    return false;
  }
  return true;
};

const validAnswers = (questions) => {
  let countAnswerCorrect = 0;
  let validAnswers = {
    isValidAnswer: true,
    isValidAnswerCorrect: true,
    indexQuestion: 0,
    indexAnswer: 0,
  };

  for (let i = 0; i < questions.length; i++) {
    for (let j = 0; j < questions[i].answers.length; j++) {
      if (questions[i].answers[j].isCorrect === true) {
        countAnswerCorrect++;
      }
      if (!questions[i].answers[j].description) {
        validAnswers.isValidAnswer = false;
        validAnswers.indexAnswer = j + 1;
        break;
      }
    }
    validAnswers.indexQuestion = i + 1;
    if (validAnswers.isValidAnswer === false) {
      break;
    }
    if (countAnswerCorrect === 0) {
      validAnswers.isValidAnswerCorrect = false;
      break;
    }
    countAnswerCorrect = 0;
  }

  return validAnswers;
};

const validQuestions = (questions) => {
  let validQuestion = {
    isValidQuestion: true,
    indexQ: 0,
  };

  for (let i = 0; i < questions.length; i++) {
    if (!questions[i].description) {
      validQuestion.isValidQuestion = false;
      validQuestion.indexQ = i + 1;
      break;
    }
  }

  return validQuestion;
};

export {
  validateEmpty,
  validateEmail,
  validatePassword,
  validAnswers,
  validQuestions,
};
