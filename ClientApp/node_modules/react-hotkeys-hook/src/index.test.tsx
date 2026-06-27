import React from 'react';
import { useHotkeys } from './index';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import hotkeys from 'hotkeys-js';

const HotkeysOnInput = ({ onPress, useTags }: { onPress: () => void, useTags?: boolean }) => {
  useHotkeys('a', onPress, { enableOnTags: useTags ? ['INPUT'] : undefined });

  return (
    <input type='text' data-testid={'input'} />
  );
};

const HotkeysFilteredOnInput = ({ onPress, useTags }: { onPress: () => void, useTags?: boolean }) => {
  useHotkeys('a', onPress, { enableOnTags: useTags ? ['TEXTAREA'] : undefined });

  return (
    <input type='text' data-testid={'input'} />
  );
};

const HotkeysOnKeyup = ({ onPress, keyup, keydown }: { onPress: () => void, keyup?: boolean, keydown?: boolean }) => {
  useHotkeys('a', onPress, { keyup, keydown });

  return (
    <input type='text' data-testid={'input'} />
  );
};

const HotkeysWithRef = ({ onPress }: { onPress: () => void }) => {
  const ref = useHotkeys<HTMLElement>('a', onPress);

  return (
    <section ref={ref} tabIndex={0} data-testid={'container'}>
      <input type='text' data-testid={'input'} />
    </section>
  );
};

test('useHotkeys should only fire when element is focused if a ref is set.', () => {
  const onPress = jest.fn();

  render(<HotkeysWithRef onPress={onPress} />);

  userEvent.keyboard('A');

  expect(onPress).not.toBeCalled();

  userEvent.click(screen.getByTestId('container'));
  userEvent.keyboard('A');

  expect(onPress).toBeCalled();
});

test('useHotkeys should listen to key presses', () => {
  const callback = jest.fn();

  renderHook(() => useHotkeys('a', callback));

  userEvent.keyboard('A');

  expect(callback).toHaveBeenCalledTimes(1);
});

test('useHotkeys correctly assign deps when used as third argument and options being omitted', async () => {
  let count = 0;
  const callback = jest.fn();

  renderHook(() => useHotkeys('a', () => callback(++count), [count]));

  userEvent.keyboard('A');

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback.mock.calls[0][0]).toEqual(1);

  userEvent.keyboard('A');

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback.mock.calls[1][0]).toEqual(2);
});

test('useHotkeys should use correct char to split combinations', () => {
  const callback = jest.fn();

  renderHook(() => useHotkeys('Shift-A', callback, { splitKey: '-' }));

  userEvent.keyboard('{Shift>}A{/Shift}');

  expect(callback).toHaveBeenCalledTimes(1);

  userEvent.keyboard('{Shift>}A{/Shift}');

  expect(callback).toHaveBeenCalledTimes(2);
});

test('useHotkeys should use correctly assign options and deps argument when using all four arguments', () => {
  const callback = jest.fn();

  renderHook(() => useHotkeys('shift-a', callback, { splitKey: '-' }, []));

  userEvent.keyboard('{Shift>}A{/Shift}');

  expect(callback).toHaveBeenCalledTimes(1);

  userEvent.keyboard('{Shift>}A{/Shift}');

  expect(callback).toHaveBeenCalledTimes(2);

  userEvent.keyboard('{Shift>}A{/Shift}');

  expect(callback).toHaveBeenCalledTimes(3);
});

test('useHotkeys should only trigger once if neither keyup nor keydown are set', () => {
  const onPress = jest.fn();

  render(<HotkeysOnKeyup onPress={onPress} />);

  fireEvent.keyUp(document.body, { key: 'a', keyCode: 65 });

  expect(onPress).not.toHaveBeenCalled();

  fireEvent.keyDown(document.body, { key: 'a', keyCode: 65 });

  expect(onPress).toHaveBeenCalled();
});

test('useHotkeys should only trigger once if keyup is set and keydown is not', () => {
  const onPress = jest.fn();

  render(<HotkeysOnKeyup onPress={onPress} keyup={true} />);

  fireEvent.keyDown(document.body, { key: 'a', keyCode: 65 });

  expect(onPress).not.toHaveBeenCalled();

  fireEvent.keyUp(document.body, { key: 'a', keyCode: 65 });

  expect(onPress).toHaveBeenCalled();
});

test('useHotkeys should trigger twice if keyup and keydown is set to true', () => {
  let called = false;

  render(<HotkeysOnKeyup onPress={() => called = true} keyup={true} keydown={true} />);

  userEvent.keyboard('A');

  expect(called).toBe(true);

  userEvent.keyboard('A');

  expect(called).toBe(true);
});

test('useHotkeys should be enabled on given form tags', async () => {
  const onPress = jest.fn();
  render(<HotkeysOnInput onPress={onPress} useTags={true} />);

  const input = document.querySelector('input');

  expect(input).not.toBe(null);

  userEvent.keyboard('A');

  expect(onPress).toHaveBeenCalled();
});

test('useHotkeys should not be enabled on given form tags when filter specifies different input field', async () => {
  const onPress = jest.fn();
  render(<HotkeysFilteredOnInput onPress={onPress} useTags={true} />);

  userEvent.type(screen.getByRole('textbox'), 'A');

  expect(onPress).toHaveBeenCalledTimes(0);
});

test('useHotkeys should not be enabled on given form tags when tags is not set', async () => {
  const onPress = jest.fn();
  render(<HotkeysFilteredOnInput onPress={onPress} useTags={false} />);

  userEvent.type(screen.getByRole('textbox'), 'A');

  expect(onPress).toHaveBeenCalledTimes(0);
});

test('useHotkeys should use its own custom filter system instead of the global hotkeys one', () => {
  const callback = jest.fn();
  const { rerender } = renderHook((returnFilterVal: boolean = false) => useHotkeys('a', callback, { filter: () => returnFilterVal }));

  userEvent.keyboard('A');

  expect(callback).not.toHaveBeenCalled();

  rerender(true);

  userEvent.keyboard('A');

  expect(callback).toHaveBeenCalledTimes(1);
});

test('useHotkeys should not be enabled when enabled flag is set to false', () => {
  const callback = jest.fn();

  const { rerender } = renderHook((enabled: boolean = false) => useHotkeys('a', callback, { enabled }));

  userEvent.keyboard('A');

  expect(callback).not.toHaveBeenCalled();

  rerender(true);

  userEvent.keyboard('A');

  expect(callback).toHaveBeenCalledTimes(1);
});

test('useHotkeys should unbind the hotkey when enabled is set from true to false', () => {
  hotkeys.unbind = jest.fn();

  const { rerender } = renderHook((enabled: boolean = true) => useHotkeys('a', () => true, { enabled }));

  expect(hotkeys.unbind).not.toHaveBeenCalled()

  rerender(false);

  expect(hotkeys.unbind).toHaveBeenCalledTimes(2)
})