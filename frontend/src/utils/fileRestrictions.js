export default function fileRestrictions(file, name, setErrors) {
    if (file) {
        const extension = file.name.split('.').pop().toLowerCase();
        const fileSize = file.size / (1024 * 1024);
        const maxSizeMB = 100;
        const allowedExtensions = ['.pdf'];
        if (!allowedExtensions.includes(extension) || fileSize > maxSizeMB) {
            return setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: 'only .pdf files are allowed and File size should not exceed 100mb.',
            }));
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
}
