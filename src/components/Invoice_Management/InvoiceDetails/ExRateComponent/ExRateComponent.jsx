import React, { useContext, useEffect, useState } from "react";
import InputNumber from "../../../../Utils/InputNumber";
import Button from "../../../../Utils/Button";
import { AppContext } from "../../../../Utils/contexts/app.context";
import { createExChangeRate, getExChangeRateByMonthYear } from "../Controller";
import { formatNumberSeparator } from "../../../../Utils/utils/maths";

export default function ExRateComponent({
  t,
  selectedDate,
  triggerData,
  updateParentIdExRate,
}) {
  const [dataFormExRate, setFormExRate] = useState({
    idExRate: null,
    jpy: "",
    usd: "",
  });

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
          selectedDate.getMonth() + 1,
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
        selectedDate.getMonth() + 1,
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
        console.log("khong co cai chi ca");
        return;
      }

      updateFormRate({
        idExRate: response?.data[0].id,
        jpy: formatNumberSeparator(response?.data[0].jpy.toString()),
        usd: formatNumberSeparator(response?.data[0].usd.toString()),
      });
      updateParentIdExRate(response?.data[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
