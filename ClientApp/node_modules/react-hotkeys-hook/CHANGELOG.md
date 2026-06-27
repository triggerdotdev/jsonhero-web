## [2.2.1] - 23-Jul-2020
* Remove deprecated findDOMNode
* Added useIsHotkeyPressed hook.

## [2.2.0] - 23-Jul-2020
* Return ref to scope hotkey
* Fixed test for scopable ref feature

## [2.1.4] - 30-Jun-2020
* added updated readme to docz
* Update README to reflect lack of filter scoping

## [2.1.3] - 16-Apr-2020
* Code cleanup
* Overloaded function type, so that options does not have to be set when deps is used only.

## [2.1.2] - 13-Apr-2020
* Added tests

## [2.1.1] - 05-Apr-2020
* Fixed bug in 2.1.0 that every filter returns false that has no available tags given.

## [2.1.0] - 04-Apr-2020
* Added filter implementation

## [2.0.1] - 04-Apr-2020
* Update readme
* Fixed Option Type

## [2.0.0] - 04-Apr-2020
* BC: Added more options Swapped deps and options param. Updated docz.

## [1.6.1] - 27-Mar-2020
* Directly use KeyHandler type from hotkeys-js

## [1.6.0] - 09-Mar-2020
* Add options parameter to useHotkeys hook

## [1.5.4] - 09-Dec-2019
* Updated docz.

## [1.5.3] - 09-Sep-2019
* make sure only memoisedCallback is unbound

## [1.5.2] - 24-Aug-2019
* Update readme.
* Bump hotkeys version to 3.7.1

## [1.5.1] - 21-Jul-2019
* Update readme.

## [1.5.0] - 21-Jul-2019
* Callback gets memoised inside hook by default
* Add memo deps array as third argument to hook

## [1.4.0] - 03-Jun-2019
* Add callback to useEffect deps to allow update of hotkeys when callback changes
* This also fixes the stale state bug
* Bump hotkeys version to 3.6.11

## [1.3.4] - 11-May-2019
* Bump hotkeys version to 3.6.8

## [1.3.3] - 02-May-2019
* Removed console.logs
* tightened source
* Updated docz

## [1.3.0] - 06-Apr-2019
* Fixed bind and unbind on every render
* Updated docz to make it work with the new deps array

## [1.2.0] - 30-Mar-2019
* Updated hotkeys
* Support for hotkeys 3.6
* Fixed typos in docz

## [1.1.1] - 20-Feb-2019
* Updated examples in readme.md

## [1.1.0] - 20-Feb-2019
* BC: Renamed `useHotKeys` to `useHotkeys` to keep it identical with the hotkeys package
* Switched to docz for documentation
* Switched to pika for packaging and publishing

## [1.0.3] - 13-Feb-2019
* Bumped up hotkeys-js version to 3.4.4

## [1.0.2] - 07-Feb-2019
* Bumped up hotkeys-js version

## [1.0.1] - 07-Feb-2019
* Bumped peerDependencies for react and react-dom
* Cleaned up repository

## [0.1.2] - 15-Jan-2019
* Initial release