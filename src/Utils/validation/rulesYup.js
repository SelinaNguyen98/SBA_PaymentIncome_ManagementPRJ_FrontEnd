import * as yup from "yup";

export const createPaymentSchema = yup.object({
  payment_date: yup.date("dang ngay moi dung").required("Ngày thanh toán là bắt buộc"),
  cost: yup
    .number()
    .required("Chi phí là bắt buộc")
    .min(7, "Phải lớn hơn hoặc bằng 7"),
});
