// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Button from "../../../../../Utils/Button";
import Modal from "../../../../../Utils/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createOrderSchema } from "../../../../../Utils/validation/rulesYup";
import { createOrder } from "../../Controller";
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
// eslint-disable-next-line no-unused-vars
import { formatNumberSeparator } from "../../../../../Utils/utils/maths";
// eslint-disable-next-line react/prop-types, no-unused-vars
export default function AddOrderForm({
  // eslint-disable-next-line react/prop-types
  visible,
  // eslint-disable-next-line react/prop-types
  cancel,
  // eslint-disable-next-line react/prop-types, no-unused-vars
  ok,
  // eslint-disable-next-line react/prop-types, no-unused-vars
  t,
  // eslint-disable-next-line react/prop-types, no-unused-vars
  selectedDate,
  // eslint-disable-next-line react/prop-types, no-unused-vars
  exchangeRateId,
  // eslint-disable-next-line react/prop-types, no-unused-vars
  changeFirstPage,
}) {
  const t_add_order = t;
  const {
    register,
    handleSubmit,
    setValue,
    // eslint-disable-next-line no-unused-vars
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createOrderSchema) });
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      const response = await createOrder(data);
      console.log(response);
      changeFirstPage();
    } catch (error) {
      console.log(error);
    }
  });

  // State Format Day
  let maxDate = new Date(
    // eslint-disable-next-line react/prop-types
    selectedDate.getFullYear(),
    // eslint-disable-next-line react/prop-types
    selectedDate.getMonth() + 1,
    1
  )
    .toISOString()
    .split("T")[0]; //max day

  // eslint-disable-next-line react/prop-types
  let minDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 2)
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    setValue("user_id", localStorage.getItem("user_id") || 1);
    setValue("exchange_rate_id", exchangeRateId);
  }, [selectedDate, setValue]);

  return (
    <Modal visible={visible}>
      <div className="flex flex-col bg-white m-2 py-5 px-12  rounded-2xl">
        <span className="uppercase py-1 mx-auto my-3 px-12 text-center bg-white-500/80 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
          {t_add_order("add_edit_order.new_order")}
        </span>

        <form className="px-4 mt-5" onSubmit={onSubmit}>
          <div className={` grid lg:grid-cols-12 gap-y-2 mb-2 gap-12`}>
            <label className="lg:col-span-3">
            {t_add_order("add_edit_order.day")}
            </label>
            <div className=" lg:col-span-9 ml-3">
              <input
                type="date"
                {...register("order_date")}
                className="w-full py-1 rounded-sm px-2 bg-main-theme"
                min={minDate}
                max={maxDate}
                defaultValue={format(new Date(), 'dd-MM-yyyy')}
              />
              <div
                className={`text-red-500 min-h-[1.25rem] text-sm overflow-x-hidden`}
              >
                {errors?.order_date?.message}
              </div>
            </div>
          </div>
          <InputCustomComponent
            label={t_add_order("add_edit_order.Company_name")}
            name="company_name" 
            register={register}
            errorMessage={errors?.company_name?.message}
          />
          {/* <InputCustomComponent
            label={"VND"}
            name="vnd"
            register={register}
            errorMessage={errors?.vnd?.message}
          /> */}
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
              {t_add_order("button.save")}
            </Button>
            <Button
              onClick={cancel}
              className={"border-red-500 bg-white border-2 py-2 min-w-[150px]"}
            >
              <span className="text-red-500 uppercase">
                {t_add_order("button.cancel")}
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
