import * as yup from "yup";

export const createPaymentSchema = yup
  .object()
  .shape({
    payment_date: yup.string().required("Value can not be null."),
    name: yup.string().required("Please provide a payment name."),
    cost: yup.string().required(),
    pay: yup.string().required("Please provide a pay."),
    category_id: yup.string().required("Please choose a account category."),
  })
  .required();

export const createOrderSchema = yup
  .object()
  .shape({
    order_date: yup.string().required("Value can not be null."),
    company_name: yup.string().required("Please provide a company name."),
    vnd: yup.string().required(),
  })
  .required();



  export const createCategorySchema = yup
  .object()
  .shape({
    name: yup.string().required("Name is mandatory"),
    group_id: yup.string().required("Account Category Group is mandatory"),
  })
  .required();


export const createPaymentOrderSchema = yup
  .object()
  .shape({
    payment_date: yup.string().required("Value can not be null."),
    company_name: yup.string().required("Please provide a company name."),
    vnd: yup.string().required(),
  })
  .required();

export const createOutsourcingSchema = yup
  .object()
  .shape({
    outsourced_date: yup.string().required("Value can not be null."),
    outsourced_project: yup.string().required("Please choose a outsourced project."),
    company_name: yup.string().required("Please provide a company name."),
    vnd: yup.string().required(),
  })
  .required();
