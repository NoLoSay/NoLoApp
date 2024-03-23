import React from 'react';
import {TouchableOpacity, StyleSheet, View, ViewStyle, TouchableOpacityProps} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { NoloText } from "@components/NoloText";
import { colors } from '../global/colors';

interface NoloButtonProps extends TouchableOpacityProps {
    text: string;
    iconSvg?: React.FC<SvgProps>;
    backgroundColor?: string;
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    textGstyle?: 'h1' | 'h2' | 'h3' | 'text' | 'boldtext' | 'buttontext1' | 'buttontext2';
    gstyle: 'globalButtonStyle';
    onButtonPress?: () => void;
}

export const NoloButton = ({
                               text,
                               iconSvg,
                               gstyle,
                               textGstyle = 'buttontext1',
                               backgroundColor = colors.accent,
                               borderWidth = 0,
                               borderColor = 'transparent',
                               borderRadius = 8,
                               paddingVertical = 10,
                               paddingHorizontal = 12,
                               style,
                               onButtonPress,
                               ...props
                           }: NoloButtonProps) => {

    const buttonStyles: ViewStyle = {
        backgroundColor,
        borderWidth,
        borderColor,
        borderRadius,
        paddingVertical,
        paddingHorizontal,
        ...style,
    };

    const Content = () => (
        <>
            {iconSvg && <iconSvg />}
            <NoloText gstyle={textGstyle} content={text} />
        </>
    );

    return (
        <TouchableOpacity
            style={[styles.button, buttonStyles]}
            onPress={onButtonPress}
            {...props}
        >
            <View style={[styles.flexRow, gstyles[gstyle]]}>
                <Content />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const gstyles = StyleSheet.create({
    globalButtonStyle: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: colors.accent,
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 9,
        elevation: 5,
    },
});
