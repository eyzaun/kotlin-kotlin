import { vscDarkPlus, vs, ghcolors, dracula, materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const prismThemes = {
  vscDarkPlus,
  vs,
  ghcolors,
  dracula,
  materialDark,
  materialLight,
};

export const buildThemeWithFont = (themeObj, fontSize) => {
  const merged = { ...themeObj };
  const preKeys = ['pre[class*"language-"]', 'pre[class*="language-"]'];
  const codeKeys = ['code[class*"language-"]', 'code[class*="language-"]'];
  const find = (keys) => keys.find(k => Object.prototype.hasOwnProperty.call(merged, k));
  const pk = find(preKeys);
  const ck = find(codeKeys);
  if (pk) merged[pk] = { ...(merged[pk] || {}), fontSize: `${fontSize}px` };
  else merged['pre[class*="language-"]'] = { fontSize: `${fontSize}px` };
  if (ck) merged[ck] = { ...(merged[ck] || {}), fontSize: `${fontSize}px` };
  else merged['code[class*="language-"]'] = { fontSize: `${fontSize}px` };
  return merged;
};

export const codeWrapperStyle = (fontSize) => ({
  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
  lineHeight: '1.4',
  fontSize: `${fontSize}px`,
});

