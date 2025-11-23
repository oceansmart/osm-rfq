import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layoutContainer}>
      {/* Sidebar - Figma 노드: 157:9252 (280 × 1079px) */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarInner}>
          {/* Logo Container */}
          <div className={styles.logoContainer}>
            {/* Logo - Figma: 248 × 51.95px */}
            <div className={styles.logo}>
              <Image
                src="/images/layout/cargo buddy 디자인 시안 1.png"
                alt="Cargo Buddy Logo"
                width={248}
                height={52}
                className={styles.logoImage}
              />
            </div>

            {/* Search Bar - Figma: 248 × 34px */}
            <div className={styles.searchBar}>
              <div className={styles.searchIcon}>
                <Image
                  src="/icons/layout/side-bar/Search.svg"
                  alt="Search"
                  width={16}
                  height={16}
                />
              </div>
              <span className={styles.searchText}>Search </span>
            </div>
          </div>

          {/* Menu Container */}
          <div className={styles.menuContainer}>
            {/* Division - Main Menu */}
            <div className={styles.division}>
              <span className={styles.divisionText}>Main Menu</span>
            </div>

            {/* Menu Items */}
            <div className={styles.menuItems}>
              {/* Home - Active */}
              {/* Note: Badge, Arrow, Indicator는 Figma에서 visible: false로 설정되어 있으나, 
                  디자인상 표시되어야 하는 경우가 있으므로 CSS로 제어 */}
              <div className={`${styles.navTab} ${styles.navTabActive}`}>
                <div className={styles.navIcon}>
                  <Image
                    src="/icons/layout/side-bar/Home Icon.svg"
                    alt="Home"
                    width={24}
                    height={24}
                  />
                </div>
                <span className={styles.navText}>Home</span>
                {/* Badge - Figma에서 visible: false이지만 디자인상 필요시 표시 */}
                <div className={`${styles.badge} ${styles.badgeHidden}`}>
                  <span className={styles.badgeText}>47</span>
                </div>
                {/* Arrow - Figma에서 visible: false */}
                <div className={`${styles.navArrow} ${styles.navArrowHidden}`}>
                  <Image
                    src="/icons/layout/side-bar/git-pull-request.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </div>
                {/* Indicator - Figma에서 visible: false */}
                <div className={`${styles.navIndicator} ${styles.navIndicatorHidden}`}>
                  <div className={styles.indicatorDot}></div>
                </div>
              </div>

              {/* Dashboard - Badge, Arrow, Indicator는 Figma에서 visible: false */}
              <div className={styles.navTab}>
                <div className={styles.navIcon}>
                  <Image
                    src="/icons/layout/side-bar/Dashboard Icon.svg"
                    alt="Dashboard"
                    width={24}
                    height={24}
                  />
                </div>
                <span className={styles.navText}>Dashboard</span>
                <div className={`${styles.badge} ${styles.badgeHidden}`}>
                  <span className={styles.badgeText}>47</span>
                </div>
                <div className={`${styles.navArrow} ${styles.navArrowHidden}`}>
                  <Image
                    src="/icons/layout/side-bar/git-pull-request.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={`${styles.navIndicator} ${styles.navIndicatorHidden}`}>
                  <div className={styles.indicatorDot}></div>
                </div>
              </div>

              {/* RFQ Management - Badge, Arrow, Indicator 없음 (Figma 구조) */}
              <div className={styles.navTab}>
                <div className={styles.navIcon}>
                  <Image
                    src="/icons/layout/side-bar/Document.svg"
                    alt="RFQ Management"
                    width={24}
                    height={24}
                  />
                </div>
                <span className={styles.navText}>RFQ Management</span>
              </div>

              {/* Bidding - Arrow, Indicator는 Figma에서 visible: false */}
              <div className={styles.navTab}>
                <div className={styles.navIcon}>
                  <Image
                    src="/icons/layout/side-bar/Bidding Icon.svg"
                    alt="Bidding"
                    width={24}
                    height={24}
                  />
                </div>
                <span className={styles.navText}>Bidding</span>
                <div className={`${styles.navArrow} ${styles.navArrowHidden}`}>
                  <Image
                    src="/icons/layout/side-bar/git-pull-request.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={`${styles.navIndicator} ${styles.navIndicatorHidden}`}>
                  <div className={styles.indicatorDot}></div>
                </div>
              </div>

              {/* Negotiation - Arrow, Indicator는 Figma에서 visible: false */}
              <div className={styles.navTab}>
                <div className={styles.navIcon}>
                  <Image
                    src="/icons/layout/side-bar/Negotiation Icon.svg"
                    alt="Negotiation"
                    width={24}
                    height={24}
                  />
                </div>
                <span className={styles.navText}>Negotiation</span>
                <div className={`${styles.navArrow} ${styles.navArrowHidden}`}>
                  <Image
                    src="/icons/layout/side-bar/git-pull-request.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={`${styles.navIndicator} ${styles.navIndicatorHidden}`}>
                  <div className={styles.indicatorDot}></div>
                </div>
              </div>

              {/* Analytics - Arrow, Indicator는 Figma에서 visible: false */}
              <div className={styles.navTab}>
                <div className={styles.navIcon}>
                  <Image
                    src="/icons/layout/side-bar/Analytics Icon.svg"
                    alt="Analytics"
                    width={24}
                    height={24}
                  />
                </div>
                <span className={styles.navText}>Analytics</span>
                <div className={`${styles.navArrow} ${styles.navArrowHidden}`}>
                  <Image
                    src="/icons/layout/side-bar/git-pull-request.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={`${styles.navIndicator} ${styles.navIndicatorHidden}`}>
                  <div className={styles.indicatorDot}></div>
                </div>
              </div>

              {/* Divider */}
              <div className={styles.menuDivider}></div>

              {/* Master Data - Arrow, Indicator는 Figma에서 visible: false */}
              <div className={styles.navTab}>
                <div className={styles.navIcon}>
                  <Image
                    src="/icons/layout/side-bar/Document.svg"
                    alt="Master Data"
                    width={24}
                    height={24}
                  />
                </div>
                <span className={styles.navText}>Master Data</span>
                <div className={`${styles.navArrow} ${styles.navArrowHidden}`}>
                  <Image
                    src="/icons/layout/side-bar/git-pull-request.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={`${styles.navIndicator} ${styles.navIndicatorHidden}`}>
                  <div className={styles.indicatorDot}></div>
                </div>
              </div>

              {/* Admin - Arrow, Indicator는 Figma에서 visible: false */}
              <div className={styles.navTab}>
                <div className={styles.navIcon}>
                  <Image
                    src="/icons/layout/side-bar/Admin Icon.svg"
                    alt="Admin"
                    width={24}
                    height={24}
                  />
                </div>
                <span className={styles.navText}> Admin</span>
                <div className={`${styles.navArrow} ${styles.navArrowHidden}`}>
                  <Image
                    src="/icons/layout/side-bar/git-pull-request.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={`${styles.navIndicator} ${styles.navIndicatorHidden}`}>
                  <div className={styles.indicatorDot}></div>
                </div>
              </div>

              {/* Notifications - Arrow, Indicator는 Figma에서 visible: false */}
              <div className={styles.navTab}>
                <div className={styles.navIcon}>
                  <Image
                    src="/icons/layout/side-bar/Notification.svg"
                    alt="Notifications"
                    width={24}
                    height={24}
                  />
                </div>
                <span className={styles.navText}>Notifications</span>
                <div className={`${styles.badge} ${styles.badgeNotification}`}>
                  <span className={styles.badgeText}>8</span>
                </div>
                <div className={`${styles.navArrow} ${styles.navArrowHidden}`}>
                  <Image
                    src="/icons/layout/side-bar/git-pull-request.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={`${styles.navIndicator} ${styles.navIndicatorHidden}`}>
                  <div className={styles.indicatorDot}></div>
                </div>
              </div>

              {/* More - Arrow, Indicator는 Figma에서 visible: false */}
              <div className={styles.navTab}>
                <div className={styles.navIcon}>
                  <Image
                    src="/icons/layout/side-bar/More Circle.svg"
                    alt="More"
                    width={24}
                    height={24}
                  />
                </div>
                <span className={styles.navText}>More</span>
                <div className={`${styles.navArrow} ${styles.navArrowHidden}`}>
                  <Image
                    src="/icons/layout/side-bar/git-pull-request.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={`${styles.navIndicator} ${styles.navIndicatorHidden}`}>
                  <div className={styles.indicatorDot}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Container */}
          <div className={styles.footerContainer}>
            {/* Theme Toggle */}
            <div className={styles.themeToggle}>
              <div className={styles.themeToggleSun}>
                <Image
                  src="/icons/layout/side-bar/sun.svg"
                  alt="Light Mode"
                  width={14}
                  height={14}
                />
              </div>
              <div className={styles.themeToggleMoon}>
                <Image
                  src="/icons/layout/side-bar/moon.svg"
                  alt="Dark Mode"
                  width={14}
                  height={14}
                />
              </div>
            </div>

            {/* Help Icon */}
            <div className={styles.helpIcon}>
              <Image
                src="/icons/layout/side-bar/Help Icon.svg"
                alt="Help"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      </aside>

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
