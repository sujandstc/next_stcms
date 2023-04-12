import { useRef, useState } from "react";

import axios from "axios";

import { axios_base_url } from "@/appConstants/config";

const EditingDialog = ({
  dynamic_id,
  dynamic_data,
  isVisble,
  onClose,
  onUpdatedData,
}: any) => {
  const dialogDataRef: any = useRef();

  const [isUpdating, setIsUpdating] = useState(false);

  const updateData = async ({ dynamic_id }: any) => {
    try {
      await axios.post(axios_base_url + "api/update_site_data", {
        dynamic_id,
        dynamic_data:
          dialogDataRef && dialogDataRef.current && dialogDataRef.current.value
            ? dialogDataRef.current.value
            : "",
      });
      onUpdatedData(dialogDataRef.current.value);
      setIsUpdating(false);
      onClose();
    } catch (e) {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div
        className="stc_editing_dialog"
        style={{
          height: isVisble ? "400px" : "0px",
          width: isVisble ? "400px" : "0px",
          padding: isVisble ? "1rem" : "0px",
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
          Editing id: {dynamic_id}
        </span>
        <br />
        <br />
        <textarea
          className="stc_inputs"
          cols={40}
          rows={9}
          defaultValue={dynamic_data}
          ref={dialogDataRef}
          style={{ fontSize: "14px" }}
        />
        <br />
        <button
          className="stc_inputs"
          disabled={isUpdating ? true : false}
          onClick={() => {
            setIsUpdating(true);
            updateData({
              dynamic_id: dynamic_id,
              dynamic_data: dynamic_data,
            });
          }}
        >
          {isUpdating ? "Updaing...." : "Update"}
        </button>
        <button
          className="stc_inputs"
          onClick={() => {
            onClose();
          }}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default EditingDialog;
