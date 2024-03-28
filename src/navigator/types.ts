import {ParamListBase} from '@react-navigation/native';
import {Routes} from './Routes';
import {EMediaType} from '@/constants';

/** Type */
type SpashScreenParams = object;
type LoginScreenParams = object;
type VerifyOtpScreenParams = object;
type ResetPasswordScreenParams = object;
type ForgotPasswordScreenParams = object;
type ChatSupportScreenParams = object;
type HomepageScreenParams = object;
type ScanQrCodeScreenParams = object;
type ChangeLanguageScreenParams = object;
type LanguageScreenParams = object;
type NotificationsScreenParams = object;
type FrequentlyAskQuestionScreenParams = object;
type InformationProfileScreenParams = object;
type PolicyPrivacyScreenParams = object;
type ChangeEmailScreenParams = object;
type AccountRemovedScreenParams = object;
type RequestReceievedScreenParams = object;
type ChangePasswordScreenParams = object;
type DeleteAccountScreenParams = object;
type LinkAccountScreenParams = object;
type PrivateSecurityScreenParams = object;
type ChatGroupUserScreenParams = {
  avatar: string;
  members: TMembers[];
  roomName: string;
  type: string;
  roomId: string;
};
type ChatOneUserScreenParams = {
  avatar: string;
  roomName: string;
  type: string;
  roomId?: string;
  screen?: string;
  idUser?: string;
};
type ProfileGroupScreenParams = object;
type ProfileUserScreenParams = object;
type ViewMediaScreenParams = {
  type: EMediaType;
  url: string;
};
export interface AppStackParamList extends ParamListBase {
  /** Params */
  [Routes.HomeMessages]: SpashScreenParams;
  [Routes.AskAi]: LoginScreenParams;
  [Routes.AboutUs]: VerifyOtpScreenParams;
  [Routes.Account]: ResetPasswordScreenParams;
  [Routes.Appearance]: ForgotPasswordScreenParams;
  [Routes.DataStorage]: ChatSupportScreenParams;
  [Routes.FriendifyPremium]: HomepageScreenParams;
  [Routes.Guideline]: ScanQrCodeScreenParams;
  [Routes.HelpSupport]: ChangeLanguageScreenParams;
  [Routes.Language]: LanguageScreenParams;
  [Routes.Notifications]: NotificationsScreenParams;
  [Routes.FriendifyPremium]: FrequentlyAskQuestionScreenParams;
  [Routes.EditProfile]: InformationProfileScreenParams;
  [Routes.Setting]: PolicyPrivacyScreenParams;
  [Routes.ChangeEmail]: ChangeEmailScreenParams;
  [Routes.ChangePassword]: ChangePasswordScreenParams;
  [Routes.AccountRemoved]: AccountRemovedScreenParams;
  [Routes.DeleteAccount]: DeleteAccountScreenParams;
  [Routes.RequestReceieved]: RequestReceievedScreenParams;
  [Routes.LinkAccount]: LinkAccountScreenParams;
  [Routes.PrivateSecurity]: PrivateSecurityScreenParams;
  [Routes.ChatGroupUser]: ChatGroupUserScreenParams;
  [Routes.ChatOneUser]: ChatOneUserScreenParams;
  [Routes.ProfileGroup]: ProfileGroupScreenParams;
  [Routes.ProfileUser]: ProfileUserScreenParams;
  [Routes.ViewMedia]: ViewMediaScreenParams;
}

export type IItemTabBar = {
  route: string;
  title: string;
};
