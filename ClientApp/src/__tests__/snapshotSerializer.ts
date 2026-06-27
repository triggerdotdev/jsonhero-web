export default {
  test(value: unknown) {
    return (
      typeof value === "object" &&
      value !== null &&
      String((value as { $$typeof?: symbol }).$$typeof) ===
        "Symbol(react.forward_ref)" &&
      typeof (value as { render?: unknown }).render === "function"
    );
  },
  serialize() {
    return "[Function]";
  },
};
