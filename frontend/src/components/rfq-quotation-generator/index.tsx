"use client";

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { MOCK_MAPPING_ITEMS } from './mocks';
import { Select } from '@/commons/components/select';
import { Button } from '@/commons/components/button';
import { FileCode02 } from '@untitledui/icons';

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
                <Select
                  label="Select Template"
                  placeholder="Select template"
                  isRequired
                  size="md"
                  className={styles.selectWrapper}
                  defaultSelectedKey="1"
                >
                  <Select.Item id="1" label="Asahi Glasss- Standard Templete" icon={FileCode02} />
                  <Select.Item id="2" label="Generic Template" icon={FileCode02} />
                </Select>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupFixed}`}>
                <Select
                  label="File Format"
                  placeholder="Select format"
                  isRequired
                  size="md"
                  className={styles.selectWrapper}
                  defaultSelectedKey="xlsx"
                >
                  <Select.Item id="xlsx" label="Excel(.xlsx)" icon={FileCode02} />
                  <Select.Item id="csv" label="CSV(.csv)" icon={FileCode02} />
                  <Select.Item id="pdf" label="PDF(.pdf)" icon={FileCode02} />
                </Select>
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
              {MOCK_MAPPING_ITEMS.map((item) => (
                <div key={item.id} className={styles.tableRow}>
                  <div className={`${styles.tableCell} ${styles.colCustomer}`}>
                    <span className={styles.cellTextSupport}>{item.customerColumn}</span>
                  </div>
                  <div className={`${styles.tableCell} ${styles.colSystem}`}>
                    <span className={styles.cellTextSupport}>{item.systemField}</span>
                  </div>
                  <div className={`${styles.tableCell} ${styles.colStatus}`}>
                    <div className={styles.badge}>
                      <Image src={`${ICON_PATH}/check-circle.svg`} alt="Check" width={12} height={12} />
                      {item.status}
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
          <Button color="secondary" size="md" className={`${styles.buttonOverride} ${styles.buttonSecondary}`}>
            Cancel
          </Button>
          <Button color="primary" size="md" className={`${styles.buttonOverride} ${styles.buttonPrimary}`}>
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RFQQuotationGenerator;
