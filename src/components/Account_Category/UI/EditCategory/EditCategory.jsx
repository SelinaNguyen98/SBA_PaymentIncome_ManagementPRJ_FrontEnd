/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Button from "../../../../Utils/Button";
import Modal from "../../../../Utils/Modal";
import { useTranslation } from "react-i18next";

export default function EditCategory({ visible, cancel, ok }) {
  const { t } = useTranslation();
  return (
    <Modal visible={visible}>
      <div className="flex flex-col bg-white m-2 py-5 px-12  rounded-2xl">
        <span className=" uppercase  py-1 mx-auto my-3 px-12 text-center bg-white-500/80    font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
          {t('notification_account_category.titleEditCategory')}
        </span>

        <form className="px-4 mt-5">
          <InputCustomComponent label={t('notification_account_category.name')}>
            <input type="text" className=" bg-main-theme w-full"></input>
          </InputCustomComponent>
          <InputCustomComponent label={t("titlePage.accountCategoryGroup")}>
            <input type="text" className=" bg-main-theme w-full"></input>
          </InputCustomComponent>
        </form>

        <div className="flex items-center justify-around  mt-6 mb-7  ">
          <Button
            onClick={() => {
              // setShowConfirmModal(false);
            }}
            className={" py-2 border-2 border-gray min-w-[150px]"}
          >
            {t('button.save')}
          </Button>
          <Button
            onClick={cancel}
            className={" border-red-500 bg-white border-2 py-2 min-w-[150px] "}
          >
            <span className=" text-red-500  uppercase ">{t('button.cancel')}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

const InputCustomComponent = ({ label, children }) => {
  return (
    <div className=" grid lg:grid-cols-12  gap-y-2 mb-4">
      <label className="lg:col-span-3">{label}</label>
      <div className=" lg:col-span-9 ml-3">
        {React.createElement(
          children.type,
          {
            ...children.props,
            className: `${children.props.className} w-full py-1 rounded-sm px-2 `,
          },
          children.props.children
        )}
        {/* {children} */}
      </div>
    </div>
  );
};
