import type en from './en';

const vi: typeof en = {
  common: {
    back: 'Quay lại',
    showPassword: 'Hiện mật khẩu',
    hidePassword: 'Ẩn mật khẩu',
  },
  signIn: {
    tagline: 'Sổ sách trang trại, luôn trong túi bạn.',
    email: 'Email',
    password: 'Mật khẩu',
    submit: 'Đăng nhập',
    noAccount: 'Chưa có tài khoản?',
    signUp: 'Đăng ký',
  },
  signUp: {
    title: 'Tạo tài khoản',
    tagline: 'Quản lý trang trại của bạn dễ dàng hơn',
    name: 'Họ và tên',
    namePlaceholder: 'Nguyễn Văn A',
    email: 'Email',
    emailPlaceholder: 'ban@email.com',
    password: 'Mật khẩu',
    passwordPlaceholder: 'Ít nhất 8 ký tự',
    agree:
      'Tôi đồng ý với <terms>Điều khoản sử dụng</terms> và <privacy>Chính sách bảo mật</privacy>',
    submit: 'Đăng ký',
    orContinueWith: 'hoặc tiếp tục với',
    continueWithGoogle: 'Tiếp tục với Google',
    continueWithApple: 'Tiếp tục với Apple',
    haveAccount: 'Đã có tài khoản? <signIn>Đăng nhập</signIn>',
  },
  passwordStrength: {
    weak: 'Yếu',
    medium: 'Trung bình',
    strong: 'Mạnh',
  },
  validation: {
    nameRequired: 'Vui lòng nhập họ và tên',
    nameMin: 'Tối thiểu {{count}} ký tự',
    emailTaken: 'Email này đã được đăng ký',
    passwordWeak: 'Mật khẩu quá yếu',
    termsRequired: 'Vui lòng đồng ý với điều khoản',
    emailRequired: 'Vui lòng nhập email',
    emailInvalid: 'Email không hợp lệ',
    passwordRequired: 'Vui lòng nhập mật khẩu',
    passwordMin: 'Tối thiểu {{count}} ký tự',
  },
};

export default vi;
