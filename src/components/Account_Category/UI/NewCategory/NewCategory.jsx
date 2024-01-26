/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Button from "../../../../Utils/Button";
import Modal from "../../../../Utils/Modal";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCategorySchema } from "../../../../Utils/validation/rulesYup";
import { createCategory, getGroupCategory } from "../../Controller";
// import { group } from "console";
// import { createCategorySchema } from "../../../../Utils/validation/rulesYup"

export default function NewCategory({ visible, cancel, ok }) {
  const [groups, setGroups] = useState([]);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    // eslint-disable-next-line no-unused-vars
    setError,
    formState: { errors },
  } = useForm({resolver: yupResolver(createCategorySchema)});
  const onSubmit = handleSubmit(async (data) => {
    // console.log("Dsdds",data);
    // setValue();
    try {
      const response = await  createCategory(data);
      console.log(response);
      // changeFirstPage();
      cancel()
    } catch (error) {
      console.log(error);
    }
  });
  

  useEffect(() => {
    fetchGetCategoriesPL();
  }, []);

  const fetchGetCategoriesPL = async () => {
    try {
      const response = await getGroupCategory();
      setGroups(response.groups);
      console.log(response.groups);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Modal visible={visible}>
      <div className="flex flex-col bg-white m-2 py-5 px-12  rounded-2xl">
        <span className=" uppercase  py-1 mx-auto my-3 px-12 text-center bg-white-500/80    font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
          {t("notification_account_category.titleAddNew")}
        </span>

        <form className="px-4 mt-5" onSubmit={onSubmit}>
          <div className={` grid lg:grid-cols-12 gap-y-2 mb-2 gap-12`}>
            <label className="lg:col-span-3">{t("notification_account_category.name")}</label>
            <div className=" lg:col-span-9 ml-3">
              <input
                type="text"
                {...register("name")}
                className="w-full py-1 rounded-sm px-2 bg-main-theme"
              />
              <div
                className={`text-red-500 min-h-[1.25rem] text-sm overflow-x-hidden`}
              >
                {errors?.name?.message}
              </div>
            </div>
          </div>

          <div className={` grid lg:grid-cols-12 gap-y-2 mb-2 gap-12`}>
            <label className="lg:col-span-3">{t("titlePage.accountCategoryGroup")}</label>
            <div className=" lg:col-span-9 ml-3">
            <select
                {...register("group_id")}
                className="w-full py-1 rounded-sm px-2 bg-main-theme"
                defaultValue="" // Set the default value here
              >
                <option value="" disabled></option>
                {groups.map((group, index) => {
                  return (
                    <option value={group?.id} key={index} >
                      {group?.name}
                    </option>
                  );
                })}
              </select>
              <div
                className={`text-red-500 min-h-[1.25rem] text-sm overflow-x-hidden`}
              >
                {errors?.group_id?.message}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-around  mt-6 mb-7  ">
          <Button
            type="submit"
            className={" py-2 border-2 border-gray min-w-[150px]"}
          >
            {t("button.save")}
          </Button>
          <Button
            onClick={cancel}
            className={" border-red-500 bg-white border-2 py-2 min-w-[150px] "}
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

// const InputCustomComponent = ({ label, children }) => {
//   return (
//     <div className=" grid lg:grid-cols-12  gap-y-2 mb-4">
//       <label className="lg:col-span-3">{label}</label>
//       <div className=" lg:col-span-9 ml-3">
//         {React.createElement(
//           children.type,
//           {
//             ...children.props,
//             className: `${children.props.className} w-full py-1 rounded-sm px-2 `,
//           },
//           children.props.children
//         )}
//       </div>
//     </div>
//   );
// };
