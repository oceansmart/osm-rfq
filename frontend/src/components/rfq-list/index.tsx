import { SearchLg, HelpCircle, ChevronDown } from '@untitledui/icons';
import { ExcelIcon } from '@/commons/components/icons';
import styles from './styles.module.css';

export default function RfqList({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.gap1}></div>

      {/* Title Section */}
      <div className={styles.title}>
        <div className={styles.titleContainer}>
          {/* Text and supporting text */}
          <div className={styles.textContainer}>
            <h1 className={styles.titleText}>RFQ Management</h1>
            <p className={styles.supportingText}>
              Manage your team members and their account permissions here.
            </p>
          </div>
        </div>

        {/* Input with label */}
        <div className={styles.inputWithLabel}>
          <div className={styles.labelWrapper}>
            <label className={styles.label}>Search</label>
            <span className={styles.asterisk}>*</span>
            <HelpCircle size={16} className={styles.helpIcon} />
          </div>
          <div className={styles.inputBox}>
            <div className={styles.inputContent}>
              <SearchLg size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by RFQ ID, Shipper, Route ... "
                className={styles.inputText}
              />
            </div>
            <div className={styles.shortcutWrapper}>
              <span className={styles.shortcut}>⌘K</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          {/* Dropdown 1: All Status */}
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton}>
              <span className={styles.dropdownText}>All Status</span>
              <ChevronDown size={20} className={styles.dropdownIcon} />
            </button>
          </div>

          {/* Dropdown 2: All Shippers */}
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton}>
              <span className={styles.dropdownText}>All Shippers</span>
              <ChevronDown size={20} className={styles.dropdownIcon} />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Search Button */}
          <button className={styles.searchButton}>
            <span className={styles.buttonText}>Search</span>
          </button>

          {/* Download Button */}
          <button className={styles.downloadButton}>
            <ExcelIcon size={20} className={styles.excelIcon} />
            <span className={styles.buttonText}>Download</span>
          </button>
        </div>
      </div>

      <div className={styles.gap2}></div>

      {/* Horizontal Tabs */}
      <div className={styles.horizontalTabs}>
        <button className={`${styles.tabButton} ${styles.tabButtonActive}`}>
          <span className={styles.tabText}>All (20)</span>
        </button>
        <button className={styles.tabButton}>
          <span className={styles.tabText}>New (5)</span>
        </button>
        <button className={styles.tabButton}>
          <span className={styles.tabText}>In Progress (8)</span>
        </button>
        <button className={styles.tabButton}>
          <span className={styles.tabText}>Pending (3)</span>
        </button>
        <button className={styles.tabButton}>
          <span className={styles.tabText}>Completed (12)</span>
        </button>
      </div>

      <div className={styles.gap3}></div>
      <div className={styles.table}>테이블 영역</div>
      <div className={styles.gap4}></div>
      <div className={styles.pagination}>페이지네이션 영역</div>
      {children}
    </div>
  );
}
