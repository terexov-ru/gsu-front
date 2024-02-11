export const useValidate = () => {

    const phoneMask = '+7 (###) ###-##-##';

    function validateEmail(value: string): boolean | string {
        // if the field is empty
        if (!value) {
            return 'Это поле обязательное';
        }
        // if the field is not a valid email
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regex.test(value)) {
            return 'E-mail должен быть валидным';
        }
        // All is good
        return true;
    }

    function validateName(value: string): boolean | string {
        const nameRegex = /^[а-яА-ЯёЁ\s]+$/;

        if (value.trim() === '') {
            return 'Имя не может быть пустым';
        }

        if (!nameRegex.test(value)) {
            return 'Имя может содержать только буквы и пробелы';
        }

        return true;
    }

    function validatePhone(phoneNumber: string): boolean | string {
        const digitsOnly = phoneNumber.replace(/\D/g, '');

        if (digitsOnly.length !== 11) {
            return 'Номер телефона не заполнен до конца';
        }

        return true;
    }

    function validateComment(value: string): boolean | string {
        if (value.trim() === '') {
            return 'Комментарий не может быть пустым';
        }

        if (value.length > 300) {
            return 'Комментарий не может быть больше 300 букв';
        }

        return true;
    }

    return {
        validateEmail,
        validateName,
        validateComment,
        validatePhone,
        phoneMask,
    }
}
