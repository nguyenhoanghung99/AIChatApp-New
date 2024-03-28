import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, TextInput} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@shopify/restyle';
import uuid from 'react-native-uuid';
import {Controller, useForm} from 'react-hook-form';
import {useQueryClient} from '@tanstack/react-query';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  AppButton,
  AppIcon,
  AppText,
  AppTouchableOpacity,
  AppView,
} from '@/components';
import {
  FontSizes,
  Icons,
  Theme,
  isIOS,
  responsiveHeight,
  responsiveWidth,
  width,
} from '@/themes';

import {useSocketChatMessage, useUserSender} from '@/hooks';
import {QueryKeys} from '@/constants';
import {useReplyStore} from '@/stores';

type TProps = {
  roomId: string;
  params: TPage;
  openMedia: () => void;
  openRecording: () => void;
};
export default function SendMessage({
  roomId,
  openMedia,
  openRecording,
}: TProps) {
  const queryClient = useQueryClient();
  const {t} = useTranslation();
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const inputWidth = useSharedValue(width - responsiveWidth(160));
  const {colors} = useTheme<Theme>();
  const {onSendMessageSocket} = useSocketChatMessage();
  const {sender} = useUserSender();
  const {replySender, resetReplySender} = useReplyStore(state => state);
  useEffect(() => {
    if (replySender?.message?._id) {
      inputRef.current?.focus();
    }
  }, [replySender?.message?._id]);
  const {
    control,
    handleSubmit,
    reset,
    formState: {isValid, isDirty},
  } = useForm<{message: string}>({
    defaultValues: {
      message: '',
    },
  });
  const onFocus = () => {
    setFocused(true);
    inputWidth.value = withTiming(width - responsiveWidth(65), {
      duration: 45,
    });
    inputRef.current?.focus();
  };
  const onBlur = () => {
    inputRef.current?.blur();
    setFocused(false);
    inputWidth.value = withTiming(width - responsiveWidth(160), {
      duration: 0,
    });
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: inputWidth.value,
    };
  });

  const onSendMessage = useCallback(
    ({message}: {message: string}) => {
      const form = {
        content: message,
        subType: replySender?.subType ?? '',
        ...(replySender?.message ? {replySender: replySender?.message} : {}),
        idMessage: uuid.v4() as string,
        roomId,
        tag: [],
      } as TSendMessageSocket;
      queryClient.setQueryData(
        [QueryKeys.LIST_MESSAGES, roomId],
        (oldData: any) => ({
          ...oldData,
          pages: oldData.pages.map((item: any) => ({
            ...item,
            data: [
              {
                ...form,
                ...sender,
              },
              ...item.data,
            ],
          })),
        }),
      );
      onSendMessageSocket(form);
      reset();
      resetReplySender();
    },
    [
      onSendMessageSocket,
      queryClient,
      reset,
      roomId,
      sender,
      resetReplySender,
      replySender,
    ],
  );

  return (
    <AppView
      paddingHorizontal="base"
      paddingTop="base"
      paddingBottom={isIOS ? 'xxl' : 'massive'}
      flexDirection="row"
      alignItems="center"
      backgroundColor="white"
      zIndex={20}
      gap="xs">
      {!focused && (
        <AppView flexDirection="row" alignItems="center" gap="xxs">
          <AppTouchableOpacity
            flexDirection="row"
            alignItems="center"
            backgroundColor="lightLink"
            paddingHorizontal="xxs"
            style={styles.cover}
            gap="xxs"
            borderRadius="xl">
            <AppIcon
              name={Icons.AskAi}
              size={FontSizes.large}
              color={'white'}
            />
            <AppText color="white" variant="baseSemiBold">
              AI
            </AppText>
          </AppTouchableOpacity>
          <AppTouchableOpacity onPress={() => openMedia?.()}>
            <AppIcon
              name={Icons.CirclePlus}
              size={FontSizes.title}
              color={colors.neutralGrey9}
            />
          </AppTouchableOpacity>
        </AppView>
      )}
      <Animated.View
        style={[
          styles.coverInput,
          {
            borderColor: colors.neutralGrey3,
            backgroundColor: colors.white,
          },
          animatedStyle,
        ]}>
        <Controller
          control={control}
          name="message"
          render={({field: {onChange, value}}) => (
            <TextInput
              ref={inputRef}
              style={[styles.input]}
              placeholder={t('Type a message') as string}
              placeholderTextColor={colors.colorBF}
              onFocus={onFocus}
              onBlur={onBlur}
              multiline
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <AppTouchableOpacity
          onPress={handleSubmit(onSendMessage)}
          disabled={isValid && !isDirty}>
          <AppIcon name={Icons.Send} size={FontSizes.large} />
        </AppTouchableOpacity>
      </Animated.View>
      <AppButton onPress={openRecording}>
        <AppIcon
          name={Icons.KeyboardVoice}
          size={FontSizes.title}
          color={colors.neutralGrey9}
        />
      </AppButton>
    </AppView>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    maxHeight: responsiveHeight(75),
    ...Platform.select({
      android: {
        paddingVertical: responsiveHeight(6),
      },
      ios: {},
    }),
  },
  coverInput: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      android: {
        paddingVertical: 0,
      },
      ios: {
        paddingVertical: responsiveHeight(8),
      },
    }),
    borderRadius: responsiveHeight(16),
    paddingHorizontal: responsiveHeight(12),
  },
  cover: {
    paddingVertical: responsiveHeight(3),
  },
});
