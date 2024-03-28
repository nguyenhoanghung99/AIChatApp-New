import React, { Ref, forwardRef, useImperativeHandle, useState } from 'react';
import { AppIcon, AppText, AppView } from '@/components';
import AppButton from '@/components/AppButton/AppButton';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker'
import { Icons, fonts } from '@/themes';

export interface IDateTime {
    date: Date,
    title: string,
}
export type DateTimeRef = {
    getValue?: () => void;
};
const DateTimePicker = forwardRef((props: IDateTime, ref: Ref<DateTimeRef>) => {
    const [date, setDate] = useState(props?.date ?? new Date());
    const [open, setOpen] = useState(false);
    useImperativeHandle(ref, () => ({
        getValue: () => date,
    }));
    return (
        <>
            <AppView gap='xs'>
                <AppText variant={'heading3'} color={'color72'}>{props.title}</AppText>
                <AppButton
                    onPress={() => setOpen(pre => pre = true)}
                    backgroundColor={'bgBlack'}
                    height={48}
                    paddingHorizontal='base'
                    justifyContent='space-between'
                    borderRadius={'xxs'}
                    flexDirection='row'
                    alignItems='center'
                    borderWidth={1}
                    borderColor={'colorF0'}
                >
                    <AppText fontWeight='400' color={'color26'}  variant={'rMedium'}>{dayjs(date).format('DD/MM/YYYY')}</AppText>
                    <AppIcon name={Icons.calendar} />
                </AppButton>
            </AppView>
            <DatePicker
                mode='date'
                modal
                open={open}
                date={date}
                maximumDate={new Date()}
                onConfirm={(value: React.SetStateAction<Date>) => {
                    setOpen(pre => pre = false)
                    setDate(value)
                }}
                onCancel={() => {
                    setOpen(pre => pre = false)
                }}
            />
        </>
    );
});

export default DateTimePicker;