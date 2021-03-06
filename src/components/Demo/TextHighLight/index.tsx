/**
 * @description ð Index.tsx
 */

import React, { useState } from 'react';
import { Input } from '@arco-design/web-react';
import { debounce } from 'lodash'; // é²æå½æ°

/**
 * @description å¤çé«äº®æå­ç æ¹æ³
 * @param string - è¦é«äº®çæå­
 * @param words - ææ¬åå®¹
 * @returns
 */
const HighlightFunc = (string: string[] = [], words: string) => {
  if (!string[0]) return <span>{words}</span>; // '|' æ²¡ä½ç¨ï¼åç©ºå¼ï¼éå·ä¸æ ·

  const reg = new RegExp(string.join('|'), 'g'); // å¾å° /.../g çæ­£å

  // å°åå®¹ä¸­çå¹éå°çæå­æ¿æ¢æ #@æå­...# çæ ¼å¼
  const token = words.replace(reg, '#@$&#'); // $& è¡¨ç¤ºä¸æ­£åå¹éå°çå¨é¨ææ¬

  // éååå®¹ææ¬ï¼éè¿ # è¿è¡åå²ï¼åéè¿ @ è¿è¡å¤æ­ï¼åæ¿æ¢
  const elements = token
    .split('#')
    .map((x) =>
      x[0] === '@' ? React.createElement('span', { style: { color: '#F53F3F' } }, x.slice(1)) : x
    );
  return React.createElement('span', null, ...elements);
};

const text = `ä¸åè¥æ°´ãæ°´åå©ä¸ç©èä¸äºï¼å¤ä¼äººä¹ææ¶ï¼wÃ¹ï¼ï¼æå ï¼jÄ«ï¼äºéã\nå±åå°ï¼å¿åæ¸ï¼ä¸åä»ï¼è¨åä¿¡ï¼æ­£åæ²»ï¼äºåè½ï¼å¨åæ¶ãå¤«å¯ä¸äºï¼ææ å°¤ã- ãèå­éå¾·ç»ã`;

const TextHighLight: React.FC = () => {
  const [textRender, setTextRender] = useState<JSX.Element>(<span>{text}</span>);

  const handleChange = (val) => {
    debounceValue(val);
  };

  // ä½¿ç¨é²æ
  const debounceValue = debounce((val) => {
    const render = HighlightFunc([val], text);
    setTextRender(render);
  }, 500);

  return (
    <>
      <Input placeholder='è¾å¥æå®æå­' style={{ width: '55%' }} onChange={handleChange} />
      <pre style={{ marginTop: 16, marginBottom: 0 }}>
        {textRender}
        <br />
        <a href='https://www.daodejing.org/8.html' target='_blank' className='inline-block mt-6'>
          è¯æ
        </a>
      </pre>
    </>
  );
};

export default TextHighLight;
