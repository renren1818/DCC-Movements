'use client';

import { DialogBox } from '@/components/DialogBox/DialogBox';
import { IDialog, IDialogBoxParams } from '@/interfaces/DialogBoxContext';
import React from 'react';

import dialogs from '@/assets/jsons/dialogs.json';

interface DialogBoxContextProps { children: React.ReactNode };

interface IDialogBoxContext {

    openDialog: (message: IDialog | number, onClose?: () => void) => void;
    getDialog: (id: number) => IDialog | undefined;

}

const DialogBoxContext = React.createContext<IDialogBoxContext>({} as IDialogBoxContext);

export const useDialogBoxContext = () => {

    return React.useContext(DialogBoxContext);

}

export default function DialogBoxContextProvider({ children }: DialogBoxContextProps) {
    
    const [properties, setProperties] = React.useState<IDialogBoxParams>({
        open: false,
        type: 'success',
        title: '',
        message: '',
        action: 'Back To Panel'
    });


    const getDialog = (id: number) => dialogs.find((dialog) => dialog.id === id);

    const openDialog = (params: IDialog | number, onClose?: () => void) => setProperties((prev) => {

        const dialog = (typeof params === 'number') ? getDialog(params) : params;

        return {
            ...prev,
            open: true,
            title: dialog?.title ?? prev.title,
            message: dialog?.message ?? prev.message,
            action: dialog?.action ?? prev.action,
            type: dialog?.type ?? prev.type,
            onClose: () => { 
                if (onClose) onClose();
                setProperties((prev) => ({ ...prev, open : false }));
            }
        };

    });

    return (
        <DialogBoxContext.Provider
            value={{
                openDialog,
                getDialog
            }}
        >
            {children}
            <DialogBox {...properties} />
        </DialogBoxContext.Provider>
    );

}
