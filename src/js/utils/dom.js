const getIdFromChild = (node) => {
  if (!node.id) {
    return getIdFromChild(node.parentNode);
  }
  return node.id;
};

export default getIdFromChild;
