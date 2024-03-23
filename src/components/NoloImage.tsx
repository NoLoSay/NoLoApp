import React from 'react';
import { Image, StyleSheet, ImageStyle, ImageProps } from 'react-native';

interface NoloImageProps extends ImageProps {
    gstyle: 'avatar' | 'thumbnail' | 'cover' | 'icon' | 'placeIcon';
    radius?: number;
    borderColor?: string;
    borderWidth?: number;
}
export const NoloImage: React.FC<NoloImageProps> = ({
                                                        gstyle,
                                                        radius = 0,
                                                        borderColor = 'transparent',
                                                        borderWidth = 0,
                                                        ...props
                                                    }) => {
    const globalStyle = styles[gstyle] || {};
    return (
        <Image
            style={[
                {
                    borderRadius: radius,
                    borderColor: borderColor,
                    borderWidth: borderWidth,
                },
                globalStyle,
                props.style,
            ]}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    placeIcon: {
        height: 115,
        width: 115,
        borderRadius: 6
    },
    icon: {
        width: '100%',
        height: 200,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    thumbnail: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    cover: {
        width: '100%',
        height: 200,
        borderRadius: 0,
    },
});
