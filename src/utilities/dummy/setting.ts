import { Routes } from "@/navigator";
import { Icons } from "@/themes";

export const MENU_SETINGS = [
    {
        title: 'Diamonds',
        subTitle: '1.234M',
        icon: Icons.DiamondFill,
        isFist: true,
        color: 'yellow',
        screen: Routes.Diamonds
    },
    {
        title: 'Guideline',
        subTitle: '',
        icon: Icons.Guideline,
        isBreak: true,
        color: 'blue',
        screen: Routes.Guideline
    },
    {
        isFist: true,
        title: 'Account',
        subTitle: '',
        color: 'purple',
        icon: Icons.Account,
        screen: Routes.Account
    },
    {
        title: 'Privacy and Security',
        subTitle: '',
        color: 'cyan',
        icon: Icons.security,
        screen: Routes.PrivateSecurity
    },
    {
        color: 'pink',
        title: 'Notifications',
        subTitle: '',
        icon: Icons.Noti,
        screen: Routes.Notifications
    },
]
export const MENU_SETINGS_BOTTOM = [
    {
        title: 'Data and Storage',
        color: 'success',
        subTitle: '',
        icon: Icons.DataStorage,
        isBreak: true,
        screen: Routes.DataStorage
    },
    {
        title: 'Help and Support',
        color: 'warning',
        subTitle: '',
        icon: Icons.Help,
        isFist: true,
        screen: Routes.HelpSupport
    },
    {
        title: 'About Friendify',
        color: 'indigo',
        subTitle: '',
        icon: Icons.AboutFriend,
        screen: Routes.AboutUs
    },
    {
        title: 'Friendify Premium',
        subTitle: '',
        color: 'linear',
        icon: Icons.AskAi,
        isBreak: true,
        screen: Routes.FriendifyPremium
    },
]