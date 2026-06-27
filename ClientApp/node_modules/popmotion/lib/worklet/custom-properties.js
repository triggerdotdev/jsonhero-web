const transforms = [
    {
        name: 'translate',
        syntax: 'length-percentage',
        initial: '0px'
    },
    {
        name: 'scale',
        syntax: 'number',
        initial: 1
    },
    {
        name: 'rotate',
        syntax: 'angle',
        initial: '0deg'
    }
];
const axes = ['x', 'y', 'z'];
const customProperties = [];
transforms.forEach(({ name, syntax, initial }) => {
    customProperties.push({ name, syntax, initial });
    axes.forEach(axis => customProperties.push({
        name: `${name}-${axis}`,
        syntax,
        initial
    }));
});
export function namespace(name) {
    return `--pm-${name}`;
}
export function registerCustomProperties() {
    customProperties.forEach(({ name, syntax, initial }) => {
        CSS.registerProperty({
            name: namespace(name),
            syntax: `<${syntax}>`,
            inherits: false,
            initialValue: initial
        });
    });
}
//# sourceMappingURL=custom-properties.js.map