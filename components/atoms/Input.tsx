import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

export interface InputProps extends TextInputProps {
    iconName: keyof typeof MaterialIcons.glyphMap;
    isPassword?: boolean;
}

export const Input = ({ iconName, isPassword = false, ...props }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View style={[styles.inputContainer, { borderColor: isFocused ? Colors.primary : Colors.border }]}>
            <MaterialIcons
                name={iconName}
                size={22}
                color={isFocused ? Colors.primary : Colors.secondary}
                style={styles.icon}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor={Colors.outline}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                secureTextEntry={isPassword && !isPasswordVisible}
                {...props}
            />
            {isPassword && (
                <TouchableOpacity activeOpacity={0.7} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <MaterialIcons
                        name={isPasswordVisible ? 'visibility-off' : 'visibility'}
                        size={22}
                        color={Colors.secondary}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 12,
        minHeight: 52,
        backgroundColor: Colors.white,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.neutral,
        minHeight: 52,
    },
});