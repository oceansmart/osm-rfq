import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

const ICON_PATH = '/icons/rfq-quotation-generator';

export const RFQQuotationGenerator = () => {
  return (
    <div className={styles.container}>
      {/* Title Section */}
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Quotation Generator</h1>
      </div>

      <div className={styles.contentWrapper}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          
          {/* Template Selection */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>Template Selection</span>
              <span className={styles.asterisk}>*</span>
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <div className={`${styles.tableCell} ${styles.headerCell} ${styles.colRfqId}`}>RFQ ID</div>
                <div className={`${styles.tableCell} ${styles.headerCell} ${styles.colSubmitted}`}>Submitted</div>
                <div className={`${styles.tableCell} ${styles.headerCell} ${styles.colDeadline}`}>Deadline</div>
                <div className={`${styles.tableCell} ${styles.headerCell} ${styles.colShipper}`}>Shipper</div>
                <div className={`${styles.tableCell} ${styles.headerCell} ${styles.colRoute}`}>Route</div>
              </div>
              <div className={styles.tableRow}>
                <div className={`${styles.tableCell} ${styles.colRfqId}`}>
                  <span className={styles.cellTextSupport}>RFQ-2025-0001</span>
                </div>
                <div className={`${styles.tableCell} ${styles.colSubmitted}`}>
                  <span className={styles.cellTextSupport}>Jan 6, 2025</span>
                </div>
                <div className={`${styles.tableCell} ${styles.colDeadline}`}>
                  <span className={styles.cellTextSupport}>Jan 6, 2025</span>
                </div>
                <div className={`${styles.tableCell} ${styles.colShipper}`}>
                  <span className={styles.cellTextSupport}>Asahi GlassAsahi Glass...</span>
                </div>
                <div className={`${styles.tableCell} ${styles.colRoute}`}>
                  <span className={styles.cellTextSupport}>40HC,3 routes</span>
                </div>
              </div>
            </div>
          </section>

          {/* Customer Template Selection */}
          <section className={styles.section}>
            <div className={`${styles.sectionHeader} ${styles.sectionHeaderOrange}`}>
              <span className={styles.sectionTitle}>Select Customer Template</span>
              <span className={styles.asterisk}>*</span>
            </div>
            <div className={styles.inputsRow}>
              <div className={styles.inputGroup} style={{ flex: 1 }}>
                <label className={styles.label}>
                  Select Template <span className={styles.asterisk}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Image src={`${ICON_PATH}/Group.svg`} alt="Icon" width={20} height={20} />
                  <div className={styles.inputInner}>
                    <span className={styles.inputText}>Asahi Glasss- Standard Templete</span>
                  </div>
                  <Image src={`${ICON_PATH}/File Format Dropdown Icon.svg`} alt="Dropdown" width={20} height={20} />
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupFixed}`}>
                <label className={styles.label}>
                  File Format <span className={styles.asterisk}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Image src={`${ICON_PATH}/File Format Icon.svg`} alt="Icon" width={20} height={20} />
                  <div className={styles.inputInner}>
                    <span className={styles.inputText}>Excel(.xlsx)</span>
                  </div>
                  <Image src={`${ICON_PATH}/File Format Dropdown Icon.svg`} alt="Dropdown" width={20} height={20} />
                </div>
              </div>
            </div>
          </section>

          {/* Mapping Confidence */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>Mapping Confidence: 98%</span>
              <span className={styles.asterisk}>*</span>
              <div className={styles.stars}>
                {[1, 2, 3, 4].map((i) => (
                  <Image key={i} src={`${ICON_PATH}/Star.svg`} alt="Star" width={20} height={20} />
                ))}
                 <Image src={`${ICON_PATH}/Star-1.svg`} alt="Star" width={20} height={20} />
              </div>
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <div className={`${styles.tableCell} ${styles.headerCell} ${styles.colCustomer}`}>Customer Column</div>
                <div className={`${styles.tableCell} ${styles.headerCell} ${styles.colSystem}`}>System Field</div>
                <div className={`${styles.tableCell} ${styles.headerCell} ${styles.colStatus}`}>Status</div>
              </div>
              {[
                { cust: 'Orig (POL)', sys: 'Origin Port', field: 'Origin Port' },
                { cust: 'DEST (POD)', sys: 'Destination Port', field: 'Destination Port' },
                { cust: 'OFRT', sys: 'Ocean Freight', field: 'Ocean Freight' },
                { cust: 'BAF/FAF', sys: 'BAF', field: 'BAF' },
                { cust: 'DTHC (POD)', sys: 'THC Destination', field: 'THC Destination' },
                { cust: 'ETHC (POL)', sys: 'THC Origin', field: 'THC Origin' },
              ].map((row, idx) => (
                <div key={idx} className={styles.tableRow}>
                  <div className={`${styles.tableCell} ${styles.colCustomer}`}>
                    <span className={styles.cellTextSupport}>{row.cust}</span>
                  </div>
                  <div className={`${styles.tableCell} ${styles.colSystem}`}>
                    <span className={styles.cellTextSupport}>{row.sys}</span>
                  </div>
                  <div className={`${styles.tableCell} ${styles.colStatus}`}>
                    <div className={styles.badge}>
                      <Image src={`${ICON_PATH}/check-circle.svg`} alt="Check" width={12} height={12} />
                      Mapped
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Check Items */}
          <div className={styles.checkList}>
            {[
              'All-in Rate (BAF included in quote)', 'BL Fee: Waived',
              'Free Time: Minimum 28 days', 'Equipment: 40HC containers must',
              'Payment Terms: 30 days credit', 'Payment Terms: 30 days credit',
              'Weekly service required', 'Weekly service required',
              'Transit Time: Maximum 10 days', 'Transit Time: Maximum 10 days'
            ].map((item, i) => (
              <div key={i} className={styles.checkItem}>
                 <Image src={`${ICON_PATH}/check-circle.svg`} alt="Check" width={24} height={24} />
                 <span className={styles.checkText}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Generated Files */}
        <div className={styles.generatedFiles}>
          <div className={`${styles.sectionHeader} ${styles.sectionHeaderTransparent}`}>
            <span className={styles.sectionTitle}>Generated files</span>
            <span className={styles.asterisk}>*</span>
          </div>
          
          <div className={styles.fileItem}>
             <Image src={`${ICON_PATH}/file-type-xlsx.svg`} alt="File" width={40} height={40} />
             <div className={styles.fileInfo}>
                <span className={styles.fileName}>Asahi Glass.pdf</span>
                <span className={styles.fileSize}>200 KB</span>
             </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.buttonGroup}>
          <button className={`${styles.button} ${styles.buttonSecondary}`}>Cancel</button>
          <button className={`${styles.button} ${styles.buttonPrimary}`}>Generate</button>
        </div>
      </div>
    </div>
  );
};

export default RFQQuotationGenerator;
