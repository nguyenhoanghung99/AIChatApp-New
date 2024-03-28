import { FlashList } from '@shopify/flash-list';
import { useTheme } from '@shopify/restyle';
import React, { useCallback, useDeferredValue, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl } from 'react-native';
import FastImage from 'react-native-fast-image';
import { container } from 'tsyringe';
import { AppBackHeader, AppIcon, AppInput, AppText, AppTouchableOpacity, AppView } from '@/components';
import { StorageKeys } from '@/constants';
import { useListLanguage, useUpdateTranslate } from '@/hooks';
import { FontSizes, Icons, Theme, responsiveHeight, responsiveWidth } from '@/themes';
import { Storage, normalizeAccent } from '@/utilities';

const storage = container.resolve(Storage)
export default function Language() {
  const languagesRef = useRef<TLanguage[]>([]);
  const [languages, setLanguages] = useState<TLanguage[]>([]);
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();
  const { colors } = useTheme<Theme>()
  const { data, refetch } = useListLanguage();
  const valueSearchText = useDeferredValue(searchText);
  const [languageSelected, setLanguageSelected] = useState<TLanguage>();
  const { updateTranslate } = useUpdateTranslate();
  useEffect(() => {
    if (!data || data.length === 0) return;
    const locale = storage.getItem(StorageKeys.LOCALE_LANGUAGE);
    const languageIndex = data.findIndex((language) => language?.code === locale);
    if (languageIndex !== -1) {
      const updatedData = [...data];
      const removedItem = updatedData.splice(languageIndex, 1)[0];
      updatedData.unshift(removedItem);

      languagesRef.current = updatedData;
      setLanguages(updatedData);

      const languageSelected = updatedData.find((language) => language?.code === locale);
      setLanguageSelected(languageSelected);
    }
  }, [data]);
  // Search Local
  useEffect(() => {
    if (valueSearchText.length === 0) {
      return setLanguages(languagesRef.current);
    }
    const result = languagesRef.current?.filter(i =>
      normalizeAccent(i?.name?.toLowerCase()).includes(
        normalizeAccent(valueSearchText?.toLowerCase()),
      ),
    );
    setLanguages(result);
  }, [valueSearchText]);

  const onSelectedLanguage = useCallback(async (item: TLanguage) => {
    setLanguageSelected(item);
    storage.setItem(StorageKeys.LOCALE_LANGUAGE, item.code)
    await updateTranslate(item.code);
  }, [updateTranslate])

  const renderItem = useCallback(({ item }: { item: TLanguage }) => {
    return (
      <AppTouchableOpacity
        key={item.code}
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        paddingVertical='xxs'
        onPress={() => onSelectedLanguage(item)}
      >
        <AppView flexDirection='row' alignItems='center' gap='xxs'>
          <FastImage source={{ uri: item?.image }} style={{ height: responsiveHeight(20), width: responsiveWidth(20) }} />
          <AppText color='neutralGrey9'>{item?.name}</AppText>
        </AppView>
        {languageSelected?.code === item?.code && <AppIcon name={Icons.Check} size={FontSizes.large} color={colors.lightLink} />}
      </AppTouchableOpacity>
    )
  }, [languageSelected?.code, onSelectedLanguage])
  return (
    <AppBackHeader title='Language'>
      <AppView margin='base' marginBottom='reset'>
        <AppInput
          placeholder='Login'
          onChangeText={setSearchText}
        />
      </AppView>
      <AppView flex={1}>
        <FlashList
          data={languages}
          renderItem={renderItem}
          keyExtractor={(item: TLanguage) => item?.code}
          estimatedItemSize={120}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: responsiveHeight(40) }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={refetch}
              tintColor={colors.neutralGrey7}
              title={t('Refreshing')}
              collapsable={true}
            />
          }
          scrollEventThrottle={16}
          extraData={[languageSelected]}
        />
      </AppView>
    </AppBackHeader>
  )
}
