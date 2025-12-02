import React from "react";

export interface IDialog { 
    id: number;
    type: string;
    title: string;
    message: string | React.JSX.Element;
    action: string;
 }

export interface IDialogBoxParams {
    title: string;
    message: string | React.JSX.Element;
    type?: string;
    action?: string;
    open?: boolean;
    onClose?: () => void;
}