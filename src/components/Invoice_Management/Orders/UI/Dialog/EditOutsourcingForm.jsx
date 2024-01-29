/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../../Utils/Button";
import Modal from "../../../../../Utils/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatNumberSeparator} from "../../../../../Utils/utils/maths";
import { createOutsourcingSchema } from "../../../../../Utils/validation/rulesYup";
// eslint-disable-next-line no-unused-vars
import { updateOutsourcing } from "../../Controller";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function EditOutsourcingForm({
  // eslint-disable-next-line react/prop-types
  visible,
  // eslint-disable-next-line react/prop-types
  cancel,
  // eslint-disable-next-line react/prop-types
  t,
  // eslint-disable-next-line react/prop-types, no-unused-vars
  invoiceOutsourcing,
  // eslint-disable-next-line react/prop-types, no-unused-vars
  selectedDate,
  // eslint-disable-next-line react/prop-types, no-unused-vars
  exchangeRateId,
  // eslint-disable-next-line react/prop-types, no-unused-vars
  show_result,
}) {
  const t_add_outsourcing = t;
  const {
    register,
    // eslint-disable-next-line no-unused-vars
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    setValue,
    // eslint-disable-next-line no-unused-vars
    setError,
    // eslint-disable-next-line no-unused-vars
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createOutsourcingSchema) });
  // const convertedDate = new Date(invoicePayment?.payment_date);
  // eslint-disable-next-line react/prop-types
  const formattedDate =
    invoiceOutsourcing?.outsourced_date?.split(" ")[0] ?? "";
  // State Format Day
  // eslint-disable-next-line no-unused-vars
  const maxDate = new Date(
    // eslint-disable-next-line react/prop-types
    selectedDate.getFullYear(),
    // eslint-disable-next-line react/prop-types
    selectedDate.getMonth() + 1,
    1
  )
    .toISOString()
    .split("T")[0]; //max day
  // eslint-disable-next-line no-unused-vars
  const minDate = new Date(
    // eslint-disable-next-line react/prop-types
    selectedDate.getFullYear(),
    // eslint-disable-next-line react/prop-types
    selectedDate.getMonth(),
    2
  )
    .toISOString()
    .split("T")[0];
  // State Format Day
  // eslint-disable-next-line no-unused-vars
  const existingData = {
    // eslint-disable-next-line react/prop-types
    id: invoiceOutsourcing?.id,
    outsourced_date: formattedDate,
    outsourced_project:  invoiceOutsourcing?.outsourced_project,
    // eslint-disable-next-line react/prop-types
    company_name:  invoiceOutsourcing?.company_name,
    // eslint-disable-next-line react/prop-types
    vnd: formatNumberSeparator( invoiceOutsourcing?.vnd.toString() ?? ""),
  };
  useEffect(() => {
    setValue("user_id", localStorage.getItem("user_id") || 1);
    setValue("exchange_rate_id", exchangeRateId);
    Object.keys(existingData).forEach((key) => {
      setValue(key, existingData[key]);
    });
  }, [selectedDate, invoiceOutsourcing]);
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await updateOutsourcing(data);
      console.log(response);
      cancel();
      show_result();
    } catch (error) {
      console.error("Error submitting form:", error.data);
    }
  });
  return (
    <Modal visible={visible}>
      <div className="flex flex-col bg-white m-2 py-5 px-12  rounded-2xl">
        <span className=" uppercase  py-1 mx-auto my-3 px-12 text-center bg-white-500/80    font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
          {t_add_outsourcing("add_edit_order.edit_outsourcing_cost")}
        </span>
        <form className="px-4 mt-5" onSubmit={onSubmit}>
          <div className={` grid lg:grid-cols-12 gap-y-2 mb-2 gap-12`}>
            <label className="lg:col-span-3">
              {t_add_outsourcing("add_edit_order.day")}
            </label>
            <div className=" lg:col-span-9 ml-3">
            <input
                type="date"
                {...register("outsourced_date")}
                className="w-full py-1 rounded-sm px-2 bg-main-theme"
                min={minDate}
                max={maxDate}
              />
              <div
                className={`text-red-500 min-h-[1.25rem] text-sm overflow-x-hidden`}
              >
                {errors?.outsourced_date?.message}
              </div>
            </div>
          </div>
          <InputCustomComponent
            label={t_add_outsourcing("add_edit_order.Outsourced_project")}
            name="outsourced_project"
            register={register}
            errorMessage={errors?.outsourced_project?.message}
          />
          <InputCustomComponent
            label={t_add_outsourcing("add_edit_order.Company_name")}
            name="company_name"
            register={register}
            errorMessage={errors?.company_name?.message}
          />
          <div className={` grid lg:grid-cols-12 gap-y-2 mb-2 gap-12`}>
            <label className="lg:col-span-3">VND</label>
            <div className=" lg:col-span-9 ml-3">
              <input
                defaultValue={0}
                {...register("vnd")}
                onChange={(e) => {
                  e.target.value = formatNumberSeparator(e.target.value);
                }}
                className="w-full py-1 rounded-sm px-2 bg-main-theme"
              />
              <div
                className={`text-red-500 min-h-[1.25rem] text-sm overflow-x-hidden`}
              >
                {errors?.vnd?.message}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around mt-6 mb-7">
            <Button
              type="submit"
              className={"py-2 border-2 border-gray min-w-[150px]"}
            >
              {t_add_outsourcing("button.save")}
            </Button>
            <Button
              onClick={cancel}
              className={"border-red-500 bg-white border-2 py-2 min-w-[150px]"}
            >
              <span className="text-red-500 uppercase">
                {t_add_outsourcing("button.cancel")}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

const InputCustomComponent = ({
  // eslint-disable-next-line react/prop-types
  label,
  // eslint-disable-next-line react/prop-types
  name,
  // eslint-disable-next-line react/prop-types
  register,
  // eslint-disable-next-line react/prop-types
  placeholder,
  // eslint-disable-next-line react/prop-types
  errorMessage,
  // eslint-disable-next-line react/prop-types
  as: Element = "input",
  // eslint-disable-next-line react/prop-types
  type = "text",
  // eslint-disable-next-line react/prop-types
  classNameInput = "w-full py-1 rounded-sm px-2 bg-main-theme",
  // eslint-disable-next-line react/prop-types
  classNameError,
  // eslint-disable-next-line react/prop-types
  defaultValue = "",
  // eslint-disable-next-line react/prop-types
  id,
}) => {
  return (
    <div className={` grid lg:grid-cols-12 gap-y-2 mb-2 gap-12`}>
      <label className="lg:col-span-3">{label}</label>
      <div className=" lg:col-span-9 ml-3">
        <Element
          {...register(name)}
          placeholder={placeholder}
          className={classNameInput}
          type={type}
          defaultValue={defaultValue}
          rows={3}
          id={id}
        />
        <div
          className={`text-red-500 min-h-[1.25rem] text-sm overflow-x-hidden ${classNameError}`}
        >
          {errorMessage}
        </div>
      </div>
    </div>
  );
};
