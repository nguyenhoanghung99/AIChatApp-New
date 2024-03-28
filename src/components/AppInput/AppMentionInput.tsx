import { MentionInputProps, MentionPartType } from '@/@types/mention-input';
import { AppIcon, AppText, AppTouchableOpacity, AppView } from '@/components';
import { FontSizes, Icons, Theme, isIOS, responsiveHeight, responsiveWidth, width } from '@/themes';
import {
  generateValueFromPartsAndChangedText,
  generateValueWithAddedSuggestion,
  getMentionPartSuggestionKeywords,
  isMentionPartType,
  parseValue,
} from '@/utilities';
import { useTheme } from '@shopify/restyle';
import React, { MutableRefObject, useCallback, useMemo, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextInputSelectionChangeEventData,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export default function AppMentionInput({
  value,
  onChange,
  partTypes = [],
  inputRef: propInputRef,
  containerStyle,
  onSelectionChange,
  onSendMessage,
  ...textInputProps
}: MentionInputProps) {
  const { colors } = useTheme<Theme>();
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const inputWidth = useSharedValue(width - responsiveWidth(160));
  const textInput = useRef<TextInput | null>(null);
  const handleTextInputRef = (ref: TextInput) => {
    textInput.current = ref as TextInput;

    if (propInputRef) {
      if (typeof propInputRef === 'function') {
        propInputRef(ref);
      } else {
        (propInputRef as MutableRefObject<TextInput>).current =
          ref as TextInput;
      }
    }
  };
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const { plainText, parts } = useMemo(
    () => parseValue(value, partTypes),
    [value, partTypes],
  );
  const handleSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
  ) => {
    setSelection(event.nativeEvent.selection);

    onSelectionChange && onSelectionChange(event);
  };
  const onChangeInput = (changedText: string) => {
    onChange(
      generateValueFromPartsAndChangedText(parts, plainText, changedText),
    );
  };
  const keywordByTrigger = useMemo(() => {
    return getMentionPartSuggestionKeywords(
      parts,
      plainText,
      selection,
      partTypes,
    );
  }, [parts, plainText, selection, partTypes]);
  const onSuggestionPress =
    (mentionType: MentionPartType) => (suggestion: TMembers) => {
      const newValue = generateValueWithAddedSuggestion(
        parts,
        mentionType,
        plainText,
        selection,
        suggestion,
      );

      if (!newValue) {
        return;
      }

      onChange(newValue);
    };
  const onFocus = () => {
    inputRef.current?.focus();
    setFocused(true);
    inputWidth.value = withTiming(width - responsiveWidth(65), {
      duration: 45
    });
  };
  const onBlur = () => {
    inputRef.current?.blur();
    setFocused(false);
    inputWidth.value = withTiming(width - responsiveWidth(160), {
      duration: 0
    });
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: inputWidth.value,
    };
  });
  const renderMentionSuggestions = (mentionType: MentionPartType) => (
    <React.Fragment key={mentionType.trigger}>
      {mentionType.renderSuggestions &&
        mentionType.renderSuggestions({
          keyword: keywordByTrigger[mentionType.trigger],
          onSuggestionPress: onSuggestionPress(mentionType),
        })}
    </React.Fragment>
  );
  return (
    <AppView position="relative">
      {(
        partTypes.filter(
          one =>
            isMentionPartType(one) &&
            one.renderSuggestions != null &&
            !one.isBottomMentionSuggestionsRender,
        ) as MentionPartType[]
      ).map(renderMentionSuggestions)}
      <AppView
        paddingHorizontal="base"
        borderTopColor="neutralGrey3"
        borderTopWidth={1}
        paddingTop="base"
        paddingBottom={isIOS ? "xxl" : "massive"}
        flexDirection="row"
        alignItems="center"
        backgroundColor="white">
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
            <AppTouchableOpacity>
              <AppIcon name={Icons.CirclePlus} size={FontSizes.title} color={colors.neutralGrey9}/>
            </AppTouchableOpacity>
          </AppView>
        )}
        <Animated.View
          style={[
            styles.coverInput,
            { borderColor: colors.neutralGrey3, backgroundColor: colors.white },
            animatedStyle
          ]}>
          <AppView style={containerStyle}>
            <TextInput
              multiline
              {...textInputProps}
              ref={handleTextInputRef}
              onChangeText={onChangeInput}
              onSelectionChange={handleSelectionChange}
              style={styles.input}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              <AppText variant="span">
                {parts.map(({ text, partType, data }, index) =>
                  partType ? (
                    <AppText
                      variant="span"
                      key={`${index}-${data?.trigger ?? 'pattern'}`}
                      color="lightLink">
                      {text}
                    </AppText>
                  ) : (
                    <AppText variant="span" key={index}>
                      {text}
                    </AppText>
                  ),
                )}
              </AppText>
            </TextInput>
          </AppView>
          <AppTouchableOpacity
            onPress={onSendMessage}
          >
            <AppIcon name={Icons.KeyboardVoice} size={FontSizes.title} color={colors.neutralGrey9} />
          </AppTouchableOpacity>
        </Animated.View>
        <AppIcon
          name={Icons.AskAi}
          size={FontSizes.large}
          color={colors.black}
        />
      </AppView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  input: {
    maxHeight: responsiveHeight(75),
    paddingTop: 0,
    ...Platform.select({
      android: {
        paddingVertical: responsiveHeight(6),
      },
      ios: {
      }
    }),
  },
  coverInput: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(8),
    marginHorizontal: responsiveHeight(10),
    borderRadius: responsiveHeight(16),
    paddingHorizontal: responsiveHeight(12),
  },
  cover: {
    paddingVertical: responsiveHeight(3),
  },
});
