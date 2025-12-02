import { useDialogBoxContext } from "@/contexts/DialogBox";
import { useHubContext } from "@/contexts/Hub";
import { useSession } from "@/contexts/Session";
import { useSignalRContext } from "@/contexts/SignalR";
import { useFetcher } from "@/hooks/Fetcher";
import { IPoDetails, IPoItem } from "@/interfaces/Hub/Door";
import { IGalleryImage } from "@/interfaces/Hub/Gallery";
import { ISku } from "@/interfaces/Hub/Sku";
import React from "react";

export default function useDoor() {
  const session = useSession();
  const fetcher = useFetcher();

  const { currentDoor, refresh } = useHubContext();

  const { openDialog } = useDialogBoxContext();

  const [asn, setAsn] = React.useState<ISku[]>();
  const [poDetails, setPoDetails] = React.useState<IPoDetails>();
  const [images, setImages] = React.useState<IGalleryImage[]>([]);
  const [openGallery, setOpenGallery] = React.useState(false);

  const [currentDateTime, setCurrentDateTime] = React.useState<Date>(new Date());
  const [currentSku, setCurrentSku] = React.useState<ISku>();
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    if (currentDoor) {
      setLoading(true);
      setCurrentSku(undefined);
      Promise.all([
        fetcher.POST(`Asn/GetAsnDetailsByContainerNumber?containerNumber=${currentDoor?.ContainerNumber}`, {}),
        fetcher.GET(`PurchaseOrder/SupervisorPoDetails?asn=${currentDoor?.Asn}`),
        fetcher.GET(`InboundImage/GetInboundImage?asnNumber=${currentDoor?.Asn}`),
      ])
        .then(([asnRes, poRes, imgRes]) => {
          setAsn(asnRes.data.data);
          setPoDetails(poRes.data.data);
          setImages(imgRes.data.itemList.data);
        })
        .finally(() => setLoading(false)); // end loading
    }
  }, [currentDoor]);

  const openDoor = async () => {
    await fetcher.PUT("DoorTeam/UpdateIsOpen", {
      doorTeamsId: currentDoor?.DoorTeamId,
      isOpen: true,
    });

    refresh();
  };

  const uploadDisabled = currentDoor?.SealNumber === "" && currentDoor?.IsOpen;

  const refreshImages = async () => {
    if (currentDoor)
      fetcher.GET(`InboundImage/GetInboundImage?asnNumber=${currentDoor?.Asn}`).then((result) => setImages(result.data.itemList.data));
  };

  const assignForklift = async (sku: ISku) => {
    const result = await fetcher.POST(`DoorTeamDetail/AssignForkLift`, {
      DoorTeamId: currentDoor?.DoorTeamId,
      asnId: poDetails?.AsnId,
      purchaseOrderNumber: sku?.PurchaseOrderNumber,
      sku: sku?.Sku,
    });

    openDialog(304, () => {
      refresh();
    });
  };

  const completeReceiving = async () => {
    const result = await fetcher.POST(`doorteam/UpdateDoorTeamReceiving`, {
      AsnNumber: currentDoor?.Asn,
      BuildingId: session.user?.LocationId,
      DoorCode: currentDoor?.DoorCode,
      TeamId: currentDoor?.DoorTeamId,
    });

    openDialog(305, () => {
      window.location.href = "/supervisor/hub";
    });
  };

  return {
    current: currentDoor,
    currentSku,
    setCurrentSku,
    currentDateTime,
    openDoor,
    uploadDisabled,
    asn,
    poDetails,
    images,
    refreshImages,
    openGallery,
    setOpenGallery,
    assignForklift,
    completeReceiving,
    loading,
  };
}
