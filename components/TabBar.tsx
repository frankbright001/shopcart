import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
// import {  useTheme } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButton from './ButtonTabBar';
import { Colors } from '@/constants/Colors';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect, useState } from 'react';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
 
  const [dimensions, setDimensions] = useState({ width: 20, height: 100 });

  const buttonWidth = dimensions.width / state.routes.length;

  useEffect(() => {
    tabPositionX.value = withTiming(buttonWidth * state.index, { 
      duration: 200 });
  }, [buttonWidth, state.index, tabPositionX])

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View onLayout={onTabBarLayout} style={styles.tabbar}>
      <Animated.View 
        style={[ animatedStyle, { 
        position: 'absolute', 
        backgroundColor: Colors.primary, 
        top: 0, 
        left: 20, 
        right: 0, 
        height: 2, 
        width: buttonWidth / 2,
        }]} 
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.name,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            label={label}
            routeName={route.name as any}
          />
        );
      })}
    </View>
  );
}




const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: Colors.white,
    // borderTopWidth: 1,
    // borderTopColor: Colors.lightGray,
  },
})