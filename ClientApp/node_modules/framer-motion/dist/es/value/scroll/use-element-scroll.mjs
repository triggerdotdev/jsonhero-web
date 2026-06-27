import { warnOnce } from '../../utils/warn-once.mjs';
import { useScroll } from '../use-scroll.mjs';

function useElementScroll(ref) {
    warnOnce(false, "useElementScroll is deprecated. Convert to useScroll({ container: ref }).");
    return useScroll({ container: ref });
}

export { useElementScroll };
