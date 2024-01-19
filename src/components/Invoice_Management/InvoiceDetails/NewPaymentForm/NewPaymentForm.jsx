// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPaymentSchema } from "../../../../Utils/validation/rulesYup";
import Button from "../../../../Utils/Button";
import Modal from "../../../../Utils/Modal";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function NewPaymentForm({ visible, cancel, ok, selectedDate }) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    watch,
    // eslint-disable-next-line no-unused-vars
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createPaymentSchema) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  // const [minDate, setMinDate] = useState("");
  // const [maxDate, setMaxDate] = useState("");

  // const minDate = "2024-01-01";
  // const maxDate = "2024-01-31";

  const today = new Date();

  console.log(selectedDate);

  let maxDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    1
  )
    .toISOString()
    .split("T")[0]; //max day
  let minDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 2)
    .toISOString()
    .split("T")[0];

  console.log(minDate, maxDate);

  useEffect(() => {
    // Set the min and max attributes for the date input
    const dateInput = document.getElementById("payment_date");
    dateInput.setAttribute("min", minDate);
    dateInput.setAttribute("max", maxDate);
  }, [minDate, maxDate]);

  return (
    <Modal visible={visible}>
      <div className="flex flex-col bg-white m-2 pt-5 pb-3 px-12 rounded-2xl">
        <span className=" uppercase py-1 mx-auto px-12 text-center bg-white-500/80 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
          {t("page_payment_detail.add_payment")}
        </span>

        <form
          className="px-4 pt-1 mt-10 overflow-hidden block"
          noValidate
          onSubmit={onSubmit}
        >
          <InputCustomComponent
            label={t("page_payment_detail.date")}
            placeholder={new Date()}
            id={"payment_date"}
            name={"payment_date"}
            type="date"
            register={register}
            errorMessage={errors?.payment_date?.message}
          />

          <InputCustomComponent
            label={t("page_payment_detail.name")}
            name={"name"}
            register={register}
            errorMessage={errors?.name?.message}
          />

          <InputCustomComponent
            label={"VND"}
            name={"cost"}
            placeholder={0}
            type="number"
            register={register}
            errorMessage={errors?.cost?.message}
          />

          <InputCustomComponent
            as={"textarea"}
            label={t("page_payment_detail.note")}
            name={"note"}
            register={register}
            classNameInput=" w-full bg-main-theme overflow-y-scroll resize-none"
            errorMessage={errors?.note?.message}
          />

          <InputCustomComponent
            label={t("page_payment_detail.journal")}
            name={"category_id"}
            register={register}
            errorMessage={errors?.category_id?.message}
          />

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

          <div className="flex items-center justify-around  mt-4 mb-3 ">
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
