import * as yup from "yup";

export const createPaymentSchema = yup
  .object()
  .shape({
    payment_date: yup.string().required("Ngày thanh toán là bắt buộc"),
    name: yup.string().required("name là bắt buộc"),
    cost: yup.string().required(),
    pay: yup.string().required("is required"),
    category_id: yup.string().required("is required"),
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

  export const createCategorySchema = yup
  .object()
  .shape({
    name: yup.string().required("Name là bắt buộc"),
    group_id: yup.string().required("Account Category Group là bắt buộc"),  })
export const createPaymentOrderSchema = yup
  .object()
  .shape({
    payment_date: yup.string().required("Value can not be null!"),
    company_name: yup.string().required("Value can not be null!"),
    vnd: yup.string().required(),
  })
  .required();

export const createOutsourcingSchema = yup
  .object()
  .shape({
    outsourced_date: yup.string().required("Value can not be null!"),
    outsourced_project: yup.string().required("Value can not be null!"),
    company_name: yup.string().required("Value can not be null!"),
    vnd: yup.string().required(),
  })
  .required();
