/**
 * @description 放 MacBook 浏览器
 */

import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface BrowserWindowProps {
  children: React.ReactNode;
  url?: string;
  className?: string;
  bodyStyle?: React.CSSProperties;
}

const BrowserWindow: React.FC<BrowserWindowProps> = (props) => {
  const { children, url = 'http://localhost:3000', className, bodyStyle } = props;

  return (
    <div className={clsx(className, styles.browserWindow)}>
      {/* header */}
      <div className={clsx('flex items-center py-2 px-4', styles.browserWindowHeader)}>
        <div>
          <span className={styles.dot} style={{ background: '#f25f58' }} />
          <span className={styles.dot} style={{ background: '#fbbe3c' }} />
          <span className={styles.dot} style={{ background: '#58cb42' }} />
        </div>
        <div className={clsx('text-xs ml-2 mr-4', styles.browserWindowAddressBar)}>{url}</div>
        <div className={styles.browserWindowMenuIcon}>
          <div>
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </div>
        </div>
      </div>

      {/* body */}
      <div style={bodyStyle} className={styles.browserWindowBody}>
        {children}
      </div>
    </div>
  );
};

export default BrowserWindow;
