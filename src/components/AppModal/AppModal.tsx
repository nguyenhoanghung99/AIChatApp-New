import React from 'react';
import { Modal as NativeModal, ModalProps as NativeModalProps } from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from '@/themes';
const Modal = createBox<Theme, NativeModalProps>(NativeModal);

export type TModalProps = React.ComponentProps<typeof Modal> & {
    children?: React.ReactNode;
};

const AppModal = ({ children, ...props }: TModalProps) => {
    return <Modal {...props}>{children}</Modal>;
};
export default AppModal;
