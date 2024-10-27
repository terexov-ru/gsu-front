export const useValidate = () => {
  const phoneMask = "+7 (###) ###-##-##";
  const snilsMask = "###-###-### ##";
  const passportMask = "## ## ######";

  function validateEmail(value: string): boolean | string {
    // if the field is empty
    if (!value) {
      return "Это поле обязательное";
    }
    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
      return "E-mail должен быть валидным";
    }
    // All is good
    return true;
  }

  function validateName(value: string): boolean | string {
    if (value !== "" && value) {
      const nameRegex = /^[а-яА-ЯёЁ\s]+$/;

      if (value.trim() === "") {
        return "Имя не может быть пустым";
      }

      if (!nameRegex.test(value)) {
        return "Имя может содержать только буквы и пробелы";
      }
    } else {
      return "Имя не может быть пустым";
    }

    return true;
  }

  function validateAddress(value: string): boolean | string {
    if (value !== "" && value) {
      if (value.trim() === "") {
        return "Адрес не может быть пустым";
      }
    } else {
      return "Адрес не может быть пустым";
    }

    return true;
  }

  function validateLength(value: String, count: Number) {
    if (value !== "" && value) {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length !== count) {
        return "Поле не заполнено";
      }
    } else {
      return "Поле не заполнено";
    }

    return true;
  }

  function validatePhone(phoneNumber: string): boolean | string {
    return validateLength(phoneNumber, 11);
  }

  function validatePassport(value: string): boolean | string {
    return validateLength(value, 10);
  }

  function validateSnils(value: string): boolean | string {
    return validateLength(value, 11);
  }

  function validateComment(value: string): boolean | string {
    if (value.trim() === "") {
      return "Комментарий не может быть пустым";
    }

    if (value.length > 300) {
      return "Комментарий не может быть больше 300 букв";
    }

    return true;
  }

  return {
    validateEmail,
    validateName,
    validateComment,
    validatePhone,
    validatePassport,
    validateSnils,
    validateAddress,
    phoneMask,
    snilsMask,
    passportMask,
  };
};
