/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import Modal from "../../../../Utils/Modal";
import Button from "../../../../Utils/Button";
import { useTranslation } from "react-i18next";
import { formatNumberSeparator } from "../../../../Utils/utils/maths";
import { getGetAllCategoriesPL, updatePayment } from "../Controller";

export default function EditPaymentForm({
  visible,
  cancel,
  invoicePayment,
  selectedDate,
  exchangeRateId,
  triggerData,
}) {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm();

  // const convertedDate = new Date(invoicePayment?.payment_date);
  const formattedDate = invoicePayment?.payment_date.split(" ")[0];

  // State Format Day
  const maxDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    1
  )
    .toISOString()
    .split("T")[0]; //max day
  const minDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    2
  )
    .toISOString()
    .split("T")[0];

  // console.log("invoicePayment", invoicePayment);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const existingData = {
    id: invoicePayment.id,
    payment_date: formattedDate,
    name: invoicePayment?.name,
    currency_type: invoicePayment?.currency_type,
    note: invoicePayment?.note,
    invoice: invoicePayment?.invoice,
    pay: invoicePayment?.pay,
    category_id: invoicePayment?.category?.id,
    cost: formatNumberSeparator(invoicePayment?.cost.toString()),
  };

  useEffect(() => {
    fetchGetCategoriesPL();
    setValue("user_id", localStorage.getItem("user_id") || 1);
    setValue("exchange_rate_id", exchangeRateId);
    setValue("currency_type", "vnd");

    Object.keys(existingData).forEach((key) => {
      setValue(key, existingData[key]);
    });
  }, [selectedDate]);

  const fetchGetCategoriesPL = async () => {
    try {
      const response = await getGetAllCategoriesPL();
      setCategories(response);
      // console.log(ca);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await updatePayment(data);
      triggerData();
      cancel()
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Modal visible={visible}>
      <div className="flex flex-col bg-white m-2 pt-5 pb-3 px-12 rounded-2xl">
        <span className=" uppercase py-1 mx-auto px-12 text-center bg-white-500/80 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
          {t("page_payment_detail.edit_payment")}
        </span>

        <form
          className="px-4 mt-10 overflow-hidden block"
          noValidate
          onSubmit={onSubmit}
        >
          <div className={` grid lg:grid-cols-12 gap-y-2 mb-2 gap-12`}>
            <label className="lg:col-span-3">
              {t("page_payment_detail.date")}
            </label>
            <div className=" lg:col-span-9 ml-3">
              <input
                type="date"
                {...register("payment_date")}
                className="w-full py-1 rounded-sm px-2 bg-main-theme"
                min={minDate}
                max={maxDate}
              />
              <div
                className={`text-red-500 min-h-[1.25rem] text-sm overflow-x-hidden`}
              >
                {errors?.payment_date?.message}
              </div>
            </div>
          </div>

          <InputCustomComponent
            label={t("page_payment_detail.name")}
            name={"name"}
            register={register}
            errorMessage={errors?.name?.message}
          />

          <div className={` grid lg:grid-cols-12 gap-y-2 mb-2 gap-12`}>
            <label className="lg:col-span-3">VND</label>
            <div className=" lg:col-span-9 ml-3">
              <input
                defaultValue={0}
                {...register("cost")}
                onChange={(e) => {
                  e.target.value = formatNumberSeparator(e.target.value);
                }}
                className="w-full py-1 rounded-sm px-2 bg-main-theme"
              />
              <div
                className={`text-red-500 min-h-[1.25rem] text-sm overflow-x-hidden`}
              >
                {errors?.cost?.message}
              </div>
            </div>
          </div>

          <InputCustomComponent
            as={"textarea"}
            label={t("page_payment_detail.note")}
            name={"note"}
            register={register}
            classNameInput=" w-full bg-main-theme overflow-y-scroll resize-none"
            errorMessage={errors?.note?.message}
          />

          <div className={` grid lg:grid-cols-12 gap-y-2 mb-2 gap-12`}>
            <label className="lg:col-span-3">
              {t("page_payment_detail.journal")}
            </label>
            <div className=" lg:col-span-9 ml-3">
              <select
                {...register("category_id")}
                className="w-full py-1 rounded-sm px-2 bg-main-theme"
                // value={existingData.category_id}
              >
                <option value="" disabled></option>
                {categories.map((cateData, index) => {
                  {
                    /* console.log(existingData.category_id, cateData?.id); */
                  }
                  return (
                    <option
                      value={cateData?.id}
                      key={index}
                      selected={
                        existingData.category_id === cateData?.id ? true : false
                      }
                    >
                      {cateData?.name}
                    </option>
                  );
                })}
              </select>
              <div
                className={`text-red-500 min-h-[1.25rem] text-sm overflow-x-hidden`}
              >
                {errors?.category_id?.message}
              </div>
            </div>
          </div>
          <InputCustomComponent
            label={t("page_payment_detail.invoice")}
            name={"invoice"}
            register={register}
            errorMessage={errors?.invoice?.message}
          />

          <InputCustomComponent
            label={t("page_payment_detail.pay")}
            type="text"
            name={"pay"}
            register={register}
            errorMessage={errors?.pay?.message}
          />

          <div className="flex items-center justify-around mt-4 mb-3 ">
            <Button
              type="submit"
              className={" py-2 border-2 border-gray min-w-[150px]"}
            >
              {t("button.save")}
            </Button>
            <Button
              onClick={cancel}
              className={
                " border-red-500 bg-white border-2 py-2 min-w-[150px] "
              }
            >
              <span className=" text-red-500  uppercase ">
                {t("button.cancel")}
              </span>
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
    <div className={` grid lg:grid-cols-12 gap-y-2 mb-2 gap-12`}>
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
