import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { scale } from "react-native-size-matters";
import Svg, { Rect } from "react-native-svg";

// Convert Rect to an Animated Component
const AnimatedRect = Animated.createAnimatedComponent(Rect);

const CustomLoading = () => {
    const opacities = [
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
    ];

    useEffect(() => {
        opacities.forEach((opacity, index) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 0.2,
                        duration: 500,
                        delay: index * 200, // Add delay for staggered animation
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: false, // `false` is required for SVG animations
                    }),
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: false,
                    }),
                ])
            ).start();
        });
    }, []);

    return (
        <Svg width={scale(200)} height={scale(200)} viewBox="0 0 100 100">
            {[
                { x: 15, fill: "#f9253f" },
                { x: 35, fill: "#2dd1ff" },
                { x: 55, fill: "#a9a9a9" },
                { x: 75, fill: "#f9253f" },
            ].map((bar, index) => (
                <AnimatedRect
                    key={index}
                    x={bar.x}
                    y={30}
                    width={10}
                    height={40}
                    fill={bar.fill}
                    opacity={opacities[index]}
                />
            ))}
        </Svg>
    );
};

export default CustomLoading;
