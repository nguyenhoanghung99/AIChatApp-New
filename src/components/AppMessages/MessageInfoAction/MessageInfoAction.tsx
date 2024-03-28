import React, {memo} from 'react';
import {AppText, AppView} from '@/components';
import {_format} from '@/utilities';

type TProps = {
  time: string;
};
function MessageInfoAction({time}: TProps) {
  return (
    <AppView flexDirection="row" justifyContent="center" marginVertical="xxs">
      <AppText variant="small" color='black'>{_format.dayMMDDYYYYHHMM(time)}</AppText>
    </AppView>
  );
}
export default memo(MessageInfoAction);
