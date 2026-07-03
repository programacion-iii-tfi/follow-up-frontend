import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';

interface FormFieldProps extends ViewProps {
    label: string;
    errorMessage?: string;
}

export const FormField = ({ label, errorMessage, children, style, ...props }: FormFieldProps) => {
    return (
        <View style={[styles.container, style]} {...props}>
            <Text style={styles.label}>{label}</Text>

            <View style={styles.inputWrapper}>
                {children}
            </View>

            {errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        marginTop: 8,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.neutral,
        marginBottom: 6,
        marginLeft: 4,
    },
    inputWrapper: {},
    errorText: {
        fontSize: 12,
        color: Colors.error,
        marginTop: 6,
        marginLeft: 4,
    },
});