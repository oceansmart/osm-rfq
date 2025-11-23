import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebar}>{/* Sidebar content */}</aside>
      <div className={styles.mainWrapper}>
        {/* Header - Figma 노드: 166:9842 (1640 × 64px) */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            {/* Breadcrumbs */}
            <div className={styles.breadcrumbs}>
              <button className={styles.hamburgerMenu}>
                <Image
                  src="/icons/layout/hamburger_close.svg"
                  alt="Menu"
                  width={20}
                  height={20}
                />
              </button>
              <nav className={styles.breadcrumbNav}>
                <span className={styles.breadcrumbItem}>
                  <Image
                    src="/icons/layout/home.svg"
                    alt="Home"
                    width={20}
                    height={20}
                    className={styles.breadcrumbIcon}
                  />
                  ex
                </span>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbItem}>Breadcrumb item 2</span>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbItem}>...</span>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbItem}>Breadcrumb item (n-1)</span>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbItem}>Current page</span>
              </nav>
            </div>

            {/* Avatar - Figma 노드: 166:9846 (32 × 32px) */}
            <div className={styles.avatar}>
              <div className={styles.avatarCircle}>
                <Image
                  src="/icons/layout/icon.svg"
                  alt="User"
                  width={18}
                  height={22}
                  className={styles.avatarIcon}
                />
                <div className={styles.avatarIndicator}>
                  <Image
                    src="/icons/layout/Avatar indicator.svg"
                    alt=""
                    width={10}
                    height={10}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}
