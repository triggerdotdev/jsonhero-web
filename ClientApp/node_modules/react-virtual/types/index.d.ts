type ScrollAlignment = 'start' | 'center' | 'end' | 'auto'

interface ScrollToOptions {
  align: ScrollAlignment
}

interface ScrollToOffsetOptions extends ScrollToOptions {}
interface ScrollToIndexOptions extends ScrollToOptions {}

type Key = number | string

export type VirtualItem = {
  key: Key
  index: number
  start: number
  end: number
  size: number
  measureRef: (el: HTMLElement | null) => void
}

export interface Range {
  start: number
  end: number
  overscan: number
  size: number
}

declare function defaultRangeExtractor(range: Range): number[]

interface Rect {
  width: number
  height: number
}

export interface Options<T> {
  size: number
  parentRef: React.RefObject<T>
  estimateSize?: (index: number) => number
  overscan?: number
  horizontal?: boolean
  scrollToFn?: (
    offset: number,
    defaultScrollToFn?: (offset: number) => void
  ) => void
  paddingStart?: number
  paddingEnd?: number
  useObserver?: (ref: React.RefObject<T>, initialRect?: Rect) => Rect
  initialRect?: Rect
  keyExtractor?: (index: number) => Key
  onScrollElement?: React.RefObject<HTMLElement>
  scrollOffsetFn?: (event?: Event) => number
  rangeExtractor?: (range: Range) => number[]
}

declare function useVirtual<T>(options: Options<T>): {
  virtualItems: VirtualItem[]
  totalSize: number
  scrollToOffset: (index: number, options?: ScrollToOffsetOptions) => void
  scrollToIndex: (index: number, options?: ScrollToIndexOptions) => void
  measure: () => void
}

export { defaultRangeExtractor, useVirtual }
