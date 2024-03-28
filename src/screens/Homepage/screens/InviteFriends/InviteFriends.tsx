import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  AppAvatar,
  AppCheckbox,
  AppFlashlist,
  AppIcon,
  AppNoData,
  AppSafeAreaView,
  AppText,
  AppTouchableOpacity,
  AppView,
} from '@/components';
import {BaseStyles, FontSizes, Icons, Theme, metrics, responsiveHeight} from '@/themes';
import {useTheme} from '@shopify/restyle';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-gesture-handler';
import {goBack} from '@/navigator';
import {useContacts} from '@/hooks';
import {Contact} from 'react-native-contacts';
import {ListRenderItem} from '@shopify/flash-list';
import Toast from 'react-native-simple-toast';
import {SMS_MESS, handleShare} from '@/utilities';
import SendSMS, {AndroidSuccessTypes} from 'react-native-sms';
import { Platform, StyleSheet } from 'react-native';

export default function InviteFriends() {
  const {colors} = useTheme<Theme>();
  const {t} = useTranslation();
  const inputRef = useRef<TextInput>(null);
  const {contacts, requestContactPermission} = useContacts();
  const [contactSort, setContactSort] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [selected, setSelected] = useState<Array<string>>([]);
  const prevRef = useRef({isShare: false}).current;

  const onSendSms = async () => {
    const contactS: string[] = [];
    selected.filter(key => {
      contactS.push(key);
    });
    try {
      const phoneNumbers = [];
      for (const contact of contacts) {
        if (
          contactS?.includes(contact.recordID) &&
          contact.phoneNumbers.length
        ) {
          phoneNumbers.push(contact.phoneNumbers[0].number);
        }
      }
      SendSMS.send(
        {
          body: SMS_MESS,
          recipients: phoneNumbers,
          allowAndroidSendWithoutReadPermission: true,
          successTypes: ['sent', 'queued'] as AndroidSuccessTypes[],
        },
        (completed, cancelled, error) => {
          if (completed) {
            return Toast.show('Invite friend successfully.', Toast.SHORT);
          }
          if (error) {
            console.log('Send SMS error');
          }
        },
      );
    } catch (error) {
      console.log('Send SMS error');
    }
  };

  const doShare = () => {
    if (!prevRef.isShare) {
      prevRef.isShare = true;
      handleShare('text', SMS_MESS, () => {
        prevRef.isShare = false;
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      requestContactPermission();
    }, 500);
    return () => clearTimeout(timer)
  }, []);

  useEffect(() => {
    if (contacts) {
      const filteredContacts = contacts
        ?.sort((a, b) =>
          a?.givenName?.charCodeAt(0) < b.givenName?.charCodeAt(0) ? -1 : 1,
        )
        .filter(contact => {
          return (contact.familyName || contact.givenName)
            .toLowerCase()
            .includes(search?.toLowerCase());
        });
      setContactSort(filteredContacts);
    }
  }, [contacts, search]);

  const onSelectAll = useCallback(() => {
    if (selected.length === contactSort?.length) {
      setSelected([]);
    } else {
      const numSelected: string[] = [];
      contactSort.forEach(file => numSelected.push(file.recordID));
      setSelected(numSelected);
    }
  }, [contactSort.length, selected.length]);

  const renderItem = useCallback(
    ({item}: {item: Contact}) => {
      return (
        <AppView
          key={item?.recordID}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="base"
          paddingHorizontal="base"
          backgroundColor="white"
          paddingTop="sm">
          <AppView flex={1} flexDirection="row" alignItems="center" gap="base">
            <AppAvatar
              borderRadius={100}
              width={52}
              height={52}
              avatar={item?.thumbnailPath}
            />
            <AppText color="black" variant="sMedium">
              {item?.givenName}
            </AppText>
          </AppView>
          <AppView>
            <AppCheckbox
              value={selected.includes(item.recordID)}
              onChange={() => {
                if (!selected.includes(item.recordID)) {
                  setSelected(p => p.concat(item.recordID));
                } else {
                  setSelected(p => p.filter(i => i !== item.recordID));
                }
              }}
            />
          </AppView>
        </AppView>
      );
    },
    [selected],
  );

  return (
    <AppSafeAreaView flex={1} style={{backgroundColor: 'white'}}>
      <AppView backgroundColor="white" flex={1}>
        <AppView
          paddingHorizontal="base"
          flexDirection="row"
          alignItems="center"
          paddingBottom="base">
          <AppTouchableOpacity
            flex={1}
            onPress={goBack}>
            <AppIcon
              name={Icons.Close}
              color={colors.black}
              size={FontSizes.span}
            />
          </AppTouchableOpacity>
          <AppView
            flex={2}
            flexDirection="row"
            alignContent="center"
            justifyContent="center">
            <AppText variant="heading3" color="black" textAlign="center">
              {t('Invite Friend')}
            </AppText>
          </AppView>
          <AppTouchableOpacity
            flex={1}
            onPress={onSelectAll}>
            <AppText color="lightLink" variant="span" textAlign="right">
              {t('Select All')}
            </AppText>
          </AppTouchableOpacity>
        </AppView>

        <AppView paddingHorizontal="base" height={40}>
          <AppView
            flexDirection="row"
            paddingHorizontal="base"
            alignItems="center"
            backgroundColor="neutralGrey5"
            borderRadius="sm">
            <AppTouchableOpacity onPress={() => inputRef.current?.focus()}>
              <AppIcon
                name={Icons.Search}
                size={FontSizes.large}
                color={colors.neutralGrey7}
              />
            </AppTouchableOpacity>
            <TextInput
              ref={inputRef}
              style={[BaseStyles.flex1, {paddingHorizontal: metrics.xxs}, styles.input]}
              placeholder={t('Search') as string}
              onChangeText={e => setSearch(e)}
            />
          </AppView>
        </AppView>
        <AppView paddingHorizontal="base" marginTop="sm">
          <AppTouchableOpacity
            flexDirection="row"
            alignItems="center"
            gap="sm"
            paddingBottom="sm"
            onPress={doShare}>
            <AppIcon name={Icons.Heart} size={20} color={colors.lightLink} />
            <AppText color="lightLink" variant="headingR3">
              {t('Share') + 'Friendify'}
            </AppText>
          </AppTouchableOpacity>
        </AppView>

        <AppView
          borderTopColor="colorF0"
          flexDirection="column"
          justifyContent="center"
          borderTopWidth={1}
          flex={1}
          paddingTop="tiny">
          {!contactSort.length ? (
            <AppNoData
              icon={
                <AppIcon
                  name={Icons.Account}
                  color={colors.color8c}
                  size={100}
                />
              }
              title="No Request"
              desc="When people send you friend requests, they’ll appear here."
            />
          ) : (
            <AppFlashlist
              data={contactSort}
              renderItem={renderItem as ListRenderItem<Contact | unknown>}
              estimatedItemSize={50}
              onEndReached={() => {}}
              isRefetching={false}
              refetch={() => console.log('Refresh list contact')}
              isLoading={false}
              extraData={[selected]}
            />
          )}
        </AppView>
        <AppView
          style={{
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: -2},
            shadowOpacity: 0.25,
            shadowRadius: 8,
          }}
          margin="base"
          position="absolute"
          bottom={0}
          left={0}
          right={0}>
          <AppTouchableOpacity
            borderRadius="sm"
            backgroundColor="lightLink"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap="tiny"
            height={48}
            onPress={onSendSms}>
            <AppText color={'white'} variant="sMedium">
              {t('Invite')}
            </AppText>
            <AppText color={'white'} variant="sMedium">
              {selected?.length}
            </AppText>
            <AppText color={'white'} variant="sMedium">
              {t('Contacts')}
            </AppText>
          </AppTouchableOpacity>
        </AppView>
      </AppView>
    </AppSafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    ...Platform.select({
      android: {

      },
      ios: {
        paddingVertical: responsiveHeight(12)
      }
    })
  }
})