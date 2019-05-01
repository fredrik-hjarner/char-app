export default (ability: string): string => {
  const diff = parseInt(ability, 10) - 10;
  return Math.round((diff - 1) / 2);
};
