/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPaymentSchema } from "../../../../Utils/validation/rulesYup";
import Modal from "../../../../Utils/Modal";
import Button from "../../../../Utils/Button";

export default function EditPaymentForm({ visible, cancel, invoicePayment }) {
  const {
    register,
    handleSubmit,
    setValue,
    // eslint-disable-next-line no-unused-vars
    setError,
    // eslint-disable-next-line no-unused-vars
    watch,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createPaymentSchema) });

  console.log(getValues("payment_date"));

  const convertedDate = new Date(invoicePayment?.payment_date);
  const formattedDate = convertedDate.toISOString().split("T")[0];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const existingData = {
    payment_date: formattedDate,
    name: invoicePayment?.name,
    curency_type: invoicePayment?.curency_type,
    note: invoicePayment?.note,
    invoice: invoicePayment?.invoice,
    pay: invoicePayment?.pay,
    category_: invoicePayment?.category,
    cost: invoicePayment?.cost,
  };

  useEffect(() => {
    Object.keys(existingData).forEach((key) => {
      setValue(key, existingData[key]);
    });
  }, [setValue, existingData]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Modal visible={visible} classNameContainer={"mt-[40px]"}>
      <div className="flex flex-col bg-white m-2 pt-5 pb-3 px-12 rounded-2xl">
        <span className=" uppercase py-1 mx-auto px-12 text-center bg-white-500/80 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
          Edit payment
        </span>

        <form
          className="px-4 mt-10 overflow-hidden block"
          noValidate
          onSubmit={onSubmit}
        >
          <InputCustomComponent
            label={"Date (dd/mm/yyyy)"}
            placeholder={new Date()}
            name={"payment_date"}
            type="date"
            register={register}
            errorMessage={errors?.payment_date?.message}
          />

          <InputCustomComponent
            label={"Name"}
            name={"name"}
            register={register}
            errorMessage={errors?.name?.message}
          />

          <InputCustomComponent
            label={"VND"}
            name={"cost"}
            placeholder={0}
            // type="number"
            register={register}
            errorMessage={errors?.cost?.message}
          />

          <InputCustomComponent
            as={"textarea"}
            label={"Note"}
            name={"note"}
            register={register}
            classNameInput=" w-full bg-main-theme overflow-y-scroll resize-none"
            errorMessage={errors?.note?.message}
          />

          <InputCustomComponent
            label={"Journal"}
            name={"category"}
            register={register}
            errorMessage={errors?.category?.message}
          />

          <InputCustomComponent
            label={"Invoice"}
            name={"invoice"}
            register={register}
            errorMessage={errors?.invoice?.message}
          />

          <InputCustomComponent
            label={"Pay"}
            type="text"
            name={"pay"}
            register={register}
            errorMessage={errors?.pay?.message}
          />

          <div className="flex items-center justify-around  mt-4 mb-3 ">
            <Button
              type="submit"
              className={" py-2 border-2 border-gray min-w-[150px]"}
            >
              save
            </Button>
            <Button
              onClick={cancel}
              className={
                " border-red-500 bg-white border-2 py-2 min-w-[150px] "
              }
            >
              <span className=" text-red-500  uppercase ">Cancel</span>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

const InputCustomComponent = ({
  label,
  name,
  register,
  errorMessage,
  as: Element = "input",
  type = "text",
  classNameInput = "w-full py-1 rounded-sm px-2 bg-main-theme",
  classNameError,
  defaultValue = "",
}) => {
  return (
    <div className={` grid lg:grid-cols-12 gap-y-2 mb-2`}>
      <label className="lg:col-span-3">{label}</label>
      <div className=" lg:col-span-9 ml-3">
        <Element
          {...register(name)}
          className={classNameInput}
          type={type}
          defaultValue={defaultValue}
          rows={3}
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