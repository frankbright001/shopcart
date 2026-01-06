import { Text, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Icon } from '@/constants/Icons';
import { Colors } from '@/constants/Colors';

type Props = {
    onPress: () => void;
    onLongPress: () => void;
    isFocused: boolean;
    label: string;
    routeName: keyof typeof Icon;
}

const TabBarButton = (props: Props) => {
    const { onPress, onLongPress, isFocused, label, routeName, } = props;
  return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarBtn}
            >
                {routeName === 'cart' && (
                    <View style={styles.badgeWrapper}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                )}
                
                {Icon[routeName]({ color: isFocused ? Colors.primary : Colors.black })}
                <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                    {label}
                </Text>
        </Pressable>
  )
}

export default TabBarButton

const styles = StyleSheet.create({
    tabbarBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    badgeWrapper: {
        position: 'absolute',
        top: -5,
        right: 20,
        backgroundColor: Colors.highlight,
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 10,
        zIndex: 10,
    },
    badgeText: {
        color: Colors.black,
        fontSize: 12,
    },
});