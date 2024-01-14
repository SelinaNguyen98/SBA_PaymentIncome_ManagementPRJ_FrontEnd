import * as yup from "yup";

export const createPaymentSchema = yup
  .object()
  .shape({
    payment_date: yup.string().required("Ngày thanh toán là bắt buộc"),
    name: yup.string().required("name là bắt buộc"),
    cost: yup
      .number()
      .typeError("cost must be a number")
      .required("Chi phí là bắt buộc")
      .min(0, "Phải lớn hơn hoặc bằng 0")
      .default(0),
  })
  .required();