import React from 'react';
import {AppText, AppView} from '..';
import {useTranslation} from 'react-i18next';
import {width} from '@/themes';

type TProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const AppNoData = ({icon, title, desc}: TProps) => {
  const {t} = useTranslation();
  return (
    <AppView flexDirection="column" justifyContent="center" alignItems="center">
      {icon}
      <AppText
        marginTop="base"
        marginBottom="tiny"
        color="color8c"
        variant="headingS2">
        {t(`${title}`)}
      </AppText>
      <AppView width={width * 0.75}>
        <AppText
          lineHeight={18}
          textAlign="center"
          color="color8c"
          variant="rMedium"
          numberOfLines={2}>
          {t(`${desc}`)}
        </AppText>
      </AppView>
    </AppView>
  );
};

export default AppNoData;
