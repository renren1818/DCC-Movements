"use client";

import useDoor from "@/hooks/Supervisor/Hub/Door";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import Gallery from "./Gallery";
import Barcode from "react-barcode";
import Skus from "./Skus";
import Receiving from "./Receiving";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import DoorSkeleton from "@/components/Skeleton/DoorSkeleton"; // 👈 extended skeleton

export default function Door() {
  const door = useDoor();

  return (
    <Stack margin={2}>
      {door.loading ? (
        <DoorSkeleton />
      ) : (
        <>
          {door.current && (
            <>
              {/* Header block */}
              <Grid container padding={1} color={"primary.main"}>
                <Grid size={3}>
                  <Stack textAlign={"left"}>
                    <Typography>Door:</Typography>
                    <Typography>Staging Area:</Typography>
                    <Typography>Container Number:</Typography>
                    <Typography>Seal Number:</Typography>
                  </Stack>
                </Grid>
                <Grid size={3}>
                  <Stack textAlign={"right"}>
                    <Typography>{door.current?.DoorCode}</Typography>
                    <Typography>{door.current?.StagingCode}</Typography>
                    <Typography>{door.current?.ContainerNumber}</Typography>
                    <Typography>{door.current?.SealNumber}</Typography>
                  </Stack>
                </Grid>
                <Grid size={6}>
                  <Box width={"100%"} justifyItems={"flex-end"}>
                    <Stack direction={"row"} spacing={2}>
                      <Stack spacing={1}>
                        <Button
                          variant="contained"
                          disabled={door.current.IsOpen || door.images.filter((image) => image.Type === 0).length === 0}
                          onClick={door.openDoor}
                        >
                          {door.current.IsOpen ? "Opened" : "Ready To Open"}
                        </Button>
                        <Button
                          variant="contained"
                          disabled={door.uploadDisabled}
                          onClick={() => {
                            door.setOpenGallery(true);
                          }}
                        >
                          Upload Photos
                        </Button>
                      </Stack>
                      <Button disabled={door.uploadDisabled} onClick={() => door.setOpenGallery(true)}>
                        Galleries <KeyboardDoubleArrowRight />
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>

              <Divider />
            </>
          )}

          {/* Warning blocks */}
          {door.current && door.images.filter((image) => image.Type === 0).length === 0 ? (
            <Stack
              spacing={2}
              sx={{
                fontSize: 70,
                border: "10px solid #ff7c25ff",
                borderRadius: "10px",
                padding: 2,
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NotificationImportantIcon color="warning" fontSize="inherit" sx={{ animation: "heartbeatAnim 0.8s infinite" }} />
              <Typography variant="h4" color="warning">
                Before proceeding...
              </Typography>
              <Typography variant="h4" color="warning">
                Please take photos of the <b>CLOSED</b> container/truck.
              </Typography>
            </Stack>
          ) : door.current && door.current.SealNumber !== "" && door.images.filter((image) => image.Type === 1).length === 0 ? (
            <Stack
              spacing={2}
              sx={{
                fontSize: 70,
                border: "10px solid #ff7c25ff",
                borderRadius: "10px",
                padding: 2,
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NotificationImportantIcon color="warning" fontSize="inherit" sx={{ animation: "heartbeatAnim 0.8s infinite" }} />
              <Typography variant="h4" color="warning">
                Before proceeding...
              </Typography>
              <Typography variant="h4" color="warning">
                Please take photos of the <b>INSIDE</b> of the container/truck.
              </Typography>
            </Stack>
          ) : (
            door.current?.IsOpen && (
              <>
                {/* Report block */}
                <Grid container padding={1} color={"primary.main"}>
                  <Grid size={"auto"}>
                    <Stack textAlign={"left"}>
                      <Typography fontWeight={"bold"}>Inbound Shipment No.:</Typography>
                      <Typography>{door.current?.Asn}</Typography>
                      <Typography>
                        <b>PC Weight: </b>
                        {door.poDetails?.Items[0].PcWeight.toFixed(5)} KG
                      </Typography>
                      <Typography>
                        <b>Case Weight: </b>
                        {door.poDetails?.Items[0].CaseWeight.toFixed(5)} KG
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={"grow"}>
                    <Stack textAlign={"center"}>
                      <Typography fontWeight={"bold"}>KAREILA MANAGEMENT CORPORATION</Typography>
                      <Typography>Pallet Configuration Report</Typography>
                      <Typography>DC CALAMBA</Typography>
                      <Typography>
                        <Barcode value="S&R WMS" format="CODE128" height={32} displayValue={false} />
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={"auto"}>
                    <Stack textAlign={"right"}>
                      <Typography>Date: {door.currentDateTime.toLocaleDateString()}</Typography>
                      <Typography>Time: {door.currentDateTime.toLocaleTimeString()}</Typography>
                      <Typography>Load Type: CL</Typography>
                    </Stack>
                  </Grid>
                </Grid>

                {door.currentSku ? (
                  <Receiving po={door.poDetails} sku={door.currentSku} />
                ) : (
                  door.images.filter((image) => image.Type === 1).length > 0 && (
                    <Skus
                      skus={door.asn}
                      onClickSku={(sku) => door.setCurrentSku(sku)}
                      onAssign={(sku) => door.assignForklift(sku)}
                      onComplete={door.completeReceiving}
                    />
                  )
                )}
              </>
            )
          )}
        </>
      )}

      <Gallery open={door.openGallery} close={() => door.setOpenGallery(false)} images={door.images} refreshImages={door.refreshImages} />
    </Stack>
  );
}
