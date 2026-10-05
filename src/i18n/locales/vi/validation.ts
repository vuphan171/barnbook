import type { validation as en } from '../en/validation';

export const validation: typeof en = {
  nameRequired: 'Vui lòng nhập họ và tên',
  nameMin: 'Tối thiểu {{count}} ký tự',
  emailTaken: 'Email này đã được đăng ký',
  passwordWeak: 'Mật khẩu quá yếu',
  termsRequired: 'Vui lòng đồng ý với điều khoản',
  emailRequired: 'Vui lòng nhập email',
  emailInvalid: 'Email không hợp lệ',
  passwordRequired: 'Vui lòng nhập mật khẩu',
  passwordMin: 'Tối thiểu {{count}} ký tự',
};
