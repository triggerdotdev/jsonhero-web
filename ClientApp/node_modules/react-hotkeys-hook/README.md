<hr>
<div align="center">
  <h1 align="center">
    useHotkeys(key, handler)
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=react-hotkeys-hook">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/react-hotkeys-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/react-hotkeys-hook">
    <img alt="Types" src="https://img.shields.io/npm/types/react-use-system-color-mode?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/react-hotkeys-hook">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/react-hotkeys-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/react-hotkeys-hook?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<p align="center">
  <a aria-label="Sponsored by Spaceteams" href="https://spaceteams.de">
    <img alt="Sponsored by Spaceteams" src="https://raw.githubusercontent.com/spaceteams/badges/main/sponsored-by-spaceteams.svg">
  </a>
</p>

<pre align="center">npm i react-hotkeys-hook</pre>

<p align="center">
A React hook for using keyboard shortcuts in components.
</p>

<hr>

## Quick Start

```jsx harmony
import { useHotkeys } from 'react-hotkeys-hook'

export const ExampleComponent = () => {
  const [count, setCount] = useState(0)
  useHotkeys('ctrl+k', () => setCount(prevCount => prevCount + 1))

  return (
    <p>
      Pressed {count} times.
    </p>
  )
}
```

The hook takes care of all the binding and unbinding for you.
As soon as the component mounts into the DOM, the key stroke will be
listened to. When the component unmounts it will stop listening.

## Documentation & Live Examples

* [Quick Start](https://react-hotkeys-hook.vercel.app/docs/intro)
* [Documentation](https://react-hotkeys-hook.vercel.app/docs/documentation/installation)
* [API](https://react-hotkeys-hook.vercel.app/docs/api/use-hotkeys)

## [Join the discussion for version 4!](https://github.com/JohannesKlauss/react-hotkeys-hook/issues/574)

If you use this package please share your thoughts on how we can improve this hook with version 4.
Please engage at the corresponding [Github issue](https://github.com/JohannesKlauss/react-hotkeys-hook/issues/574).

## API

### useHotkeys()

```typescript
useHotkeys(keys: string, callback: (event: KeyboardEvent, handler: HotkeysEvent) => void, options: Options = {}, deps: any[] = [])
```

### Parameters
- `keys: string`: Here you can set the key strokes you want the hook to listen to. You can use single or multiple keys,
  modifier combination, etc. See [this](https://github.com/jaywcjlove/hotkeys/#defining-shortcuts)
  section on the hotkeys documentation for more info.
- `callback: (event: KeyboardEvent, handler: HotkeysEvent) => void`: Gets executed when the defined keystroke
  gets hit by the user. **Important:** Since version 1.5.0 this callback gets memoised inside the hook. So you don't have
  to do this anymore by yourself.
- `options: Options = {}`
  - `filter: (event: KeyboardEvent): boolean` is used to filter if a callback gets triggered depending on the keyboard event.
    **Breaking Change in `3.0.0`!** Prior to version `3.0.0` the filter settings was one global setting that applied to every
    hook. Since `3.0.0` this behavior changed. The `filter` option is now locally scoped to each call of `useHotkeys`.
  - `filterPreventDefault: boolean` is used to prevent/allow the default browser behavior for the keystroke when the filter return false (default value: `true`)
  - `enableOnTags: string[]` is used to enable listening to hotkeys in form fields. Available values are `INPUT`, `TEXTAREA` and `SELECT`.
  - `splitKey: string` is used to change the splitting character inside the keys argument. Default is `+`, but if you want
    to listen to the `+` character, you can set `splitKey` to i.e. `-` and listen for `ctrl-+`
  - `keyup: boolean` Determine if you want to listen on the keyup event
  - `keydown: boolean` Determine if want to listen on the keydown event
  - `enabled: boolean` is used to prevent installation of the hotkey when set to false (default value: `true`)
- `deps: any[] = []`: The dependency array that gets appended to the memoisation of the callback. Here you define the inner
  dependencies of your callback. If for example your callback actions depend on a referentially unstable value or a value
  that will change over time, you should add this value to your deps array. Since most of the time your callback won't
  depend on any unstable callbacks or changing values over time you can leave this value alone since it will be set to an
  empty array by default. See the [Memoisation](#memoisation) section to
  learn more and see an example where you have to set this array.

### `isHotkeyPressed` function

This function allows us to check if the user is currently pressing down a key.

```ts
import { isHotkeyPressed } from 'react-hotkeys-hook'

isHotkeyPressed('return') // Returns true if Return key is pressed down.
```

## Support

* Ask your question in the [Github Discussions]([Support](https://github.com/JohannesKlauss/react-hotkeys-hook/discussions))
* Ask your question on [StackOverflow](https://stackoverflow.com/search?page=1&tab=Relevance&q=react-hotkeys-hook)

## Found an issue or have a feature request?

Open up an [issue](https://github.com/JohannesKlauss/react-hotkeys-hook/issues/new)
or [pull request](https://github.com/JohannesKlauss/react-hotkeys-hook/compare) and participate.

## Local Development

Checkout this repo, run `yarn` or `npm i` and then run the `test` script to test the behavior of the hook.

## Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Johannes Klauss - [@JohannesKlauss](https://github.com/JohannesKlauss) - klauss.johannes@gmail.com

Project Link: [https://github.com/JohannesKlauss/react-hotkeys-hook](https://github.com/JohannesKlauss/react-use-system-color-mode)

## Contributors

* [bernatmv](https://github.com/bernatmv)
* [wheeler](https://github.com/wheeler)
* [louisrli](https://github.com/louisrli)
* [jameschao](https://github.com/jameschao)
* [hmafzal](https://github.com/hmafzal)
* [godspeedelbow](https://github.com/godspeedelbow)
* [JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)
* [ggascoigne](https://github.com/ggascoigne)
