"use client";

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Table } from "@/commons/components/table";
import { Checkbox } from '@/commons/components/checkbox';
import { Button } from "@/commons/components/button";
import { MOCK_SUGGESTED_RATES, MOCK_REFERENCE_RATES, MOCK_SUGGESTED_SURCHARGES, MOCK_KEY_REQUIREMENTS, MOCK_OCEAN_FREIGHTS, MOCK_SURCHARGES } from './mocks';

// Container6: Key Requirements & Conditions
function Container6() {
  return (
    <div className={styles.container6}>
      <div className={styles.container6Header}>
        <div className={styles.container6LabelWrapper}>
          <span className={styles.container6Label}>Key Requirements & Conditions</span>
          <span className={styles.container6Asterisk}>*</span>
        </div>
      </div>

      <div className={styles.container6TableWrapper}>
        <Table className={styles.container6Table} aria-label="Key Requirements & Conditions">
          <Table.Header>
            <Table.Head className={styles.thCargoType6} isRowHeader>
              <div className={styles.thContent}>Cargo Type</div>
            </Table.Head>
            <Table.Head className={styles.thDem}>
              <div className={styles.thContent}>DEM (days)</div>
            </Table.Head>
            <Table.Head className={styles.thDet}>
              <div className={styles.thContent}>DET(days)</div>
            </Table.Head>
            <Table.Head className={styles.thDirect}>
              <div className={styles.thContent}>Direct/T/S</div>
            </Table.Head>
            <Table.Head className={styles.thFreq}>
              <div className={styles.thContent}>Frequency</div>
            </Table.Head>
          </Table.Header>
          <Table.Body>
            {MOCK_KEY_REQUIREMENTS.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell className={styles.tdCargoType6}>
                  <div className={styles.inputContent}>
                    <span className={styles.inputText}>{item.cargoType}</span>
                  </div>
                </Table.Cell>
                <Table.Cell className={styles.tdDem}>
                  <div className={styles.inputContent}>
                    <span className={styles.inputText}>{item.dem}</span>
                  </div>
                </Table.Cell>
                <Table.Cell className={styles.tdDet}>
                  <div className={styles.inputContent}>
                    <span className={styles.inputText}>{item.det}</span>
                  </div>
                </Table.Cell>
                <Table.Cell className={styles.tdDirect}>
                   <div className={styles.selectButtonSmall}>
                      <span className={styles.selectTextSmall}>{item.direct}</span>
                      <Image src="/icons/rfq-draft-rate/컨테이너6/Dropdown Icon.svg" alt="dropdown" width={20} height={20} />
                   </div>
                </Table.Cell>
                <Table.Cell className={styles.tdFreq}>
                   <div className={styles.selectButtonSmall}>
                      <span className={styles.selectTextSmall}>{item.freq}</span>
                      <Image src="/icons/rfq-draft-rate/컨테이너6/Dropdown Icon.svg" alt="dropdown" width={20} height={20} />
                   </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

// Container7: Ocean Freight
function Container7() {
  return (
    <div className={styles.container7}>
      <div className={styles.container7Header}>
        <div className={styles.container7LabelWrapper}>
          <span className={styles.container7Label}>Ocean Freight</span>
          <span className={styles.container7Asterisk}>*</span>
        </div>
      </div>

      <div className={styles.container7TableWrapper}>
        <Table className={styles.container7Table} aria-label="Ocean Freight">
          <Table.Header>
            <Table.Head className={styles.thCargoType7} isRowHeader>
              <div className={styles.thContent7}>Cargo Type</div>
            </Table.Head>
            <Table.Head className={styles.thSize7}>
              <div className={styles.thContent7}>20’</div>
            </Table.Head>
            <Table.Head className={styles.thSize7}>
              <div className={styles.thContent7}>40’</div>
            </Table.Head>
            <Table.Head className={styles.thSize7}>
              <div className={styles.thContent7}>HC</div>
            </Table.Head>
            <Table.Head className={styles.thSize7}>
              <div className={styles.thContent7}>45’</div>
            </Table.Head>
          </Table.Header>
          <Table.Body>
            {MOCK_OCEAN_FREIGHTS.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell className={styles.tdCargoType7}>
                  <div className={styles.cellWrapper7}>
                    <div className={styles.input7}>
                       <div className={styles.inputContent7}>
                          <span className={styles.inputText7}>{item.cargoType}</span>
                       </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className={styles.tdSize7}>
                  <div className={styles.cellWrapper7}>
                    <div className={styles.input7Size}>
                       <div className={styles.inputContent7}>
                          <span className={styles.inputText7}>{item.price20.toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className={styles.tdSize7}>
                  <div className={styles.cellWrapper7}>
                    <div className={styles.input7Size}>
                       <div className={styles.inputContent7}>
                          <span className={styles.inputText7}>{item.price40.toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className={styles.tdSize7}>
                  <div className={styles.cellWrapper7}>
                    <div className={styles.input7Size}>
                       <div className={styles.inputContent7}>
                          <span className={styles.inputText7}>{item.priceHC.toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className={styles.tdSize7}>
                  <div className={styles.cellWrapper7}>
                    <div className={styles.input7Size}>
                       <div className={styles.inputContent7}>
                          <span className={styles.inputText7}>{item.price45.toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

// Container8: Surchage
function Container8() {
  return (
    <div className={styles.container8}>
      <div className={styles.container8Header}>
        <div className={styles.container8LabelWrapper}>
          <span className={styles.container8Label}>Surchage</span>
          <span className={styles.container8Asterisk}>*</span>
        </div>
        <div className={styles.toggleWrapper}>
          <div className={styles.toggleBase}>
            <div className={styles.toggleButton} />
          </div>
          <div className={styles.currencyWrapper}>
            <span className={styles.currencyText}>USD</span>
            <span className={styles.currencySupportText}> (Reference Exchange Rate: 1,400 KRW)</span>
          </div>
        </div>
      </div>

      <div className={styles.container8TableWrapper}>
        <Table className={styles.container8Table} aria-label="Surcharge">
          <Table.Header>
            <Table.Head className={styles.thCargoType8} isRowHeader>
              <div className={styles.thContent8}>Cargo Type</div>
            </Table.Head>
            <Table.Head className={styles.thItem8}>
              <div className={styles.thContent8}>ITEM</div>
            </Table.Head>
            <Table.Head className={styles.thInc8}>
              <div className={styles.thContent8}>INC</div>
            </Table.Head>
            <Table.Head className={styles.thCurrency8}>
              <div className={styles.thContent8}>Currency</div>
            </Table.Head>
            <Table.Head className={styles.thSize8}>
              <div className={styles.thContent8}>20’</div>
            </Table.Head>
            <Table.Head className={styles.thSize8}>
              <div className={styles.thContent8}>40’</div>
            </Table.Head>
            <Table.Head className={styles.thSize8}>
              <div className={styles.thContent8}>HC</div>
            </Table.Head>
            <Table.Head className={styles.thSizeLast8}>
              <div className={styles.thContent8}>45’</div>
            </Table.Head>
          </Table.Header>
          <Table.Body>
            {MOCK_SURCHARGES.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell className={styles.tdCargoType8}>
                  <div className={styles.cellWrapper8}>
                    <div className={styles.input8}>
                       <div className={styles.inputContent8}>
                          <span className={styles.inputText8}>{item.cargoType}</span>
                       </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className={styles.tdItem8}>
                  <div className={styles.tdContent8}>
                    <span className={styles.tdTextSecondary8}>{item.item}</span>
                  </div>
                </Table.Cell>
                <Table.Cell className={styles.tdInc8}>
                  <div className={styles.checkbox8}></div>
                </Table.Cell>
                <Table.Cell className={styles.tdCurrency8}>
                   <div className={styles.selectButtonSmall8}>
                      <span className={styles.selectTextSmall8}>{item.currency}</span>
                      <Image src="/icons/rfq-draft-rate/컨테이너8/Dropdown Icon.svg" alt="dropdown" width={20} height={20} />
                   </div>
                </Table.Cell>
                <Table.Cell className={styles.tdSize8}>
                  <div className={styles.cellWrapper8}>
                    <div className={styles.input8Size}>
                       <div className={styles.inputContent8}>
                          <span className={styles.inputText8}>{item.price20.toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className={styles.tdSize8}>
                  <div className={styles.cellWrapper8}>
                    <div className={styles.input8Size}>
                       <div className={styles.inputContent8}>
                          <span className={styles.inputText8}>{item.price40.toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className={styles.tdSize8}>
                  <div className={styles.cellWrapper8}>
                    <div className={styles.input8Size}>
                       <div className={styles.inputContent8}>
                          <span className={styles.inputText8}>{item.priceHC.toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className={styles.tdSizeLast8}>
                  <div className={styles.cellWrapper8}>
                    <div className={styles.input8SizeLast}>
                       <div className={styles.inputContent8}>
                          <span className={styles.inputText8}>{item.price45.toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

// Container9: Internal Notes
function Container9() {
  return (
    <div className={styles.container9}>
      <div className={styles.container9Header}>
        <div className={styles.container9LabelWrapper}>
          <span className={styles.container9Label}>Internal Notes</span>
          <span className={styles.container9Asterisk}>*</span>
        </div>
      </div>
      <div className={styles.container9InputWrapper}>
        <textarea 
          className={styles.container9Textarea}
          placeholder="Enter internal notes..."
          defaultValue="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
        />
        <div className={styles.container9ResizeHandle}>
          <Image 
            src="/icons/rfq-draft-rate/컨테이너9/Resize handle.svg" 
            alt="resize handle" 
            width={12} 
            height={12} 
          />
        </div>
      </div>
    </div>
  );
}

interface RfqDraftRateProps {
  children?: React.ReactNode;
}

export default function RfqDraftRate({ children }: RfqDraftRateProps) {
  return (
    <div className={styles.root}>
      {/* Gap: 1626 * 16 */}
      <div className={styles.gapTop}></div>

      {/* 컨테이너 1: 1626 * 52 */}
      <div className={styles.container1}>
        {/* Left Section: AI Suggestions */}
        <div className={styles.aiSection}>
          <div className={styles.aiHeaderWrapper}>
            <span className={styles.aiHeaderTitle}>CARGO BUDDY AI Suggestions</span>
            <div className={styles.aiBadge}>
              <span className={styles.aiBadgeText}>New</span>
            </div>
          </div>

          <div className={styles.cargoTypeControl}>
            <div className={styles.labelWrapper}>
              <span className={styles.labelText}>Cargo Type</span>
              <span className={styles.asterisk}>*</span>
            </div>
            <div className={styles.selectButton}>
              <span className={styles.selectText}>DRY</span>
              <Image 
                src="/icons/rfq-draft-rate/컨테이너1/Dropdown Icon.svg" 
                alt="dropdown" 
                width={20} 
                height={20} 
              />
            </div>
          </div>

          <div className={styles.actionButtons}>
            <Button className={styles.primaryButton}>COPY</Button>
            <Button className={styles.primaryButton}>CM</Button>
          </div>
        </div>

        {/* Right Section: User Input */}
        <div className={styles.inputSection}>
          <span className={styles.inputHeader}>Your Input</span>
          
          <div className={styles.checkboxGroup}>
            <Checkbox 
              className={styles.checkboxItem}
              defaultSelected={true}
              label={<span className={styles.checkboxLabel}>DRY</span>}
            />
            <Checkbox 
              className={styles.checkboxItem}
              defaultSelected={true}
              label={<span className={styles.checkboxLabel}>REFFER</span>}
            />
            <Checkbox 
              className={styles.checkboxItem}
              defaultSelected={true}
              label={<span className={styles.checkboxLabel}>DG</span>}
            />
            <Checkbox 
              className={styles.checkboxItem}
              defaultSelected={true}
              label={<span className={styles.checkboxLabel}>OOG</span>}
            />
          </div>

          <Button className={styles.applyButton}>
            <span>Apply</span>
          </Button>
        </div>
      </div>

      {/* Gap: 1608 * 16 */}
      <div className={styles.gapMiddle1}></div>

      {/* 메인 콘텐츠 영역 */}
      <div className={styles.mainContent}>
        {/* 왼쪽 컬럼 */}
        <div className={styles.leftColumn}>
          {/* 컨테이너 2: 781 * 254 */}
          <div className={styles.container2}>
            <div className={styles.container2Header}>
              <div className={styles.container2LabelWrapper}>
                <span className={styles.container2Label}>AI Suggested Ocean Freight</span>
                <span className={styles.container2Asterisk}>*</span>
              </div>
            </div>
            
            <div className={styles.tableWrapper}>
              <Table className={styles.table} aria-label="AI Suggested Ocean Freight">
                <Table.Header>
                  <Table.Head className={styles.thCheckbox}>
                    <div className={styles.checkbox}></div>
                  </Table.Head>
                  <Table.Head className={styles.thCargoType} isRowHeader>Cargo Type</Table.Head>
                  <Table.Head className={styles.thSize}>20’</Table.Head>
                  <Table.Head className={styles.thSize}>40’</Table.Head>
                  <Table.Head className={styles.thSize}>HC</Table.Head>
                  <Table.Head className={styles.thSizeLast}>45’</Table.Head>
                </Table.Header>
                <Table.Body>
                  {MOCK_SUGGESTED_RATES.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell className={styles.tdCheckbox}>
                        <div className={styles.checkbox}>
                          {/* item.isSelected가 true일 때 체크 표시 로직 추가 가능 */}
                        </div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdCargoType}>
                        <div className={styles.cargoTypeSelect}>
                          <span>{item.cargoType}</span>
                          <Image 
                            src="/icons/rfq-draft-rate/컨테이너2/Dropdown Icon.svg" 
                            alt="dropdown" 
                            width={20} 
                            height={20} 
                          />
                        </div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdSize}>{item.price20.toLocaleString()}</Table.Cell>
                      <Table.Cell className={styles.tdSize}>{item.price40.toLocaleString()}</Table.Cell>
                      <Table.Cell className={styles.tdSize}>{item.priceHC.toLocaleString()}</Table.Cell>
                      <Table.Cell className={styles.tdSizeLast}>{item.price45.toLocaleString()}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>

          {/* Gap: 781 * 10 */}
          <div className={styles.gapLeft1}></div>

          {/* 컨테이너 3: 781 * 294 */}
          <div className={styles.container3}>
            <div className={styles.container3Header}>
              <div className={styles.container3LabelWrapper}>
                <span className={styles.container3Label}>Reference Ocean Freight</span>
                <span className={styles.container3Asterisk}>*</span>
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <Table className={styles.table} aria-label="Reference Ocean Freight">
                <Table.Header>
                  <Table.Head className={styles.thCheckbox}>
                    <div className={styles.checkbox}></div>
                  </Table.Head>
                  <Table.Head className={styles.thKind} isRowHeader>Kind</Table.Head>
                  <Table.Head className={styles.thCargoType2}>Cargo Type</Table.Head>
                  <Table.Head className={styles.thSize2}>20’</Table.Head>
                  <Table.Head className={styles.thSize2}>40’</Table.Head>
                  <Table.Head className={styles.thSize2}>HC</Table.Head>
                  <Table.Head className={styles.thSize2}>45’</Table.Head>
                </Table.Header>
                <Table.Body>
                  {MOCK_REFERENCE_RATES.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell className={styles.tdCheckbox}>
                        <div className={styles.checkbox}></div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdKind}>
                        <div className={styles.tdContent}>
                          <span className={styles.tdTextSecondary}>{item.kind}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdCargoType2}>
                        <div className={styles.cargoTypeSelect}>
                          <span>{item.cargoType}</span>
                          <Image 
                            src="/icons/rfq-draft-rate/컨테이너3/Dropdown Icon.svg" 
                            alt="dropdown" 
                            width={20} 
                            height={20} 
                          />
                        </div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdSize2}>
                        <div className={styles.tdContent}>
                          <span className={styles.tdTextSecondary}>{item.price20.toLocaleString()}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdSize2}>
                        <div className={styles.tdContent}>
                          <span className={styles.tdTextSecondary}>{item.price40.toLocaleString()}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdSize2}>
                        <div className={styles.tdContent}>
                          <span className={styles.tdTextSecondary}>{item.priceHC.toLocaleString()}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdSize2}>
                        <div className={styles.tdContent}>
                          <span className={styles.tdTextSecondary}>{item.price45.toLocaleString()}</span>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>

          {/* Gap: 781 * 10 */}
          <div className={styles.gapLeft2}></div>

          {/* 컨테이너 4: 781 * 294 */}
          <div className={styles.container4}>
            <div className={styles.container4Header}>
              <div className={styles.container4LabelWrapper}>
                <span className={styles.container4Label}>AI Suggested  Surchage</span>
                <span className={styles.container4Asterisk}>*</span>
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <Table className={styles.table} aria-label="AI Suggested Surcharge">
                <Table.Header>
                  <Table.Head className={styles.thCheckbox}>
                    <div className={styles.checkbox}></div>
                  </Table.Head>
                  <Table.Head className={styles.thCargoType4} isRowHeader>Cargo Type</Table.Head>
                  <Table.Head className={styles.thItem}>ITEM</Table.Head>
                  <Table.Head className={styles.thInc}>INC</Table.Head>
                  <Table.Head className={styles.thCurrency}>Currency</Table.Head>
                  <Table.Head className={styles.thSize4}>20’</Table.Head>
                  <Table.Head className={styles.thSizeLast4}>40’</Table.Head>
                  <Table.Head className={styles.thSizeLast4}>HC</Table.Head>
                  <Table.Head className={styles.thSizeLast5}>45’</Table.Head>
                </Table.Header>
                <Table.Body>
                  {MOCK_SUGGESTED_SURCHARGES.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell className={styles.tdCheckbox}>
                        <div className={styles.checkbox}></div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdCargoType4}>
                        <div className={styles.cargoTypeSelect}>
                          <span>{item.cargoType}</span>
                          <Image 
                            src="/icons/rfq-draft-rate/컨테이너4/Dropdown Icon.svg" 
                            alt="dropdown" 
                            width={20} 
                            height={20} 
                          />
                        </div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdItem}>
                         <div className={styles.tdContent}>
                          <span className={styles.tdTextSecondary}>{item.item}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdInc}>
                        <div className={styles.checkbox}></div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdCurrency}>
                        <div className={styles.cargoTypeSelect} style={{width: '87px'}}>
                          <span>{item.currency}</span>
                          <Image 
                            src="/icons/rfq-draft-rate/컨테이너4/Dropdown Icon.svg" 
                            alt="dropdown" 
                            width={20} 
                            height={20} 
                          />
                        </div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdSize4}>
                        <div className={styles.tdContent}>
                          <span className={styles.tdTextSecondary}>{item.price20.toLocaleString()}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdSizeLast4}>
                        <div className={styles.tdContent}>
                          <span className={styles.tdTextSecondary}>{item.price40.toLocaleString()}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdSizeLast4}>
                        <div className={styles.tdContent}>
                          <span className={styles.tdTextSecondary}>{item.priceHC.toLocaleString()}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell className={styles.tdSizeLast5}>
                        <div className={styles.tdContent}>
                          <span className={styles.tdTextSecondary}>{item.price45.toLocaleString()}</span>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>

          {/* Gap: 781 * 10 */}
          <div className={styles.gapLeft3}></div>

          {/* 컨테이너 5: 780 * 94 */}
          <div className={styles.container5}>
            <div className={styles.container5Header}>
              <div className={styles.container5LabelWrapper}>
                <span className={styles.container5Label}>Executive Summary</span>
                <span className={styles.container5Asterisk}>*</span>
              </div>
            </div>
            <div className={styles.container5Input}>
              <div className={styles.container5Text}>
                This RFQ is not a simple freight rate quotation, but rather a &ldquo;Request for Strategic Partnership Proposal focused on long-term contract-based supply stability.&rdquo;
              </div>
              <div className={styles.container5ResizeHandle}>
                <Image 
                  src="/icons/rfq-draft-rate/컨테이너5/컨티.svg" 
                  alt="resize handle" 
                  width={12} 
                  height={12} 
                />
              </div>
            </div>
          </div>

          {/* Gap: 780 * 16 */}
          <div className={styles.gapLeft4}></div>
        </div>

        {/* 중앙 간격 */}
        <div className={styles.gapCenter}></div>

        {/* 오른쪽 컬럼 */}
        <div className={styles.rightColumn}>
          {/* 컨테이너 6: 781 * 260 */}
          <Container6 />

          {/* Gap: 781 * 10 */}
          <div className={styles.gapRight1}></div>

          {/* 컨테이너 7: 781 * 288 */}
          <Container7 />

          {/* Gap: 781 * 10 */}
          <div className={styles.gapRight2}></div>

          {/* 컨테이너 8: 781 * 295 */}
          <Container8 />

          {/* Gap: 781 * 10 */}
          <div className={styles.gapRight3}></div>

          {/* 컨테이너 9: 780 * 176 */}
          <Container9 />

          {/* Gap: 780 * 16 */}
          <div className={styles.gapRight4}></div>
        </div>
      </div>

      {children}
    </div>
  );
}
