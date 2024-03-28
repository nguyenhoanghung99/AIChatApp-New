import { AppText, AppView } from '@/components';
import { fonts, theme } from '@/themes';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Svg, { G, Circle } from "react-native-svg";

const PieChart = () => {
    const { t } = useTranslation();
    const radius = 70;
    const circleCircumference = 2 * Math.PI * radius;
    const data = [{
        color: 'lightLink',
        colorChart: theme.colors.lightLink,
        value: 30,
        name: 'Videos'
    },
    {
        color: 'success',
        colorChart: theme.colors.success,
        value: 10,
        name: 'Musics'
    },
    {
        color: 'yellow',
        colorChart: theme.colors.yellow,
        value: 15,
        name: 'Files'
    },
    {
        color: 'red',
        colorChart: theme.colors.red,
        value: 20,
        name: 'Photos'
    },
    {
        color: 'brown',
        colorChart: theme.colors.brown,
        value: 25,
        name: 'Others'
    }
    ];
    const total = data.map(x => x.value).reduce((a, b) => a + b);
    const angles = useMemo(() => {
        let angle = 0;
        const res: number[] = [];
        data.forEach(item => {
            const percentage = (item.value / total);
            res.push(angle);
            angle += percentage * 360;
        });
        return res;
    }, [data])


    console.log('angle', angles)
    return (
        <>
            <AppView justifyContent='center' alignItems='center' gap='base' marginTop='base'>
                <Svg height="160" width="160" viewBox="0 0 180 180">
                    <G rotation={-90} originX="90" originY="90">
                        {total === 0 ? (
                            <Circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                stroke="#F1F6F9"
                                fill="transparent"
                                strokeWidth="40"
                            />
                        ) : (
                            data.map((element, index) => {
                                const percentage = (element.value / total) * 100;
                                const strokeDashoffset = circleCircumference - (circleCircumference * percentage) / 100;
                                return (
                                    <Circle
                                        key={index}
                                        cx="50%"
                                        cy="50%"
                                        r={radius}
                                        stroke={element.colorChart}
                                        fill="transparent"
                                        strokeWidth="40"
                                        strokeDasharray={circleCircumference}
                                        strokeDashoffset={strokeDashoffset}
                                        rotation={angles[index]}
                                        originX="90"
                                        originY="90"
                                    />
                                );
                            }
                            )
                        )}
                    </G>
                </Svg>
                <AppText color={'color72'} variant='heading3'>{t('Data Usage')}</AppText>
                <AppText color={'color72'} variant='rMedium'>{t('Friendify uses ')}
                    <AppText variant='rMedium' color={'lightLink'}>{'[% data]'}</AppText>{' of your free disk space.'}
                </AppText>
            </AppView>
            <AppView backgroundColor={'bgBlack'} marginVertical={'xl'} marginHorizontal='base' padding='base' borderRadius='base' gap='base'>
                {
                    data.map((item, i) => {
                        const percentage = (item.value / total) * 100;
                        return (
                            <AppView
                                paddingTop={i == 0 ? 'reset' : 'base'}
                                key={`Data Usage${i}`}
                                flexDirection='row'
                                justifyContent={'space-between'}
                                alignItems='center'
                            >
                                <AppView flexDirection='row' alignItems='center' gap='xs' flex={1}>
                                    <AppView width={15} height={15} borderRadius={'massive'} backgroundColor={item.color as any} />
                                    <AppText variant='headingR3' color={'color26'}>{item.name}</AppText>
                                </AppView>
                                <AppText variant='headingR3' color={'color26'} textAlign='center' style={{ width: '30%' }}>{`${percentage}%`}</AppText>
                                <AppText variant='headingR3' color={'color26'} textAlign={'right'} style={{ width: '30%' }}>{`${item.value}GB`}</AppText>
                            </AppView>
                        );
                    })
                }
            </AppView>
        </>
    );
};

export default PieChart;