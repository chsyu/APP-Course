import { ComplexAnimationBuilder } from '../animationBuilder';
export class StretchInX extends ComplexAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const [animation, config] = this.getAnimationAndConfig();
            const delay = this.getDelay();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [{ scaleX: delayFunction(delay, animation(1, config)) }],
                    },
                    initialValues: {
                        transform: [{ scaleX: 0 }],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new StretchInX();
    }
}
export class StretchInY extends ComplexAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const [animation, config] = this.getAnimationAndConfig();
            const delay = this.getDelay();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [{ scaleY: delayFunction(delay, animation(1, config)) }],
                    },
                    initialValues: {
                        transform: [{ scaleY: 0 }],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new StretchInY();
    }
}
export class StretchOutX extends ComplexAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const [animation, config] = this.getAnimationAndConfig();
            const delay = this.getDelay();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [{ scaleX: delayFunction(delay, animation(0, config)) }],
                    },
                    initialValues: {
                        transform: [{ scaleX: 1 }],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new StretchOutX();
    }
}
export class StretchOutY extends ComplexAnimationBuilder {
    constructor() {
        super(...arguments);
        this.build = () => {
            const delayFunction = this.getDelayFunction();
            const [animation, config] = this.getAnimationAndConfig();
            const delay = this.getDelay();
            const callback = this.callbackV;
            return () => {
                'worklet';
                return {
                    animations: {
                        transform: [{ scaleY: delayFunction(delay, animation(0, config)) }],
                    },
                    initialValues: {
                        transform: [{ scaleY: 1 }],
                    },
                    callback: callback,
                };
            };
        };
    }
    static createInstance() {
        return new StretchOutY();
    }
}
