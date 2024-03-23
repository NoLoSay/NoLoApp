import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface NoloTextProps extends TextProps {
    gstyle: 'h1' | 'h2' |'h3' |'text' |'boldtext' |'buttontext1' |'buttontext2';
    content: string;
    color?: string;
    size?: number;
    weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    italic?: boolean;
    decoration?: 'none' | 'underline' | 'line-through' | 'underline line-through';
    letterSpacing?: number;
    lineHeight?: number;
}

export const NoloText = ({
                             content,
                             gstyle,
                             color = 'black',
                             size,
                             weight,
                             align = 'auto',
                             italic = false,
                             decoration = 'none',
                             letterSpacing,
                             lineHeight,
                             ...props
                         }: NoloTextProps) => {
    const globalStyle = styles[gstyle] || {}; // Sélectionne le style global basé sur gstyle
    return (
        <Text
            style={[
                {
                    color,
                    fontSize: size,
                    fontWeight: weight,
                    textAlign: align,
                    fontStyle: italic ? 'italic' : 'normal',
                    textDecorationLine: decoration,
                    letterSpacing,
                    lineHeight,
                },
                globalStyle, // Applique le style global ici
            ]}
            {...props}
        >
            {content}
        </Text>
    );
};

const styles = StyleSheet.create({
    h1: {
        fontSize: 23,
        weight: 'bold',
    },
    h2: {
        fontSize: 15,
        weight: 'bold',
    },
    h3: {
        fontSize: 12,
        weight: 'bold',
    },
    text: {
        fontSize: 11,
    },
    boldtext: {
        fontSize: 11,
        weight: 'bold',
    },
    buttontext1: {
        fontSize: 17,
        weight: 'bold',
    },
    buttontext2: {
        fontSize: 14,
        weight: 'bold',
    }
});
