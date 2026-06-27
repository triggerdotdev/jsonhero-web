import { useConstant } from '../../utils/use-constant.mjs';
import { globalProjectionState } from './state.mjs';

var id = 1;
function useProjectionId() {
    return useConstant(function () {
        if (globalProjectionState.hasEverUpdated) {
            return id++;
        }
    });
}

export { useProjectionId };
