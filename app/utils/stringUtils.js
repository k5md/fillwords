export const getInitials = (name) => {
  const initials = Array.prototype.map
    .call(name.split(' '), x => x.substring(0, 1).toUpperCase())
    .join('');
  return initials.substring(0, 2);
};
