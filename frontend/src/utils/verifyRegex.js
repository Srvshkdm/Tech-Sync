export default function verifyRegex(name, value, setErrors) {
    if (value) {
        switch (name) {
            case 'email': {
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,100}$/.test(
                    value
                )
                    ? setErrors((prev) => ({ ...prev, [name]: '' }))
                    : setErrors((prev) => ({
                          ...prev,
                          [name]: 'please enter a valid email.',
                      }));
                break;
            }

            case 'name': {
                /^[a-zA-Z ]*$/.test(value)
                    ? setErrors((prev) => ({ ...prev, [name]: '' }))
                    : setErrors((prev) => ({
                          ...prev,
                          [name]: `only letters are allowed`,
                      }));
                break;
            }

            case 'password':
            case 'newPassword': {
                value.length > 8 && value.length < 12
                    ? setErrors((prev) => ({ ...prev, [name]: '' }))
                    : setErrors((prev) => ({
                          ...prev,
                          [name]: `password must be 8-12 characters.`,
                      }));
                break;
            }

            case 'dateOfBirth': {
                if (isNaN(new Date(dateOfBirth).getTime())) {
                    return 'Invalid DOB entered';
                }
            }

            default: {
                console.log("Doesn't have a defined regex.");
                return;
            }
        }
    }
}
