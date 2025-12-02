import { Box, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  BlackBadge,
  ChildConnector,
  ChildQueButton,
  EndIcon,
  ParentConnector,
  ParentQueButton,
  MyQueTitle,
  ParentRedBadge,
  ChildRedBadge,
} from "../Que/StylesQue";
import { useState } from "react";
import { useBlocksContext } from "@/contexts/Blocks";
import React from "react";

export default function MyQue(props: { data: IMyQueue[], onSelectQueue: (queue: IQueueDetail | null) => void; }) {
  const { refreshTime } = useBlocksContext();

  const [activeParents, setActiveParents] = useState<number[]>([]);
  const [activeChild, setActiveChild] = useState<{ parentId: number; childIndex: number } | null>(null);

  React.useEffect(() => {
    setActiveChild(null);
  }, [refreshTime])

  const toggleParent = (id: number) => {
    setActiveParents((prev) => {
      const isActive = prev.includes(id);

      if (isActive) {
        if (activeChild?.parentId === id) {
          setActiveChild(null);
          props.onSelectQueue(null);
        }
        return prev.filter((p) => p !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleChild = (parentId: number, childIndex: number) => {
    const parent = props.data.find((parent) => parent.MovementHeaderID === parentId);
    const child = parent?.Details.find((child) => +child.SKU === childIndex);

    let activeChild;

    setActiveChild((prev) => {

      activeChild = prev && prev.parentId === parentId && prev.childIndex === childIndex
        ? null
        : { parentId, childIndex }

      return activeChild;
    });

    if (child) props.onSelectQueue(activeChild ? { ...child, MovementHeaderID: parentId, ColorCode: parent?.ColorCode } : null);

  };

  return (
    <Stack alignItems="left" spacing={0}>
      <MyQueTitle variant="h6">My Queue</MyQueTitle>

      <Box sx={{ minHeight: 'calc(100vh - 165px)', maxHeight: 'calc(100vh - 165px)', overflowX: 'hidden', overflowY: 'auto', scrollbarWidth: 'thin' }}>

        {
          (!props.data || props.data.length === 0) && <Typography color="lightgrey" sx={{ pt: 1, fontWeight: 'bold' }} >No Queue Available</Typography>
        }

        {props.data && props.data?.map((item) => {
          const isActive = activeParents.includes(item.MovementHeaderID);

          return (
            <Stack key={item.MovementHeaderID} alignItems="start" sx={{ px: 1, pt: 1 }}>
              <Stack position="relative" display="inline-flex">
                <ParentQueButton
                  active={isActive}
                  onClick={() => toggleParent(item.MovementHeaderID)}
                  endIcon={
                    <EndIcon active={isActive}>
                      <ArrowDropDownIcon />
                    </EndIcon>
                  }
                >
                  {item.ASN.toUpperCase()}
                </ParentQueButton>
                {item.Details.map((d) => d.Qty).reduce((a, b) => a + b, 0) > 0 && <ParentRedBadge />}
              </Stack>

              {isActive && (
                <>
                  {item.Details.map((detail, index) => {
                    const childIsActive = activeChild?.parentId === item.MovementHeaderID && activeChild?.childIndex === +detail.SKU;

                    return (
                      <Stack key={index} direction="row" alignItems="flex-start">
                        {index === 0 ? <ParentConnector /> : <ChildConnector />}

                        <Stack position="relative" display="inline-flex">
                          <ChildQueButton
                            active={childIsActive}
                            onClick={() => toggleChild(item.MovementHeaderID, +detail.SKU)}
                          >
                            {detail.SKU}
                          </ChildQueButton>
                          {detail.Qty > 0 && <ChildRedBadge />}
                        </Stack>

                      </Stack>
                    );
                  })}
                </>
              )}
            </Stack>
          );
        })}

        <Box height={10}></Box>

      </Box>
    </Stack>
  );
}
