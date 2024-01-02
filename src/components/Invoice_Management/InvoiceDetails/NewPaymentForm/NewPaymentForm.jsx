import React, { useEffect } from "react";
import Button from "../../../Button";
import Modal from "../../../Modal";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPaymentSchema } from "../../../../Utils/validation/rulesYup";

export default function NewPaymentForm({ visible, cancel, ok }) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createPaymentSchema) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Modal visible={visible}>
      <div className="flex flex-col bg-white m-2 py-5 px-12  rounded-2xl">
        <span className=" uppercase  py-1 mx-auto my-3 px-12 text-center bg-white-500/80    font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
          new payment
        </span>

        <form className="px-4 mt-5 overflow-hidden block" onSubmit={onSubmit}>
          <InputCustomComponent
            label={"Date (dd/mm/yyyy)"}
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
            type="number"
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
            name={"category_id"}
            register={register}
            errorMessage={errors?.category_id?.message}
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
  className,
  errorMessage,
  as: Element = "input",
  type = "text",
  classNameInput = "w-full py-1 rounded-sm px-2 bg-main-theme",
  classNameError = " text-red-600 min-h-[1rem] text-sm overflow-x-hidden ",
}) => {
  return (
    <>
      <div className={` grid lg:grid-cols-12 gap-y-2 mb-3 block`}>
        <label className="lg:col-span-3">{label}</label>
        <div className=" lg:col-span-9 ml-3">
          <Element
            {...register(name)}
            className={classNameInput}
            type={type}
            rows={3}
          />
          <div className={classNameError}>{errorMessage}</div>
        </div>
      </div>
    </>
  );
};
