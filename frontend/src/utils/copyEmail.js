import { EMAIL } from '../constants/contacts';
export default function copyEmail() {
    window.navigator.clipboard.writeText(EMAIL);
    alert('Email Copied to Clipboard 🤗');
}
