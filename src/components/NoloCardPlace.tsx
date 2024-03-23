import React from 'react';
import { View, Image, ImageSourcePropType, StyleSheet, TouchableOpacity, Text } from 'react-native';
import {NoloText} from "@components/NoloText";
import {NoloImage} from "@components/NoloImage";
import Nolo

interface NoloCardPlaceProps {
    imageSource: ImageSourcePropType;
    title: string;
    description: string;
    buttonText: string;
    onButtonPress: () => void;
    styleType: 'littleCard' | 'style2' | 'style3' | 'style4';
}

export const NoloCardPlace: React.FC<NoloCardPlaceProps> = ({
                                                                imageSource,
                                                                title,
                                                                description,
                                                                buttonText,
                                                                onButtonPress,
                                                                styleType
                                                            }) => {
    if (styleType == "littleCard") {
        return (
            <TouchableOpacity onPress={onButtonPress}>
                <View style={styles.littleCardContainer}>
                    <NoloImage source={imageSource} gstyle="placeIcon"/>
                    <View style={styles.littleCardContent}>
                        <NoloText content={title} gstyle="h1" />
                        <NoloText content={description} gstyle="text" />
                        <NoloButton text={buttonText}  gstyle='textIconBtn'/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    if (styleType == "littleCardOnMap") {
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.littleCardContainer}>
                    <NoloImage source={imageSource} gstyle="placeIcon"/>
                    <View style={styles.littleCardContent}>
                        <NoloText content={title} gstyle="h1" />
                        <NoloText content={description} gstyle="text" />
                        <NoloButton text={buttonText}  gstyle='textIconBtn'/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <View style={[styles.card, styles[styleType]]}>
            <NoloImage source={imageSource} gstyle='placeIcon'/>
            <NoloText content={title} gstyle='h1'></NoloText>
            <NoloText content={description} gstyle='text'></NoloText>
            <NoloButton onPress={onButtonPress} gstyle={'textIconBtn'} text={buttonText}></NoloButton>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        padding: 16,
        margin: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    littleCardContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 9,
        elevation: 5,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    littleCardContent: {
        height: 115,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    littleCardOnMap: {

    },
    style3: {

    },
    style4: {

    }
});
