import { theme } from '@/themes';
import React from 'react';
import { StyleSheet, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { AppView } from '..';

const LoadingComponent = ({ style }: { style?: StyleProp<ViewStyle> }) => {
    return (
        <AppView style={[styles.container, style]}>
            <ActivityIndicator size={'small'} color={theme.colors.blue} />
        </AppView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        width: '100%',
        alignItems: 'center'
    },
});

export default LoadingComponent;
