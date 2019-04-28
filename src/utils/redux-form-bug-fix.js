import React from "react";

/**
 * HOLY SHIT!
 * A random field must be added to initialValues,
 * otherwise it won't initialize when
 * the values in initialValues are equal to the values of the
 * last initialValues.
 *
 * Form will only reinitialize if the values are DIFFERENT,
 * but that make no sense in my opinion.
 *
 * My use case:
 * When new props come in to the form I want to reset the form to these
 * values. "enableReinitialize" is not enough.
 */
export default Component => ({ initialValues, ...props }) => (
  <Component
    {...props}
    initialValues={{ ...initialValues, bugFix: Math.random() }}
    enableReinitialize
  />
);
