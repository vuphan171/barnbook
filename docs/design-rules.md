# Design rules

Quy ước kích thước, khoảng cách và màu cho UI của Barnbook. Mọi giá trị lấy từ token trong `src/themes`, không viết số trực tiếp trong component.

## 1. Lưới 4

- Tên token theo kiểu Tailwind: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`… Key bắt đầu bằng số phải truy cập bằng ngoặc vuông: `SPACING['2xl']`.
- Mọi kích thước (chiều cao, padding, margin, gap, icon) là **bội của 4**. Riêng cỡ chữ (mục 5) và radius (mục 6) theo thang của Tailwind.
- Mỗi thang (spacing, chiều cao control…) tăng đều **+4 mỗi bậc**.
- Không dùng số lẻ như 13, 22, 50. Ngoại lệ duy nhất là độ dày viền (`hairlineWidth`, 1, 1.5, 2).

## 2. Spacing

| Token | Giá trị | Dùng cho |
|---|---|---|
| `xs` | 4 | Khoảng cách icon–chữ, chi tiết nhỏ |
| `sm` | 8 | Gap trong một nhóm (label–input) |
| `md` | 12 | Padding nhỏ |
| `lg` | 16 | Gap giữa các field trong form |
| `xl` | 20 | Padding control |
| `2xl` | 24 | Padding màn hình, gap giữa các section |
| `3xl` | 28 | Padding control lớn |
| `4xl` | 32 | Khoảng cách lớn giữa các vùng |
| `5xl` | 36 | Padding control lớn nhất |

## 3. Chiều cao control

Dùng chung cho Button, Input và mọi control bấm được. Mỗi bậc **+4**.

| Token | Giá trị |
|---|---|
| `xs` | 36 |
| `sm` | 40 |
| `md` | 44 |
| `lg` | 48 |
| `xl` | 52 |
| `2xl` | 56 |
| `3xl` | 60 |

- Control nhỏ hơn 48 (`xs`, `sm`, `md`) phải thêm `hitSlop` để vùng chạm đạt tối thiểu 48 (Android 48dp, iOS 44pt).

## 4. Button

Mỗi bậc: chiều cao +4, padding ngang +4, cỡ chữ lên một bậc trong thang Typography (đến `2xl` thì dừng). Variant tính sau.

| Size | Chiều cao | Padding ngang | Cỡ chữ |
|---|---|---|---|
| `xs` | 36 | 12 (`md`) | 12 (`xs`) |
| `sm` | 40 | 16 (`lg`) | 14 (`sm`) |
| `md` | 44 | 20 (`xl`) | 16 (`base`) |
| `lg` | 48 | 24 (`2xl`) | 18 (`lg`) |
| `xl` | 52 | 28 (`3xl`) | 20 (`xl`) |
| `2xl` | 56 | 32 (`4xl`) | 24 (`2xl`) |
| `3xl` | 60 | 36 (`5xl`) | 24 (`2xl`) |

- Size mặc định: `md`.
- Radius: `RADIUS.xl` (12) cho mọi size.
- Chữ: `FONT_FAMILY.semibold`.

## 5. Typography

Theo [thang font-size của Tailwind](https://tailwindcss.com/docs/font-size). Mỗi cỡ chữ đi kèm một line-height cố định. Cỡ chữ mặc định tên là `base`, giống Tailwind.

| Token | Cỡ chữ | Line-height |
|---|---|---|
| `xs` | 12 | 16 |
| `sm` | 14 | 20 |
| `base` | 16 | 24 |
| `lg` | 18 | 28 |
| `xl` | 20 | 28 |
| `2xl` | 24 | 32 |
| `3xl` | 30 | 36 |
| `4xl` | 36 | 40 |
| `5xl` | 48 | 48 |
| `6xl` | 60 | 60 |

- Đặt độ đậm bằng `fontFamily` (`FONT_FAMILY.semibold`…), không dùng `fontWeight`.

## 6. Radius

Theo [thang border-radius của Tailwind](https://tailwindcss.com/docs/border-radius).

| Token | Giá trị | Dùng cho |
|---|---|---|
| `none` | 0 | |
| `xs` | 2 | |
| `sm` | 4 | Checkbox, tag nhỏ |
| `md` | 6 | |
| `lg` | 8 | Card nhỏ |
| `xl` | 12 | Button, Input |
| `2xl` | 16 | Card, sheet |
| `3xl` | 24 | |
| `4xl` | 32 | |
| `full` | 9999 | Nút tròn, avatar |

## 7. Màu

- Mọi màu nằm trong `COLORS` (dạng phẳng). Component không dùng `PALETTE`.
- Màu brand/semantic đi theo cặp: `primary` / `primaryForeground` (màu nền / màu chữ trên nền đó). Tương tự `secondary`, `destructive`.
- **Không có token cho trạng thái nhấn.** Trạng thái do component tự xử lý:
  - Nút nền đặc (`primary`, `destructive`…): `opacity: 0.9` khi nhấn.
  - Nút nền sáng/có viền (`secondary`, back button…): nền chuyển sang `COLORS.muted` khi nhấn.
  - Disabled: `opacity: 0.5`.
