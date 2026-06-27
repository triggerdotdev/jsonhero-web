import { warnOnce } from '../../utils/warn-once.mjs';
import { useScroll } from '../use-scroll.mjs';

function useViewportScroll() {
    warnOnce(false, "useViewportScroll is deprecated. Convert to useScroll().");
    return useScroll();
}

export { useViewportScroll };
