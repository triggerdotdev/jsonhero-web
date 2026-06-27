import * as React from 'react';
import { StateChangeOptions } from '../';
declare type Item = string;
interface Props {
}
interface State {
    items: Array<Item>;
}
export default class App extends React.Component<Props, State> {
    state: State;
    onChange: (selectedItem: Item | null) => void;
    onUserAction: (changes: StateChangeOptions<Item>) => void;
    render(): JSX.Element;
}
export {};
