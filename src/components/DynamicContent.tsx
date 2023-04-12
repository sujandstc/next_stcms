import { useEffect, useState } from "react";
import EditingDialog from "./EditingDialog";
import { useRouter } from "next/router";

export interface IDynamicContent {
  data: any;
  dynamic_id: string;
  fallback_data: string;
}

const DynamicContent = ({
  data,
  dynamic_id,
  fallback_data,
}: IDynamicContent) => {
  const router = useRouter();

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsLogged(localStorage.getItem("login_key") ? true : false);
    }
  }, [router]);

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState("");

  const [dynamicData, setDynamicData] = useState(
    data &&
      data.filter((el: any) => el.dynamic_id === dynamic_id).length > 0 &&
      data.filter((el: any) => el.dynamic_id === dynamic_id)[0].data
  );

  const getData =
    data && data.filter((el: any) => el.dynamic_id === dynamic_id);

  const dataFound = getData.length > 0 ? true : false;

  return (
    <>
      {dataFound ? (
        <span dangerouslySetInnerHTML={{ __html: dynamicData }}></span>
      ) : dynamicData ? (
        dynamicData
      ) : (
        fallback_data
      )}

      {true && (
        <span
          className=""
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsDialogVisible(true);
            setDialogData(dataFound ? getData[0].data : fallback_data);
          }}
        >
          🖊️
        </span>
      )}

      <EditingDialog
        dynamic_id={dynamic_id}
        initialData={dialogData}
        onClose={() => {
          setIsDialogVisible(false);
        }}
        dynamic_data={dialogData}
        isVisble={isDialogVisible}
        onUpdatedData={(data: any) => {
          setDynamicData(data);
        }}
      />
    </>
  );
};

export default DynamicContent;
