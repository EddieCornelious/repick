function assertDefined(obj) {
  if (obj === undefined) {
    throw new TypeError('selectors Cannot be undefined');
  }
}
export default function createSelector(selectors, transform) {
  let cache = [];
  let oldTransformVal;
  let shouldTransform = false;

  return function(state, ownProps) {
    if (oldTransformVal === undefined) {
      cache = selectors.map(e => e(state, ownProps));
      shouldTransform = true;
    }
    // check if anything changed
    const newVals = selectors.map(e => e(state, ownProps));

    for (let i = 0; i < cache.length; i += 1) {
      if (cache[i] !== newVals[i]) {
        cache[i] = newVals[i];
        shouldTransform = true;
      }
    }
    if (shouldTransform) {
      oldTransformVal = transform.apply(null, cache);
      assertDefined(oldTransformVal);
    }
    shouldTransform = false;
    return oldTransformVal;
  };
}
