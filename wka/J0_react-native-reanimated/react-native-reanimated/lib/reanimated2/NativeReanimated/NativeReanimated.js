const InnerNativeModule = global.__reanimatedModuleProxy;
export class NativeReanimated {
    constructor(native = true) {
        this.native = native;
        this.useOnlyV1 = InnerNativeModule === null;
    }
    installCoreFunctions(valueSetter) {
        return InnerNativeModule.installCoreFunctions(valueSetter);
    }
    makeShareable(value) {
        return InnerNativeModule.makeShareable(value);
    }
    makeMutable(value) {
        return InnerNativeModule.makeMutable(value);
    }
    makeRemote(object = {}) {
        return InnerNativeModule.makeRemote(object);
    }
    startMapper(mapper, inputs = [], outputs = [], updater, viewDescriptors) {
        return InnerNativeModule.startMapper(mapper, inputs, outputs, updater, viewDescriptors);
    }
    stopMapper(mapperId) {
        return InnerNativeModule.stopMapper(mapperId);
    }
    registerEventHandler(eventHash, eventHandler) {
        return InnerNativeModule.registerEventHandler(eventHash, eventHandler);
    }
    unregisterEventHandler(id) {
        return InnerNativeModule.unregisterEventHandler(id);
    }
    getViewProp(viewTag, propName, callback) {
        return InnerNativeModule.getViewProp(viewTag, propName, callback);
    }
    enableLayoutAnimations(flag) {
        InnerNativeModule.enableLayoutAnimations(flag);
    }
}
