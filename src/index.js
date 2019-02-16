function assertDefined(obj) {
  if (obj === undefined) {
    throw new TypeError('selectors Cannot be undefined');
  }
}
export function createSelector(selectors, transform) {
  let cache = [];
  let oldTransformVal;

  return function(state, ownProps) {
    let shouldTransform = false;

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
    return oldTransformVal;
  };
}
