export { default as reduxFormBugFix } from "./redux-form-bug-fix";

export const calcMod = (ability: number): string => {
  const diff = parseInt(ability, 10) - 10;
  const mod = Math.round((diff - 1) / 2);
  if (mod > 0) {
    return `+${mod}`;
  }
  if (mod === 0) {
    return ` ${mod}`;
  }
  return `${mod}`;
};
