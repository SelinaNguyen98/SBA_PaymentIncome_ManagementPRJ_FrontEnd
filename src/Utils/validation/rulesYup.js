import * as yup from "yup";

export const createPaymentSchema = yup
  .object()
  .shape({
    payment_date: yup.string().required("Value can not be null!"),
    name: yup.string().required("Value can not be null!"),
    cost: yup
      .number()
      .typeError("cost must be a number")
      .required("Value can not be null!")
      .min(0, "Phải lớn hơn hoặc bằng 0")
      .default(0),
  })
  .required();

export const createOrderSchema = yup
  .object()
  .shape({
    order_date: yup.string().required("Value can not be null!"),
    company_name: yup.string().required("Value can not be null!"),
    vnd: yup.string().required(),
  })
  .required();
