"use client";

import React from 'react';
import Image from 'next/image';
import { Trash01, Edit01, Mail01 } from '@untitledui/icons';
import { Button } from '@/commons/components/button';
import { Select, SelectItem } from '@/commons/components/select';
import { Table } from '@/commons/components/table';
import { ExcelIcon } from '@/commons/components/icons';
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
    originName: 'BANGKOKBANGKOKBANGKOK',
    originCode: 'THBKK',
    destinationName: 'OTARUBANGKOKBANGK',
    destCode: 'JPOTR',
    typeSize: '40HC,20GP',
    commodity: 'Glass Sheets',
  },
  {
    id: 'route-2',
    status: 'APPLYED',
    originName: 'BANGKOKBANGKOKBANGKOK',
    originCode: 'THBKK',
    destinationName: 'YOKOHAMABANGK',
    destCode: 'JPOTR',
    typeSize: '40HC,20GP',
    commodity: 'Glass Sheets',
  },
  {
    id: 'route-3',
    status: 'APPLYED',
    originName: 'BANGKOKBANGKOKBANGKOK',
    originCode: 'THBKK',
    destinationName: 'TOKYOBANGKOKBANGK',
    destCode: 'JPOTR',
    typeSize: '40HC,20GP',
    commodity: 'Auto Parts',
  },
  {
    id: 'route-4',
    status: 'APPLYED',
    originName: 'BANGKOKBANGKOKBANGKOK',
    originCode: 'THBKK',
    destinationName: 'YOKOHAMABANGK',
    destCode: 'JPOTR',
    typeSize: '40HC,20GP',
    commodity: 'Auto Parts',
  },
  {
    id: 'route-5',
    status: 'IN PROGRESS',
    originName: 'BANGKOKBANGKOKBANGKOK',
    originCode: 'THBKK',
    destinationName: 'YOKOHAMABANGKOK',
    destCode: 'JPOTR',
    typeSize: '40HC,20GP',
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
          <Button className={styles.primaryButton}>
            Generate Template
          </Button>

          {/* Search 버튼 */}
          <Button className={styles.primaryButton}>
            Search
          </Button>

          {/* Download 버튼 */}
          <Button
            color="secondary"
            className={styles.secondaryButton}
            iconLeading={<ExcelIcon size={20} />}
          >
            Download
          </Button>
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
          <div className={styles.dropdown}>
            <Select placeholder="TPE" aria-label="Trade">
              <SelectItem id="tpe">TPE</SelectItem>
              <SelectItem id="fpe">FPE</SelectItem>
            </Select>
          </div>
        </div>

        {/* I/O 드롭다운 */}
        <div className={styles.inputGroup}>
          <div className={styles.labelWrapper}>
            <label className={styles.label}>I/O</label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.dropdown}>
            <Select placeholder="Inbound" aria-label="I/O">
              <SelectItem id="inbound">Inbound</SelectItem>
              <SelectItem id="outbound">Outbound</SelectItem>
            </Select>
          </div>
        </div>

        {/* From LOC 드롭다운 */}
        <div className={styles.inputGroup}>
          <div className={styles.labelWrapper}>
            <label className={styles.label}>From LOC</label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.dropdown}>
            <Select placeholder="KRPUS" aria-label="From LOC">
              <SelectItem id="krpus">KRPUS</SelectItem>
              <SelectItem id="thbkk">THBKK</SelectItem>
            </Select>
          </div>
        </div>

        {/* To LOC 드롭다운 */}
        <div className={styles.inputGroup}>
          <div className={styles.labelWrapper}>
            <label className={styles.label}>To LOC</label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.dropdown}>
            <Select placeholder="THBKK" aria-label="To LOC">
              <SelectItem id="thbkk">THBKK</SelectItem>
              <SelectItem id="krpus">KRPUS</SelectItem>
            </Select>
          </div>
        </div>

        {/* From Country 드롭다운 */}
        <div className={styles.inputGroup}>
          <div className={styles.labelWrapper}>
            <label className={styles.label}>From  Country</label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.dropdown}>
            <Select placeholder="KR" aria-label="From Country">
              <SelectItem id="kr">KR</SelectItem>
              <SelectItem id="th">TH</SelectItem>
            </Select>
          </div>
        </div>

        {/* To Country 드롭다운 */}
        <div className={styles.inputGroup}>
          <div className={styles.labelWrapper}>
            <label className={styles.label}>To  Country</label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.dropdown}>
            <Select placeholder="KR" aria-label="To Country">
              <SelectItem id="kr">KR</SelectItem>
              <SelectItem id="th">TH</SelectItem>
            </Select>
          </div>
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
              <Button
                color="tertiary"
                size="sm"
                className={styles.headerMailIcon}
                iconLeading={<Mail01 size={24} />}
              />
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
        <Table>
          {/* Header Row */}
          <Table.Header className={styles.tableHeader} bordered={false}>
            {/* Checkbox Column */}
            <Table.Head className={styles.tableHeaderCell_Checkbox} isRowHeader>
              <div className={styles.headerCheckboxWrapper}>
                <div className={styles.headerCheckbox} />
              </div>
            </Table.Head>

            {/* Status Column */}
            <Table.Head className={styles.tableHeaderCell_Status}>
              <span className={styles.headerLabel}>Status</span>
            </Table.Head>

            {/* Origin Name Column */}
            <Table.Head className={styles.tableHeaderCell_OriginName}>
              <span className={styles.headerLabel}>Orign Name</span>
            </Table.Head>

            {/* Origin Code Column */}
            <Table.Head className={styles.tableHeaderCell_OriginCode}>
              <span className={styles.headerLabel}>Origin Code</span>
            </Table.Head>

            {/* Destination Name Column */}
            <Table.Head className={styles.tableHeaderCell_DestName}>
              <span className={styles.headerLabel}>Destination Name</span>
            </Table.Head>

            {/* DEST Code Column */}
            <Table.Head className={styles.tableHeaderCell_DestCode}>
              <span className={styles.headerLabel}>DEST Code</span>
            </Table.Head>

            {/* TYPE/SIZE Column */}
            <Table.Head className={styles.tableHeaderCell_TypeSize}>
              <span className={styles.headerLabel}>TYPE/SIZE</span>
            </Table.Head>

            {/* Commodity Column */}
            <Table.Head className={styles.tableHeaderCell_Commodity}>
              <span className={styles.headerLabel}>Commodity</span>
            </Table.Head>

            {/* Actions Column */}
            <Table.Head className={styles.tableHeaderCell_Actions}>
              <span className={styles.headerLabel}>Actions</span>
            </Table.Head>
          </Table.Header>

          {/* Data Rows */}
          <Table.Body>
            {mockRoutes.map((route) => (
              <Table.Row key={route.id} className={styles.tableRow}>
                {/* Checkbox Cell */}
                <Table.Cell className={styles.tableCell_Checkbox}>
                  <div className={styles.cellCheckboxWrapper}>
                    <div className={styles.cellCheckbox} />
                  </div>
                </Table.Cell>

                {/* Status Cell */}
                <Table.Cell className={styles.tableCell_Status}>
                  <div
                    className={
                      route.status === 'APPLYED'
                        ? styles.badgeApplyed
                        : styles.badgeInProgress
                    }
                  >
                    <span className={styles.badgeText}>{route.status}</span>
                  </div>
                </Table.Cell>

                {/* Origin Name Cell */}
                <Table.Cell className={styles.tableCell_OriginName}>
                  <span className={styles.cellTextSupporting}>
                    {route.originName}
                  </span>
                </Table.Cell>

                {/* Origin Code Cell */}
                <Table.Cell className={styles.tableCell_OriginCode}>
                  <span className={styles.cellTextSupporting}>
                    {route.originCode}
                  </span>
                </Table.Cell>

                {/* Destination Name Cell */}
                <Table.Cell className={styles.tableCell_DestName}>
                  <span className={styles.cellTextSupporting}>
                    {route.destinationName}
                  </span>
                </Table.Cell>

                {/* DEST Code Cell */}
                <Table.Cell className={styles.tableCell_DestCode}>
                  <span className={styles.cellTextSupporting}>
                    {route.destCode}
                  </span>
                </Table.Cell>

                {/* TYPE/SIZE Cell */}
                <Table.Cell className={styles.tableCell_TypeSize}>
                  <span className={styles.cellTextSupporting}>
                    {route.typeSize}
                  </span>
                </Table.Cell>

                {/* Commodity Cell */}
                <Table.Cell className={styles.tableCell_Commodity}>
                  <span className={styles.cellTextSupporting}>{route.commodity}</span>
                </Table.Cell>

                {/* Actions Cell */}
                <Table.Cell className={styles.tableCell_Actions}>
                  <div className={styles.actionButtons}>
                    <button className={styles.actionButton}>
                      <Trash01 size={16} className={styles.actionIcon} />
                    </button>
                    <button className={styles.actionButton}>
                      <Edit01 size={16} className={styles.actionIcon} />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* children 콘텐츠 */}
      {children}
    </div>
  );
}
