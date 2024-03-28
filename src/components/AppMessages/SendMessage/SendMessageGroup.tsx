import {useTheme} from '@shopify/restyle';
import React, {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {MentionSuggestionsProps, PartType} from '@/@types/mention-input';
import {
  AppAvatar,
  AppMentionInput,
  AppPressable,
  AppScrollView,
  AppText,
  AppView,
} from '@/components';
import {BaseStyles, Theme, responsiveHeight} from '@/themes';
import {regexMention} from '@/utilities';

type TProps = {
  listMentions: TMembers[];
  params: TPage;
};
export default function SendMessageGroup({listMentions}: TProps) {
  const [value, setValue] = useState('');
  const {t} = useTranslation();
  const {colors} = useTheme<Theme>();
  const partTypes = useMemo(() => {
    return [
      {
        trigger: '@',
        renderSuggestions: ({
          keyword,
          onSuggestionPress,
        }: MentionSuggestionsProps) => {
          if (keyword == null) {
            return null;
          }
          return (
            <AppView
              position="absolute"
              bottom={'100%'}
              backgroundColor="neutralGrey3"
              left={0}
              right={0}
              maxHeight={responsiveHeight(150)}>
              <AppScrollView paddingHorizontal="base" paddingTop="xs">
                {listMentions
                  .filter(mention =>
                    mention.fullName
                      .toLocaleLowerCase()
                      .includes(keyword.toLocaleLowerCase()),
                  )
                  .map((item, index) => {
                    return (
                      <AppPressable
                        key={index}
                        paddingBottom="xs"
                        flexDirection="row"
                        alignItems="center"
                        onPress={() => onSuggestionPress(item)}>
                        <AppAvatar avatar={item?.avatar} />
                        <AppText marginLeft="xxs">{item?.fullName}</AppText>
                      </AppPressable>
                    );
                  })}
              </AppScrollView>
            </AppView>
          );
        },
      },
      {
        pattern: regexMention,
      },
    ] as PartType[];
  }, [listMentions]);
  const onSendMessage = useCallback(() => {
    console.log("value", value);
  },[])
  return (
    <AppMentionInput
      value={value}
      onChange={setValue}
      partTypes={partTypes}
      containerStyle={BaseStyles.flex1}
      placeholder={t('Type a message')}
      placeholderTextColor={colors.colorBF}
      onSendMessage={onSendMessage}
    />
  );
}
