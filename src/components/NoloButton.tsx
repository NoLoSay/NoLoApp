import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TouchableOpacityProps} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { NoloText} from "@components/NoloText";
import * as path from "node:path";

interface ButtonProps extends TouchableOpacityProps {
    gstyle: 'textIconBtn' | 'iconBtn' | 'textBtn';
    text: string;
    onButtonPress?: () => void;
    textGstyle?:  'h1' | 'h2' |'h3' |'text' |'boldtext' |'buttontext1' |'buttontext2';
    iconSvg?: string,
    backgroundColor?: string;
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
}

export const NoloButton = ({
                               text,
                               gstyle,
                               iconSvg,
                               textGstyle,
                               backgroundColor,
                               borderWidth,
                               borderColor,
                               borderRadius,
                               paddingVertical,
                               paddingHorizontal,
                               style,
                               onButtonPress,
                               ...props
                           }: ButtonProps) => {

    const globalStyle = gstyles[gstyle] || {};

    const buttonStyle: ViewStyle = {
        backgroundColor,
        borderWidth,
        borderColor,
        borderRadius,
        paddingVertical,
        paddingHorizontal,
    };
    if (gstyle == "textIconBtn") {
        return (
            <TouchableOpacity style={[styles.button, globalStyle, buttonStyle, style]} {...props} onPress={onButtonPress}>
                <NoloText
                    gstyle='buttontext1'
                    content={text}
                />
                <SvgComponent {...props} />
            </TouchableOpacity>
        );
    }
    if (gstyle == "textBtn") {
        return (
            <TouchableOpacity style={[styles.button, globalStyle, buttonStyle, style]} {...props} onPress={onButtonPress}>
                <NoloText
                    gstyle='buttontext1'
                    content={text}
                />
            </TouchableOpacity>
        );
    }
    if (gstyle == "iconBtn") {
        return (
            <TouchableOpacity style={[styles.button, globalStyle, buttonStyle, style]} {...props} onPress={onButtonPress}>
                <Svg SvgComponent={iconSvg}/>
            </TouchableOpacity>
        );
    }
    return (
        <TouchableOpacity style={[styles.button, globalStyle, buttonStyle, style]} {...props} onPress={onButtonPress}>
            <NoloText
                gstyle='buttontext1'
                content={text}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const gstyles = StyleSheet.create({
    textIconBtn: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#FDC80F',
        shadowColor: '#FDCC0F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 9,
        elevation: 5, // Élévation pour Android
    },
    iconBtn: {
        display: 'flex',
        paddingVertical: 5,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#FDC80F',
        shadowColor: '#FDC80F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 9,
        elevation: 5,
    },
    textBtn: {
        display: 'flex',
        width: 230,
        padding: 10,
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#FDC80F',
        shadowColor: '#FDC80F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 9,
        elevation: 5,
    },
});