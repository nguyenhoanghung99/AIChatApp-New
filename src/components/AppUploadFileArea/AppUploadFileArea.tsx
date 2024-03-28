import React from 'react';
import {AppText, AppView} from '..';
import AppButton from '../AppButton/AppButton';
import UploadIcon from '@/assets/svg/UploadIcon';

const AppUploadFileArea = ({
  title,
  fileDescrition,
  onPressUpload,
}: {
  title?: string;
  fileDescrition?: string;
  onPressUpload?: (e: any) => void;
}) => {
  return (
    <AppView gap="tiny">
      <AppText>{title}</AppText>
      <AppButton
        onPress={onPressUpload}
        borderColor="neutralGrey6"
        borderWidth={1}
        borderStyle="dashed"
        alignItems="center"
        justifyContent="center"
        borderRadius="sm"
        height={80}
        width={'100%'}
        backgroundColor="white">
        <UploadIcon />
        <AppText color="neutralGrey9">{fileDescrition}</AppText>
      </AppButton>
    </AppView>
  );
};

export default AppUploadFileArea;
