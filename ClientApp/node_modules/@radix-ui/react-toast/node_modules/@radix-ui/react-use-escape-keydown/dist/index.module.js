import {useEffect as $hPSQ5$useEffect} from "react";
import {useCallbackRef as $hPSQ5$useCallbackRef} from "@radix-ui/react-use-callback-ref";



/**
 * Listens for when the escape key is down
 */ function $addc16e1bbe58fd0$export$3a72a57244d6e765(onEscapeKeyDownProp) {
    const onEscapeKeyDown = $hPSQ5$useCallbackRef(onEscapeKeyDownProp);
    $hPSQ5$useEffect(()=>{
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




export {$addc16e1bbe58fd0$export$3a72a57244d6e765 as useEscapeKeydown};
//# sourceMappingURL=index.module.js.map
