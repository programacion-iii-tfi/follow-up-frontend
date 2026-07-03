import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface SelectInputProps {
  label: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  placeholder?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function SelectInput({
  label,
  iconName,
  placeholder = 'Seleccionar...',
  value,
  options,
  onChange,
}: SelectInputProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: open ? Colors.primary : Colors.secondary }]}>
          {label}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.inputContainer, { borderColor: open ? Colors.primary : Colors.border }]}
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
      >
        <MaterialIcons
          name={iconName}
          size={22}
          color={open ? Colors.primary : Colors.secondary}
          style={styles.leftIcon}
        />
        <Text style={[styles.valueText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <MaterialIcons name="expand-more" size={22} color={Colors.secondary} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, item === value && styles.optionSelected]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.optionText, item === value && styles.optionTextSelected]}>
                    {item}
                  </Text>
                  {item === value && (
                    <MaterialIcons name="check" size={18} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 8,
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 12,
    backgroundColor: Colors.background,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 52,
  },
  leftIcon: {
    marginRight: 8,
  },
  valueText: {
    flex: 1,
    fontSize: 15,
    color: Colors.neutral,
  },
  placeholder: {
    color: Colors.outline,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
    maxHeight: '60%',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.neutral,
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  optionSelected: {
    backgroundColor: `${Colors.primary}08`,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 15,
    color: Colors.neutral,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.surfaceVariant,
  },
});
