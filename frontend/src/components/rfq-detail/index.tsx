import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

interface RfqDetailLayoutProps {
  children?: React.ReactNode;
}

export default function RfqDetailLayout({ children }: RfqDetailLayoutProps) {
  return (
    <div className={styles.rfqDetailLayout}>
      {/* 상단 여백 */}
      <div className={styles.gapTop} />

      {/* 타이틀 영역 */}
      <div className={styles.titleSection}>
        {/* 좌측 컨테이너 */}
        <div className={styles.titleContainer}>
          <div className={styles.titleTextWrapper}>
            <h1 className={styles.titleText}>RFQ-2025-001 | Asahi Glass</h1>
          </div>
        </div>

        {/* 우측 액션 버튼들 */}
        <div className={styles.titleActions}>
          {/* Generate Template 버튼 */}
          <button className={styles.primaryButton}>
            <span className={styles.buttonText}>Generate Template</span>
          </button>

          {/* Request Approval 버튼 */}
          <button className={styles.primaryButton}>
            <span className={styles.buttonText}>Request Approval</span>
          </button>

          {/* Download 버튼 */}
          <button className={styles.secondaryButton}>
            <Image
              src="/icons/rfq-detail/title/ms_excel.svg"
              alt="Excel"
              width={20}
              height={20}
              className={styles.excelIcon}
            />
            <span className={styles.secondaryButtonText}>Download</span>
          </button>
        </div>
      </div>

      {/* 타이틀 하단 여백 */}
      <div className={styles.gapAfterTitle} />

      {/* 컨테이너 1 - 검색 필터 바 */}
      <div className={styles.container1}>
        {/* Trade 드롭다운 */}
        <div className={styles.inputGroup}>
          <div className={styles.labelWrapper}>
            <label className={styles.label}>Trade</label>
            <span className={styles.asterisk}>*</span>
          </div>
          <button className={styles.dropdownButton}>
            <span className={styles.dropdownText}>TPE</span>
            <Image
              src="/icons/rfq-detail/search/chevron-down.svg"
              alt="Dropdown"
              width={20}
              height={20}
              className={styles.dropdownIcon}
            />
          </button>
        </div>

        {/* I/O 드롭다운 */}
        <div className={styles.inputGroup}>
          <div className={styles.labelWrapper}>
            <label className={styles.label}>I/O</label>
            <span className={styles.asterisk}>*</span>
          </div>
          <button className={styles.dropdownButton}>
            <span className={styles.dropdownText}>Inbound</span>
            <Image
              src="/icons/rfq-detail/search/chevron-down.svg"
              alt="Dropdown"
              width={20}
              height={20}
              className={styles.dropdownIcon}
            />
          </button>
        </div>

        {/* From LOC 드롭다운 */}
        <div className={styles.inputGroup}>
          <div className={styles.labelWrapper}>
            <label className={styles.label}>From LOC</label>
            <span className={styles.asterisk}>*</span>
          </div>
          <button className={styles.dropdownButton}>
            <span className={styles.dropdownText}>KRPUS</span>
            <Image
              src="/icons/rfq-detail/search/chevron-down.svg"
              alt="Dropdown"
              width={20}
              height={20}
              className={styles.dropdownIcon}
            />
          </button>
        </div>

        {/* To LOC 드롭다운 */}
        <div className={styles.inputGroup}>
          <div className={styles.labelWrapper}>
            <label className={styles.label}>To LOC</label>
            <span className={styles.asterisk}>*</span>
          </div>
          <button className={styles.dropdownButton}>
            <span className={styles.dropdownText}>THBKK</span>
            <Image
              src="/icons/rfq-detail/search/chevron-down.svg"
              alt="Dropdown"
              width={20}
              height={20}
              className={styles.dropdownIcon}
            />
          </button>
        </div>

        {/* From Country 드롭다운 */}
        <div className={styles.inputGroup}>
          <div className={styles.labelWrapper}>
            <label className={styles.label}>From  Country</label>
            <span className={styles.asterisk}>*</span>
          </div>
          <button className={styles.dropdownButton}>
            <span className={styles.dropdownText}>KR</span>
            <Image
              src="/icons/rfq-detail/search/chevron-down.svg"
              alt="Dropdown"
              width={20}
              height={20}
              className={styles.dropdownIcon}
            />
          </button>
        </div>

        {/* To Country 드롭다운 */}
        <div className={styles.inputGroup}>
          <div className={styles.labelWrapper}>
            <label className={styles.label}>To  Country</label>
            <span className={styles.asterisk}>*</span>
          </div>
          <button className={styles.dropdownButton}>
            <span className={styles.dropdownText}>KR</span>
            <Image
              src="/icons/rfq-detail/search/chevron-down.svg"
              alt="Dropdown"
              width={20}
              height={20}
              className={styles.dropdownIcon}
            />
          </button>
        </div>

        {/* File Info */}
        <div className={styles.fileInfo}>
          <div className={styles.fileContent}>
            <div className={styles.fileIcon}>
              <Image
                src="/icons/rfq-detail/search/file-type-xlsx.svg"
                alt="XLSX File"
                width={40}
                height={40}
              />
            </div>
            <div className={styles.fileDetails}>
              <span className={styles.fileName}>Asahi Glass.pdf</span>
              <span className={styles.fileSize}>200 KB</span>
            </div>
          </div>
        </div>
      </div>

      {/* 컨테이너 2, 3 래퍼 */}
      <div className={styles.containerRow}>
        {/* 컨테이너 2 */}
        <div className={styles.container2}>
          {/* 컨테이너 2 콘텐츠는 추후 추가 */}
        </div>

        {/* 컨테이너 3 */}
        <div className={styles.container3}>
          {/* 컨테이너 3 콘텐츠는 추후 추가 */}
        </div>
      </div>

      {/* 컨테이너 2, 3 하단 여백 */}
      <div className={styles.gapAfterContainers} />

      {/* 컨테이너 4 */}
      <div className={styles.container4}>
        {/* 컨테이너 4 콘텐츠는 추후 추가 */}
      </div>

      {/* 컨테이너 4 하단 여백 */}
      <div className={styles.gapAfterContainer4} />

      {/* 테이블 영역 */}
      <div className={styles.tableSection}>
        {/* 테이블 콘텐츠는 추후 추가 */}
      </div>

      {/* children 콘텐츠 */}
      {children}
    </div>
  );
}
