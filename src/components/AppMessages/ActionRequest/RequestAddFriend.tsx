import React from 'react'
import { useTheme } from '@shopify/restyle'
import { useTranslation } from 'react-i18next';
import { AppIcon, AppText, AppTouchableOpacity } from '@/components'
import { FontSizes, Icons, Theme } from '@/themes'
import { useMutationFriend, useFriendChat } from '@/hooks';

type TProps = {
  members: TMembers[]
  isDetailLoading: boolean
}
export default function RequestAddFriend({ isDetailLoading, members }: TProps) {
  const { colors } = useTheme<Theme>();
  const { t } = useTranslation();
  const { onActionAddFriend, onActionAcceptFriend, onActionRevoke } = useMutationFriend();
  const { friendId } = useFriendChat({ members })

  if(isDetailLoading) return null 
  


  return (
    <AppTouchableOpacity
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      gap='xxs'
      paddingBottom='xs'
      onPress={() => onActionAddFriend({ recipient: friendId! })}
    >
      <AppIcon name={Icons.AddFriend} color={colors.lightLink} size={FontSizes.large} />
      <AppText color='lightLink'>{t('Add Friend')}</AppText>
    </AppTouchableOpacity>
  )
}
