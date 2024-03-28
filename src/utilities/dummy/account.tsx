import AppleLinkAccountIcon from "@/assets/svg/AppleLinkAccountIcon";
import FacebookLinkAccountIcon from "@/assets/svg/FacebookLinkAccountIcon";
import GoogleLinkAccountIcon from "@/assets/svg/GoogleLinkAccountIcon";
import LinkAccountIcon from "@/assets/svg/LinkAccountIcon";
import PasswordIcon from "@/assets/svg/PasswordIcon";
import { EMenuTitle } from "@/constants";
import { Routes } from "@/navigator";
import { DeleteAccount } from "@/screens";
import { Icons } from "@/themes";

export const MenuAccount = [
  {
    id: 2,
    title: EMenuTitle.Password,
    routeName: Routes.ChangePassword,
    icon: Icons.Password,
  },
  {
    id: 3,
    title: EMenuTitle.LinkAccount,
    routeName: Routes.LinkAccount,
    icon: Icons.LinkAccount
  },
  {
    id: 4,
    title: EMenuTitle.DeleteAccount,
    routeName: Routes.DeleteAccount,
    icon: Icons.DeleteAccount
  },
];

export const MenuSocial = [
  {
    id: 1,
    socialName: 'Facebook',
    icon: Icons.Facebook,
  },
  {
    id: 2,
    socialName: 'Google',
    icon: Icons.Google,
  },
  {
    id: 3,
    socialName: 'Apple ID',
    icon: Icons.Apple,
  },
];

export const SurveyList = [
  {
    id: 'option1',
    survey: "I'm not using the app.",
  },
  {
    id: 'option2',
    survey: 'I found a better alternative.',
  },
  {
    id: 'option3',
    survey: 'The app contains too many ads.',
  },
  {
    id: 'option4',
    survey:
      "The app didn't have the features or functionality I were looking for.",
  },
  {
    id: 'option5',
    survey: "I'm not satisfied with the quality of content.",
  },
  {
    id: 'option6',
    survey: 'The app was difficult to navigate.',
  },
  {
    id: 'option7',
    survey: 'Other',
  },
];