import * as yup from "yup";

export const createPaymentSchema = yup
  .object()
  .shape({
    payment_date: yup.string().required("Ngày thanh toán là bắt buộc"),
    name: yup.string().required("name là bắt buộc"),
    cost: yup
      .string()
      .required("is required")
      .matches(/^\d{1,3}(?:\.\d{3})*(?:,\d+)?$/, "hay nhap 1 so"),
    pay: yup.string().required("is required"),
    category_id: yup.string().required("is required"),
  })
  .required();
