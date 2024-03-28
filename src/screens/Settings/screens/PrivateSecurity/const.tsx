/* eslint-disable react/react-in-jsx-scope */
import BlockIcon from '@/assets/svg/BlockIcon';
import {EMenuTitle} from './type';
import PersonalInfoIcon from '@/assets/svg/PersonalInfoIcon';
import BioIcon from '@/assets/svg/BioIcon';
import ShowOnlineStatusIcon from '@/assets/svg/ShowOnlineStatusIcon';

export const MenuPrivacySecutity = [
  {
    id: 1,
    title: EMenuTitle.Block,
    icon: <BlockIcon />,
    // routeName: Routes.ChangeEmail,
  },
  {
    id: 2,
    title: EMenuTitle.PersonalInformation,
    // routeName: Routes.ChangePassword,
    icon: <PersonalInfoIcon />,
    subTitle: 'Friend',
  },
  {
    id: 3,
    title: EMenuTitle.Bio,
    // routeName: Routes.LinkAccount,
    icon: <BioIcon />,
    subTitle: 'Public',
  },
  {
    id: 4,
    title: EMenuTitle.ShowOnlineStatus,
    // routeName: Routes.DeleteAccount,
    icon: <ShowOnlineStatusIcon />,
    isOnline: true,
  },
];
