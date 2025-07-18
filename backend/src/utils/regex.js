import { parseISO, isValid } from 'date-fns';

export const validateRegex = async (fieldType, value) => {
    if (value) {
        switch (fieldType) {
            case 'email': {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,100}$/.test(
                    value
                );
            }

            case 'name': {
                return /^[a-zA-Z ]*$/.test(value);
            }

            case 'password':
            case 'newPassword': {
                return value.length >= 8 && value.length <= 12;
            }

            case 'dateOfBirth': {
                return isValid(parseISO(value));
                // check for atleast 18 years old as well
            }

            default: {
                console.log("Doesn't have a defined regex.");
                return;
            }
        }
    }
};
