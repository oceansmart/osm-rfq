import { ReactNode } from 'react';
import styles from './styles.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout} data-testid="layout">
      {/* Header: 1640 * 64 (Figma Node: 157:9253) */}
      <header className={styles.header} data-testid="layout-header">
        {/* Header content will be implemented in UI phase */}
      </header>

      {/* Content Wrapper: Sidebar + Main Content */}
      <div className={styles.contentWrapper} data-testid="layout-content-wrapper">
        {/* Sidebar: 280 * 1079 (Figma Node: 157:9252) */}
        <aside className={styles.sidebar} data-testid="layout-sidebar">
          {/* Sidebar content will be implemented in UI phase */}
        </aside>

        {/* Main Content: 1640 * auto (Figma Node: 157:9648) */}
        <main className={styles.mainContent} data-testid="layout-main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
