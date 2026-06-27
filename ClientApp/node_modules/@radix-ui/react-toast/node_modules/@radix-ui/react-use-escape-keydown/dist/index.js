var $b0gz3$react = require("react");
var $b0gz3$radixuireactusecallbackref = require("@radix-ui/react-use-callback-ref");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "useEscapeKeydown", () => $24c84e9f83c4454f$export$3a72a57244d6e765);


/**
 * Listens for when the escape key is down
 */ function $24c84e9f83c4454f$export$3a72a57244d6e765(onEscapeKeyDownProp) {
    const onEscapeKeyDown = $b0gz3$radixuireactusecallbackref.useCallbackRef(onEscapeKeyDownProp);
    $b0gz3$react.useEffect(()=>{
        const handleKeyDown = (event)=>{
            if (event.key === 'Escape') onEscapeKeyDown(event);
        };
        document.addEventListener('keydown', handleKeyDown);
        return ()=>document.removeEventListener('keydown', handleKeyDown)
        ;
    }, [
        onEscapeKeyDown
    ]);
}




//# sourceMappingURL=index.js.map
