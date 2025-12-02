import { IGetInboundReport } from "../Doors";

interface IInvalidFootprintHeaderProps {
    ContainerNumber: string;
    DoorCode: string;
}

interface IInvalidFootprintProps extends IInvalidFootprintHeaderProps {
    reports: IGetInboundReport[];
    onSubmit: () => void;
    onDismiss: () => void;
}

export type { IInvalidFootprintProps, IInvalidFootprintHeaderProps };
