import type { verifyCode as en } from '../en/verify-code';

export const verifyCode: typeof en = {
  title: 'Nhập mã xác thực',
  sentTo: 'Chúng tôi đã gửi mã gồm 6 chữ số đến\n<email>{{email}}</email>',
  submit: 'Xác thực',
  resend: 'Gửi lại mã',
  resendIn: 'Gửi lại mã sau {{time}}',
  differentEmail: 'Dùng email khác',
  incorrect_one: 'Mã không đúng. Còn {{count}} lần thử.',
  incorrect_other: 'Mã không đúng. Còn {{count}} lần thử.',
  locked: 'Bạn đã nhập sai quá nhiều lần. Vui lòng yêu cầu mã mới.',
};
