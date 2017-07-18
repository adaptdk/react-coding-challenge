import PropTypes from 'prop-types';


const propTypeShapes = {
  bookItemShape: {
    id: PropTypes.number.isRequired,
    download_count: PropTypes.number.isRequired,
    formats: PropTypes.object,
  }
};

// applies PropTypes.shape HOF on runtime so we don't have to repeat ourselves above when defining a shape
const shapesWithPropTypesShapeHof = {};

for (let key in propTypeShapes) {
  shapesWithPropTypesShapeHof[key] = PropTypes.shape(propTypeShapes[key]);
}

export default shapesWithPropTypesShapeHof;
