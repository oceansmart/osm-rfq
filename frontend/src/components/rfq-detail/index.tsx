import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

interface RfqDetailLayoutProps {
  children?: React.ReactNode;
}

interface RouteRow {
  id: string;
  status: 'APPLYED' | 'IN PROGRESS';
  originName: string;
  originNameDetail?: string;
  originCode: string;
  destinationName: string;
  destinationNameDetail?: string;
  destCode: string;
  typeSize: string;
  commodity: string;
}

const mockRoutes: RouteRow[] = [
  {
    id: 'route-1',
    status: 'APPLYED',
    originName: 'BANGKOKBANGKOKBANGKOKBANGKOK',
    originCode: 'THBKK',
    destinationName: 'OTARUBANGKOKBANGKOKBANGKOK',
    destCode: '40HC,20GP',
    typeSize: 'JPOTR',
    commodity: 'Glass Sheets',
  },
  {
    id: 'route-2',
    status: 'APPLYED',
    originName: 'BANGKOKBANGKOKBANGKOKBANGKOK',
    originCode: 'THBKK',
    destinationName: 'YOKOHAMABANGKOKBANGKOK',
    destCode: '40HC,20GP',
    typeSize: 'JPOTR',
    commodity: 'Glass Sheets',
  },
  {
    id: 'route-3',
    status: 'APPLYED',
    originName: 'BANGKOKBANGKOKBANGKOKBANGKOK',
    originCode: 'THBKK',
    destinationName: 'TOKYOBANGKOKBANGKOKBANGKOK',
    destCode: '40HC,20GP',
    typeSize: 'JPOTR',
    commodity: 'Auto Parts',
  },
  {
    id: 'route-4',
    status: 'APPLYED',
    originName: 'BANGKOKBANGKOKBANGKOKBANGKOK',
    originCode: 'THBKK',
    destinationName: 'YOKOHAMABANGKOKBANGKOK',
    destCode: '40HC,20GP',
    typeSize: 'JPOTR',
    commodity: 'Auto Parts',
  },
  {
    id: 'route-5',
    status: 'IN PROGRESS',
    originName: 'BANGKOKBANGKOKBANGKOKBANGKOK',
    originCode: 'THBKK',
    destinationName: 'YOKOHAMABANGKOKBANGKOK',
    destCode: '40HC,20GP',
    typeSize: 'JPOTR',
    commodity: 'Glass Sheets',
  },
];

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

          {/* Search 버튼 */}
          <button className={styles.primaryButton}>
            <span className={styles.buttonText}>Search</span>
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

      {/* 컨테이너 1 하단 여백 */}
      <div className={styles.gapAfterContainer1} />

      {/* 컨테이너 2, 3 래퍼 */}
      <div className={styles.containerRow}>
        {/* 컨테이너 2 - Basic Information */}
        <div className={styles.container2}>
          {/* Header */}
          <div className={styles.container2Header}>
            <div className={styles.headerContent}>
              <h2 className={styles.headerHeading}>Basic Information</h2>
              <div className={styles.headerBadge}>
                <Image
                  src="/icons/rfq-detail/cntr1/check.svg"
                  alt="Check"
                  width={12}
                  height={12}
                  className={styles.badgeIcon}
                />
                <span className={styles.badgeText}>NEW</span>
              </div>
              <button className={styles.headerMailIcon}>
                <Image
                  src="/icons/rfq-detail/cntr1/mail.svg"
                  alt="Mail"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>

          {/* Body Content - Two Columns */}
          <div className={styles.container2Body}>
            {/* Left Column */}
            <div className={styles.columnLeft}>
              {/* RFQ Reference */}
              <div className={styles.inputField}>
                <div className={styles.inputLabelWrapper}>
                  <label className={styles.inputLabel}>RFQ Reference</label>
                  <span className={styles.inputAsterisk}>*</span>
                </div>
                <div className={styles.inputBox}>
                  <span className={styles.inputText}>RFQ-2025-001</span>
                </div>
              </div>

              {/* Received Date */}
              <div className={styles.inputField}>
                <div className={styles.inputLabelWrapper}>
                  <label className={styles.inputLabel}>Received Date</label>
                  <span className={styles.inputAsterisk}>*</span>
                </div>
                <div className={styles.inputBox}>
                  <span className={styles.inputText}>2025-11-01 09:30</span>
                </div>
              </div>

              {/* Contact Person */}
              <div className={styles.inputField}>
                <div className={styles.inputLabelWrapper}>
                  <label className={styles.inputLabel}>Contact Person</label>
                  <span className={styles.inputAsterisk}>*</span>
                </div>
                <div className={styles.inputBox}>
                  <span className={styles.inputText}>
                    Tanaka (tanaka@asahi-glass.com)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.columnRight}>
              {/* Shipper */}
              <div className={styles.inputField}>
                <div className={styles.inputLabelWrapper}>
                  <label className={styles.inputLabel}>Shipper</label>
                  <span className={styles.inputAsterisk}>*</span>
                </div>
                <div className={styles.inputBox}>
                  <span className={styles.inputText}>Asahi Glass Co., Ltd.</span>
                </div>
              </div>

              {/* Response Deadline */}
              <div className={styles.inputField}>
                <div className={styles.inputLabelWrapper}>
                  <label className={styles.inputLabel}>Response Deadline</label>
                  <span className={styles.inputAsterisk}>*</span>
                </div>
                <div className={styles.inputBox}>
                  <span className={styles.inputText}>2025-11-08 17:00</span>
                </div>
              </div>

              {/* Assigned To */}
              <div className={styles.inputField}>
                <div className={styles.inputLabelWrapper}>
                  <label className={styles.inputLabel}>Assigned To</label>
                  <span className={styles.inputAsterisk}>*</span>
                </div>
                <div className={styles.inputBox}>
                  <span className={styles.inputText}>John Doe</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 컨테이너 3 - Key Requirements */}
        <div className={styles.container3}>
          {/* Header */}
          <div className={styles.container3Header}>
            <div className={styles.header3Content}>
              <h2 className={styles.header3Heading}>Key Requirements</h2>
              <div className={styles.header3Badge}>
                <span className={styles.badge3Text}>10  Requirements</span>
              </div>
            </div>
          </div>

          {/* Body Content - Check Items */}
          <div className={styles.container3Body}>
            {/* Left Column */}
            <div className={styles.checkItemsLeft}>
              {/* Check Item 1 */}
              <div className={styles.checkItem}>
                <Image
                  src="/icons/rfq-detail/cntr2/check-circle.svg"
                  alt="Check"
                  width={24}
                  height={24}
                  className={styles.checkIcon}
                />
                <span className={styles.checkText}>
                  All-in Rate (BAF included in quote)
                </span>
              </div>

              {/* Check Item 2 */}
              <div className={styles.checkItem}>
                <Image
                  src="/icons/rfq-detail/cntr2/check-circle.svg"
                  alt="Check"
                  width={24}
                  height={24}
                  className={styles.checkIcon}
                />
                <span className={styles.checkText}>
                  Free Time: Minimum 28 days
                </span>
              </div>

              {/* Check Item 3 */}
              <div className={styles.checkItem}>
                <Image
                  src="/icons/rfq-detail/cntr2/check-circle.svg"
                  alt="Check"
                  width={24}
                  height={24}
                  className={styles.checkIcon}
                />
                <span className={styles.checkText}>
                  Payment Terms: 30 days credit
                </span>
              </div>

              {/* Check Item 4 */}
              <div className={styles.checkItem}>
                <Image
                  src="/icons/rfq-detail/cntr2/check-circle.svg"
                  alt="Check"
                  width={24}
                  height={24}
                  className={styles.checkIcon}
                />
                <span className={styles.checkText}>
                  Weekly service required
                </span>
              </div>

              {/* Check Item 5 */}
              <div className={styles.checkItem}>
                <Image
                  src="/icons/rfq-detail/cntr2/check-circle.svg"
                  alt="Check"
                  width={24}
                  height={24}
                  className={styles.checkIcon}
                />
                <span className={styles.checkText}>
                  Transit Time: Maximum 10 days
                </span>
              </div>
            </div>

            {/* Line Divider */}
            <div className={styles.lineDivider} />

            {/* Right Column */}
            <div className={styles.checkItemsRight}>
              {/* Check Item 6 */}
              <div className={styles.checkItem}>
                <Image
                  src="/icons/rfq-detail/cntr2/check-circle.svg"
                  alt="Check"
                  width={24}
                  height={24}
                  className={styles.checkIcon}
                />
                <span className={styles.checkText}>BL Fee: Waived</span>
              </div>

              {/* Check Item 7 */}
              <div className={styles.checkItem}>
                <Image
                  src="/icons/rfq-detail/cntr2/check-circle.svg"
                  alt="Check"
                  width={24}
                  height={24}
                  className={styles.checkIcon}
                />
                <span className={styles.checkText}>
                  Equipment: 40HC containers must{' '}
                </span>
              </div>

              {/* Check Item 8 */}
              <div className={styles.checkItem}>
                <Image
                  src="/icons/rfq-detail/cntr2/check-circle.svg"
                  alt="Check"
                  width={24}
                  height={24}
                  className={styles.checkIcon}
                />
                <span className={styles.checkText}>
                  Payment Terms: 30 days credit
                </span>
              </div>

              {/* Check Item 9 */}
              <div className={styles.checkItem}>
                <Image
                  src="/icons/rfq-detail/cntr2/check-circle.svg"
                  alt="Check"
                  width={24}
                  height={24}
                  className={styles.checkIcon}
                />
                <span className={styles.checkText}>
                  Weekly service required
                </span>
              </div>

              {/* Check Item 10 */}
              <div className={styles.checkItem}>
                <Image
                  src="/icons/rfq-detail/cntr2/check-circle.svg"
                  alt="Check"
                  width={24}
                  height={24}
                  className={styles.checkIcon}
                />
                <span className={styles.checkText}>
                  Transit Time: Maximum 10 days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 컨테이너 2, 3 하단 여백 */}
      <div className={styles.gapAfterContainers} />

      {/* 컨테이너 4 - List of Information to Fill In */}
      <div className={styles.container4}>
        {/* Header */}
        <div className={styles.container4Header}>
          <div className={styles.header4Content}>
            <h2 className={styles.header4Heading}>
              List of information to fill in
            </h2>
          </div>
        </div>

        {/* Body - Badge List */}
        <div className={styles.container4Body}>
          <div className={styles.badgeList}>
            {/* Cyan Badges */}
            <div className={styles.badgeCyan}>
              <span className={styles.badgeCyanText}>Orign</span>
            </div>
            <div className={styles.badgeCyan}>
              <span className={styles.badgeCyanText}>DEST</span>
            </div>
            <div className={styles.badgeCyan}>
              <span className={styles.badgeCyanText}>SIZE/TYPE</span>
            </div>
            <div className={styles.badgeCyan}>
              <span className={styles.badgeCyanText}>OOG</span>
            </div>
            <div className={styles.badgeCyan}>
              <span className={styles.badgeCyanText}>DG</span>
            </div>
            <div className={styles.badgeCyan}>
              <span className={styles.badgeCyanText}>OFT</span>
            </div>

            {/* Orange Badges */}
            <div className={styles.badgeOrange}>
              <span className={styles.badgeOrangeText}>Frequence</span>
            </div>
            <div className={styles.badgeOrange}>
              <span className={styles.badgeOrangeText}>ETD</span>
            </div>
            <div className={styles.badgeOrange}>
              <span className={styles.badgeOrangeText}>T/T</span>
            </div>
            <div className={styles.badgeOrange}>
              <span className={styles.badgeOrangeText}>T/S Status</span>
            </div>
            <div className={styles.badgeOrange}>
              <span className={styles.badgeOrangeText}>DEM</span>
            </div>
            <div className={styles.badgeOrange}>
              <span className={styles.badgeOrangeText}>DET</span>
            </div>
          </div>
        </div>
      </div>

      {/* 컨테이너 4 하단 여백 */}
      <div className={styles.gapAfterContainer4} />

      {/* 테이블 영역 */}
      <div className={styles.tableSection}>
        <div className={styles.tableContainer}>
          {/* 테이블 헤더 */}
          <div className={styles.tableHeader}>
            {/* Checkbox Column */}
            <div className={styles.tableHeaderCell_Checkbox}>
              <div className={styles.headerCheckboxWrapper}>
                <div className={styles.headerCheckbox} />
              </div>
            </div>

            {/* Status Column */}
            <div className={styles.tableHeaderCell_Status}>
              <span className={styles.headerLabel}>Status</span>
            </div>

            {/* Origin Name Column */}
            <div className={styles.tableHeaderCell_OriginName}>
              <span className={styles.headerLabel}>Orign Name</span>
            </div>

            {/* Origin Code Column */}
            <div className={styles.tableHeaderCell_OriginCode}>
              <span className={styles.headerLabel}>Origin Code</span>
            </div>

            {/* Destination Name Column */}
            <div className={styles.tableHeaderCell_DestName}>
              <span className={styles.headerLabel}>Destination Name</span>
            </div>

            {/* DEST Code Column */}
            <div className={styles.tableHeaderCell_DestCode}>
              <span className={styles.headerLabel}>DEST Code</span>
            </div>

            {/* TYPE/SIZE Column */}
            <div className={styles.tableHeaderCell_TypeSize}>
              <span className={styles.headerLabel}>TYPE/SIZE</span>
            </div>

            {/* Commodity Column */}
            <div className={styles.tableHeaderCell_Commodity}>
              <span className={styles.headerLabel}>Commodity</span>
            </div>

            {/* Empty Column (Actions) */}
            <div className={styles.tableHeaderCell_Actions}>
              <span className={styles.headerLabel}>Actions</span>
            </div>
          </div>

          {/* 테이블 행들 */}
          {mockRoutes.map((route) => (
            <div key={route.id} className={styles.tableRow}>
              {/* Checkbox Cell */}
              <div className={styles.tableCell_Checkbox}>
                <div className={styles.cellCheckboxWrapper}>
                  <div className={styles.cellCheckbox} />
                </div>
              </div>

              {/* Status Cell */}
              <div className={styles.tableCell_Status}>
                <div
                  className={
                    route.status === 'APPLYED'
                      ? styles.badgeApplyed
                      : styles.badgeInProgress
                  }
                >
                  <span className={styles.badgeText}>{route.status}</span>
                </div>
              </div>

              {/* Origin Name Cell */}
              <div className={styles.tableCell_OriginName}>
                <span className={styles.cellTextSupporting}>
                  {route.originName}
                </span>
              </div>

              {/* Origin Code Cell */}
              <div className={styles.tableCell_OriginCode}>
                <span className={styles.cellTextSupporting}>
                  {route.originCode}
                </span>
              </div>

              {/* Destination Name Cell */}
              <div className={styles.tableCell_DestName}>
                <span className={styles.cellTextSupporting}>
                  {route.destinationName}
                </span>
              </div>

              {/* DEST Code Cell */}
              <div className={styles.tableCell_DestCode}>
                <span className={styles.cellTextSupporting}>
                  {route.destCode}
                </span>
              </div>

              {/* TYPE/SIZE Cell */}
              <div className={styles.tableCell_TypeSize}>
                <span className={styles.cellTextSupporting}>
                  {route.typeSize}
                </span>
              </div>

              {/* Commodity Cell */}
              <div className={styles.tableCell_Commodity}>
                <span className={styles.cellTextSupporting}>{route.commodity}</span>
              </div>

              {/* Actions Cell */}
              <div className={styles.tableCell_Actions}>
                <div className={styles.actionButtons}>
                  <button className={styles.actionButton}>
                    <Image
                      src="/icons/rfq-detail/table/trash-01.svg"
                      alt="Delete"
                      width={16}
                      height={16}
                    />
                  </button>
                  <button className={styles.actionButton}>
                    <Image
                      src="/icons/rfq-detail/table/edit-01.svg"
                      alt="Edit"
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* children 콘텐츠 */}
      {children}
    </div>
  );
}
