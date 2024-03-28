import { useCallback, useMemo, useState } from 'react';
import { MediaDTO } from '.';
import { uploadFileEventEmitter } from '@/components/AppMessages/ModalMediaSelect/widget/ModalAddCaption';



export const useAccessFile = () => {
    const [isShowCaption, setShowCaption] = useState(false);
    const [fileSelected, setFileSelected] = useState<MediaDTO[]>([]);
    const handleAccessFile = (item: MediaDTO) => {
        const newArr = [...fileSelected];
        const exist = fileSelected.findIndex(x => x.filename === item.filename);
        if (exist !== -1) {
            newArr.splice(exist, 1)
        } else {
            newArr.push(item);
        }
        setFileSelected(newArr);
        uploadFileEventEmitter.emit('uploadFile', newArr);
    }
    return {
        isShowCaption,
        fileSelected,
        setShowCaption,
        handleAccessFile,
    };
};



