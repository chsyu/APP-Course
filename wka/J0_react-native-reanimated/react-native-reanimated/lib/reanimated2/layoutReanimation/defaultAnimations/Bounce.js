import { withSequence, withTiming } from '../../animation';
import { Dimensions } from 'react-native';
import { BaseAnimationBuilder } from '../animationBuilder/BaseAnimationBuilder';
const { width, height } = Dimensions.get('window');
export class BounceIn extends BaseAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const delay = this.getDelay();
            const duration = this.getDuration();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [
                            {
                                scale: delayFunction(delay, withSequence(withTiming(1.2, { duration: duration * 0.55 }), withTiming(0.9, { duration: duration * 0.15 }), withTiming(1.1, { duration: duration * 0.15 }), withTiming(1, { duration: duration * 0.15 }))),
                            },
                        ],
                    },
                    initialValues: {
                        transform: [{ scale: 0 }],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new BounceIn();
    }
    static getDuration() {
        return 600;
    }
    getDuration() {
        var _a;
        return (_a = this.durationV) !== null && _a !== void 0 ? _a : 600;
    }
}
export class BounceInDown extends BaseAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const delay = this.getDelay();
            const duration = this.getDuration();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [
                            {
                                translateY: delayFunction(delay, withSequence(withTiming(-20, { duration: duration * 0.55 }), withTiming(10, { duration: duration * 0.15 }), withTiming(-10, { duration: duration * 0.15 }), withTiming(0, { duration: duration * 0.15 }))),
                            },
                        ],
                    },
                    initialValues: {
                        transform: [
                            {
                                translateY: height,
                            },
                        ],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new BounceInDown();
    }
    static getDuration() {
        return 600;
    }
    getDuration() {
        var _a;
        return (_a = this.durationV) !== null && _a !== void 0 ? _a : 600;
    }
}
export class BounceInUp extends BaseAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const delay = this.getDelay();
            const duration = this.getDuration();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [
                            {
                                translateY: delayFunction(delay, withSequence(withTiming(20, { duration: duration * 0.55 }), withTiming(-10, { duration: duration * 0.15 }), withTiming(10, { duration: duration * 0.15 }), withTiming(0, { duration: duration * 0.15 }))),
                            },
                        ],
                    },
                    initialValues: {
                        transform: [{ translateY: -height }],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new BounceInUp();
    }
    static getDuration() {
        return 600;
    }
    getDuration() {
        var _a;
        return (_a = this.durationV) !== null && _a !== void 0 ? _a : 600;
    }
}
export class BounceInLeft extends BaseAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const delay = this.getDelay();
            const duration = this.getDuration();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [
                            {
                                translateX: delayFunction(delay, withSequence(withTiming(20, { duration: duration * 0.55 }), withTiming(-10, { duration: duration * 0.15 }), withTiming(10, { duration: duration * 0.15 }), withTiming(0, { duration: duration * 0.15 }))),
                            },
                        ],
                    },
                    initialValues: {
                        transform: [{ translateX: -width }],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new BounceInLeft();
    }
    static getDuration() {
        return 600;
    }
    getDuration() {
        var _a;
        return (_a = this.durationV) !== null && _a !== void 0 ? _a : 600;
    }
}
export class BounceInRight extends BaseAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const delay = this.getDelay();
            const duration = this.getDuration();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [
                            {
                                translateX: delayFunction(delay, withSequence(withTiming(-20, { duration: duration * 0.55 }), withTiming(10, { duration: duration * 0.15 }), withTiming(-10, { duration: duration * 0.15 }), withTiming(0, { duration: duration * 0.15 }))),
                            },
                        ],
                    },
                    initialValues: {
                        transform: [{ translateX: width }],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new BounceInRight();
    }
    static getDuration() {
        return 600;
    }
    getDuration() {
        var _a;
        return (_a = this.durationV) !== null && _a !== void 0 ? _a : 600;
    }
}
export class BounceOut extends BaseAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const delay = this.getDelay();
            const duration = this.getDuration();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [
                            {
                                scale: delayFunction(delay, withSequence(withTiming(1.1, { duration: duration * 0.15 }), withTiming(0.9, { duration: duration * 0.15 }), withTiming(1.2, { duration: duration * 0.15 }), withTiming(0, { duration: duration * 0.55 }))),
                            },
                        ],
                    },
                    initialValues: {
                        transform: [{ scale: 1 }],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new BounceOut();
    }
    static getDuration() {
        return 600;
    }
    getDuration() {
        var _a;
        return (_a = this.durationV) !== null && _a !== void 0 ? _a : 600;
    }
}
export class BounceOutDown extends BaseAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const delay = this.getDelay();
            const duration = this.getDuration();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [
                            {
                                translateY: delayFunction(delay, withSequence(withTiming(-10, { duration: duration * 0.15 }), withTiming(10, { duration: duration * 0.15 }), withTiming(-20, { duration: duration * 0.15 }), withTiming(height, {
                                    duration: duration * 0.55,
                                }))),
                            },
                        ],
                    },
                    initialValues: {
                        transform: [{ translateY: 0 }],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new BounceOutDown();
    }
    static getDuration() {
        return 600;
    }
    getDuration() {
        var _a;
        return (_a = this.durationV) !== null && _a !== void 0 ? _a : 600;
    }
}
export class BounceOutUp extends BaseAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const delay = this.getDelay();
            const duration = this.getDuration();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [
                            {
                                translateY: delayFunction(delay, withSequence(withTiming(10, { duration: duration * 0.15 }), withTiming(-10, { duration: duration * 0.15 }), withTiming(20, { duration: duration * 0.15 }), withTiming(-height, {
                                    duration: duration * 0.55,
                                }))),
                            },
                        ],
                    },
                    initialValues: {
                        transform: [{ translateY: 0 }],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new BounceOutUp();
    }
    static getDuration() {
        return 600;
    }
    getDuration() {
        var _a;
        return (_a = this.durationV) !== null && _a !== void 0 ? _a : 600;
    }
}
export class BounceOutLeft extends BaseAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const delay = this.getDelay();
            const duration = this.getDuration();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [
                            {
                                translateX: delayFunction(delay, withSequence(withTiming(10, { duration: duration * 0.15 }), withTiming(-10, { duration: duration * 0.15 }), withTiming(20, { duration: duration * 0.15 }), withTiming(-width, {
                                    duration: duration * 0.55,
                                }))),
                            },
                        ],
                    },
                    initialValues: {
                        transform: [{ translateX: 0 }],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new BounceOutLeft();
    }
    static getDuration() {
        return 600;
    }
    getDuration() {
        var _a;
        return (_a = this.durationV) !== null && _a !== void 0 ? _a : 600;
    }
}
export class BounceOutRight extends BaseAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const delay = this.getDelay();
            const duration = this.getDuration();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [
                            {
                                translateX: delayFunction(delay, withSequence(withTiming(-10, { duration: duration * 0.15 }), withTiming(10, { duration: duration * 0.15 }), withTiming(-20, { duration: duration * 0.15 }), withTiming(width, {
                                    duration: duration * 0.55,
                                }))),
                            },
                        ],
                    },
                    initialValues: {
                        transform: [{ translateX: 0 }],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new BounceOutRight();
    }
    static getDuration() {
        return 600;
    }
    getDuration() {
        var _a;
        return (_a = this.durationV) !== null && _a !== void 0 ? _a : 600;
    }
}
