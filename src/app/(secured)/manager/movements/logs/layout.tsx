import BlocksContextProvider from "@/contexts/Blocks";
import DialogBoxContextProvider from "@/contexts/DialogBox";

export default function BlocksLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    return (

        <BlocksContextProvider>
            <DialogBoxContextProvider>
                {children}
            </DialogBoxContextProvider>
        </BlocksContextProvider>

    );

}
