"use client";

import Image from 'next/image';
import { SearchLg, HelpCircle, ChevronDown, Check, User01, Trash01, Edit01 } from '@untitledui/icons';
import { Button } from '@/commons/components/button';
import { Select, SelectItem } from '@/commons/components/select';
import { ExcelIcon } from '@/commons/components/icons';
import { Table } from '@/commons/components/table';
import { cx } from '@/commons/utils/cx';
import { mockRfqData } from './mockData';
import { getStatusText, formatRouteCount } from './utils';
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
            <Select placeholder="All Status" aria-label="Filter by status">
              <SelectItem id="all">All Status</SelectItem>
              <SelectItem id="new">New</SelectItem>
              <SelectItem id="in_progress">In Progress</SelectItem>
              <SelectItem id="completed">Completed</SelectItem>
            </Select>
          </div>

          {/* Dropdown 2: All Shippers */}
          <div className={styles.dropdown}>
            <Select placeholder="All Shippers" aria-label="Filter by shipper">
              <SelectItem id="all">All Shippers</SelectItem>
              <SelectItem id="shipper1">Shipper 1</SelectItem>
              <SelectItem id="shipper2">Shipper 2</SelectItem>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Search Button */}
          <Button className={styles.searchButton}>
            Search
          </Button>

          {/* Download Button */}
          <Button
            className={styles.downloadButton}
            iconLeading={<ExcelIcon size={20} className={styles.excelIcon} />}
          >
            <span className={styles.buttonText}>Download</span>
          </Button>
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

      {/* Table */}
      <div className={styles.table}>
        <div className={styles.tableContent}>
          <Table>
            {/* Header Row */}
            <Table.Header className={styles.tableHeaderRow} bordered={false}>
              {/* Column: RFQ ID */}
              <Table.Head className={cx(styles.tableHeaderCell, styles.colRfqId)} isRowHeader>
                <div className={styles.headerCheckboxWrapper}>
                  <input type="checkbox" className={styles.checkbox} />
                </div>
                <div className={styles.headerLabelWrapper}>
                  <span className={styles.headerText}>RFQ ID</span>
                  <ChevronDown size={12} className={styles.arrowDown} />
                </div>
              </Table.Head>

              {/* Column: Received Date */}
              <Table.Head className={cx(styles.tableHeaderCell, styles.colReceivedDate)}>
                <span className={styles.headerText}>Rec&apos;d Date</span>
              </Table.Head>

              {/* Column: Deadline */}
              <Table.Head className={cx(styles.tableHeaderCell, styles.colDeadline)}>
                <span className={styles.headerText}>Deadline</span>
              </Table.Head>

              {/* Column: Shipper */}
              <Table.Head className={cx(styles.tableHeaderCell, styles.colShipper)}>
                <span className={styles.headerText}>Shipper</span>
              </Table.Head>

              {/* Column: Route */}
              <Table.Head className={cx(styles.tableHeaderCell, styles.colRoute)}>
                <span className={styles.headerText}>Route</span>
              </Table.Head>

              {/* Column: Status */}
              <Table.Head className={cx(styles.tableHeaderCell, styles.colStatus)}>
                <span className={styles.headerText}>Status</span>
              </Table.Head>

              {/* Column: Assigned To */}
              <Table.Head className={cx(styles.tableHeaderCell, styles.colAssignedTo)}>
                <span className={styles.headerText}>Assigned To</span>
              </Table.Head>

              {/* Column: Contact Person */}
              <Table.Head className={cx(styles.tableHeaderCell, styles.colContactPerson)}>
                <span className={styles.headerText}>Contact Person</span>
              </Table.Head>

              {/* Column: Actions */}
              <Table.Head className={cx(styles.tableHeaderCell, styles.colActions)}>
                <span className={styles.headerText}>Actions</span>
              </Table.Head>
            </Table.Header>

            {/* Data Rows */}
            <Table.Body>
              {mockRfqData.map((item) => (
                <Table.Row key={item.id} className={styles.tableDataRow}>
                  {/* Cell: RFQ ID */}
                  <Table.Cell className={cx(styles.tableCell, styles.colRfqId)}>
                    <div className={styles.cellCheckboxWrapper}>
                      <input type="checkbox" className={styles.checkbox} />
                    </div>
                    <div className={styles.cellTextWrapper}>
                      <span className={styles.cellText}>{item.rfqId}</span>
                    </div>
                  </Table.Cell>

                  {/* Cell: Received Date */}
                  <Table.Cell className={cx(styles.tableCell, styles.colReceivedDate)}>
                    <div className={styles.cellTextWrapper}>
                      <span className={styles.supportingCellText}>{item.receivedDate}</span>
                    </div>
                  </Table.Cell>

                  {/* Cell: Deadline */}
                  <Table.Cell className={cx(styles.tableCell, styles.colDeadline)}>
                    <div className={styles.cellTextWrapper}>
                      <span className={styles.supportingCellText}>{item.deadline}</span>
                    </div>
                  </Table.Cell>

                  {/* Cell: Shipper */}
                  <Table.Cell className={cx(styles.tableCell, styles.colShipper)}>
                    <div className={styles.cellTextWrapper}>
                      <span className={styles.supportingCellText}>{item.shipper}</span>
                    </div>
                  </Table.Cell>

                  {/* Cell: Route */}
                  <Table.Cell className={cx(styles.tableCell, styles.colRoute)}>
                    <div className={styles.cellTextWrapper}>
                      <span className={styles.supportingCellText}>{formatRouteCount(item.routeCount)}</span>
                    </div>
                  </Table.Cell>

                  {/* Cell: Status */}
                  <Table.Cell className={cx(styles.tableCell, styles.colStatus)}>
                    <div className={`${styles.badge} ${
                      item.status === 'NEW' ? styles.badgeNew :
                      item.status === 'IN_PROGRESS' ? styles.badgeInProgress :
                      item.status === 'PENDING' ? styles.badgePending :
                      item.status === 'COMPLETED' ? styles.badgeCompleted :
                      ''
                    }`}>
                      <Check size={12} className={styles.badgeIcon} />
                      <span className={styles.badgeText}>{getStatusText(item.status)}</span>
                    </div>
                  </Table.Cell>

                  {/* Cell: Assigned To */}
                  <Table.Cell className={cx(styles.tableCell, styles.colAssignedTo)}>
                    <div className={styles.avatarTextWrapper}>
                      <div className={styles.avatar}>
                        {item.assignedTo.avatar ? (
                          <Image
                            src={item.assignedTo.avatar}
                            alt={item.assignedTo.name}
                            width={40}
                            height={40}
                            className={styles.avatarImage}
                          />
                        ) : (
                          <div className={styles.avatarImagePlaceholder}></div>
                        )}
                      </div>
                      <div className={styles.avatarTextContent}>
                        <span className={styles.cellText}>{item.assignedTo.name}</span>
                        <span className={styles.supportingCellText}>{item.assignedTo.email}</span>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Cell: Contact Person */}
                  <Table.Cell className={cx(styles.tableCell, styles.colContactPerson)}>
                    <div className={styles.avatarTextWrapper}>
                      <div className={styles.avatarPlaceholder}>
                        <User01 size={24} className={styles.userIcon} />
                      </div>
                      <div className={styles.avatarTextContent}>
                        <span className={styles.cellText}>{item.contactPerson.name}</span>
                        <span className={styles.supportingCellText}>{item.contactPerson.email}</span>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Cell: Actions */}
                  <Table.Cell className={cx(styles.tableCell, styles.colActions)}>
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
      </div>

      <div className={styles.gap4}></div>

      {/* Pagination */}
      <div className={styles.pagination}>
        {/* Previous Button */}
        <button className={styles.paginationPrevButton}>
          <ChevronDown size={20} className={styles.paginationArrowLeft} />
          <span className={styles.paginationPrevText}>Previous</span>
        </button>

        {/* Page Numbers */}
        <div className={styles.paginationNumbers}>
          <button className={`${styles.paginationNumberButton} ${styles.paginationNumberActive}`}>
            <span className={styles.paginationNumber}>1</span>
          </button>
          <button className={styles.paginationNumberButton}>
            <span className={styles.paginationNumber}>2</span>
          </button>
          <button className={styles.paginationNumberButton}>
            <span className={styles.paginationNumber}>3</span>
          </button>
          <button className={styles.paginationNumberButton}>
            <span className={styles.paginationNumber}>...</span>
          </button>
          <button className={styles.paginationNumberButton}>
            <span className={styles.paginationNumber}>8</span>
          </button>
          <button className={styles.paginationNumberButton}>
            <span className={styles.paginationNumber}>9</span>
          </button>
          <button className={styles.paginationNumberButton}>
            <span className={styles.paginationNumber}>10</span>
          </button>
        </div>

        {/* Next Button */}
        <button className={styles.paginationNextButton}>
          <span className={styles.paginationNextText}>Next</span>
          <ChevronDown size={20} className={styles.paginationArrowRight} />
        </button>
      </div>

      {children}
    </div>
  );
}
