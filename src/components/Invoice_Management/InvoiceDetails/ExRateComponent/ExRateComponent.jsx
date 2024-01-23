// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import InputNumber from "../../../../Utils/InputNumber";
import Button from "../../../../Utils/Button";
import { AppContext } from "../../../../Utils/contexts/app.context";
import { createExChangeRate, getExChangeRateByMonthYear } from "../Controller";
import {
   // eslint-disable-next-line no-unused-vars
  formatFloatToCustomString,
  formatInputToFloatStringSeparator,
   // eslint-disable-next-line no-unused-vars
  formatNumberSeparator,
} from "../../../../Utils/utils/maths";

export default function ExRateComponent({
  
  // eslint-disable-next-line react/prop-types
  t,
  // eslint-disable-next-line react/prop-types
  selectedDate,
  // eslint-disable-next-line react/prop-types
  triggerData,
  // eslint-disable-next-line react/prop-types
  updateParentIdExRate,
}) {
  const [dataFormExRate, setFormExRate] = useState({
    idExRate: null,
    jpy: "",
    usd: "",
  });

  // eslint-disable-next-line no-unused-vars
  const [isShowWarringModal, setShowWarringModal] = useState(false);
  const { idExRate, jpy, usd } = dataFormExRate;

  const updateFormRate = (dataTable) =>
    setFormExRate(() => ({ ...dataFormExRate, ...dataTable }));
  const { showToast } = useContext(AppContext);

  const fetchSaveRate = async () => {
    if (
      !jpy?.trim() ||
      jpy.trim() === "0" ||
      !usd?.trim() ||
      usd.trim() === "0"
    ) {
      showToast.error("usd and jpy must be > 0");
    } else {
      try {
        const response = await createExChangeRate(
          // eslint-disable-next-line react/prop-types
          selectedDate.getMonth() + 1,
          // eslint-disable-next-line react/prop-types
          selectedDate.getFullYear(),
          jpy,
          usd,
          idExRate
        );
        console.log(response);
        updateParentIdExRate(response?.id || null);

        showToast.success(response?.message);
        triggerData();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const fetchExchangeRate = async () => {
    try {
      const [status, response] = await getExChangeRateByMonthYear(
        // eslint-disable-next-line react/prop-types
        selectedDate.getMonth() + 1,
        // eslint-disable-next-line react/prop-types
        selectedDate.getFullYear()
      );
      console.log(response);
      // Khong co gia tri duoc lay ta
      if (status == 200 && response.success == false) {
        updateFormRate({
          idExRate: null,
          jpy: "",
          usd: "",
        });

        updateParentIdExRate(null);
        return;
      }

      updateFormRate({
        idExRate: response?.data[0].id,
        jpy: formatInputToFloatStringSeparator(
          response?.data[0].jpy.toString()
        ),
        usd: formatInputToFloatStringSeparator(
          response?.data[0].usd.toString()
        ),
      });
      updateParentIdExRate(response?.data[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(jpy)
    fetchExchangeRate();
  }, [selectedDate]);

  return (
    <div className="flex flex-row bg-main-theme items-center py-[1px] rounded-md ">
      <div
        className="items-center px-5 flex flex-row "
        // onSubmit={fetchSaveRate}
      >
        <div className="font-medium ">
          JPY
          <InputNumber
            id={"inputExRateJPY"}
            number={jpy}
            setNumber={(value) => updateFormRate({ jpy: value })}
          />
          <InputNumber
            number={usd}
            setNumber={(value) => updateFormRate({ usd: value })}
          />
        </div>

        <Button
          className="col-span-12 lg:col-span-1 flex-shrink-0 px-1 my-1"
          onClick={() => fetchSaveRate()}
        >
          {t("button.save")}
        </Button>
      </div>
    </div>
  );
}