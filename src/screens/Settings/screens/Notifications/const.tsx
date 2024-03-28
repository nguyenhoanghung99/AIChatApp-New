export const ListNotificationType = [
  {
    notiType: [{title: 'Push Notification', status: true}],
  },
  {
    headerSection: 'Notification Preference',
    notiType: [
      {title: 'Sound', status: true},
      {title: 'Vibration', status: true},
    ],
  },
  {
    headerSection: 'Private Chat',
    notiType: [
      {title: 'Show Notification', status: true},
      {title: 'Message Preview', status: true},
    ],
  },
  {
    headerSection: 'Group Chat',
    notiType: [
      {title: 'Show Notification', status: true},
      {title: 'Message Preview', status: true},
      {title: 'New Group Invitation', status: true},
      {title: 'Group Mention', status: true},
    ],
  },
  {
    headerSection: 'Contact',
    notiType: [{title: 'New Friend Addition', status: true}],
  },
  //   {
  //     headerSection: 'AI Tool',
  //     notiType: [{title: 'Translation Complete', status: true}],
  //   },
];
