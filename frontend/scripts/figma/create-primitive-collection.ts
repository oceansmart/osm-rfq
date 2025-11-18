/**
 * Figma REST API를 사용하여 Primitive Collection 생성
 *
 * @description
 * Blue와 Neutral 색상 팔레트를 Figma Variables로 자동 등록하는 스크립트
 *
 * @requires
 * - FIGMA_ACCESS_TOKEN: Figma Personal Access Token
 * - FIGMA_FILE_KEY: 대상 Figma 파일 키
 *
 * @usage
 * FIGMA_ACCESS_TOKEN=your_token FIGMA_FILE_KEY=your_file_key npm run figma:create-primitive
 */

interface FigmaVariableCollection {
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  id: string;
  name: string;
  initialModeId: string;
  hiddenFromPublishing?: boolean;
}

interface FigmaVariableMode {
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  id: string;
  name: string;
  variableCollectionId: string;
}

interface FigmaVariable {
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  id: string;
  name: string;
  variableCollectionId: string;
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';
  scopes?: Array<'ALL_FILLS' | 'ALL_STROKES' | 'TEXT_FILL' | 'STROKE_COLOR' | 'SHAPE_FILL'>;
  description?: string;
  hiddenFromPublishing?: boolean;
}

interface FigmaVariableModeValue {
  variableId: string;
  modeId: string;
  value: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

interface FigmaPostVariablesRequest {
  variableCollections?: FigmaVariableCollection[];
  variableModes?: FigmaVariableMode[];
  variables?: FigmaVariable[];
  variableModeValues?: FigmaVariableModeValue[];
}

interface FigmaPostVariablesResponse {
  status: number;
  error: boolean;
  tempIdToRealId: Record<string, string>;
}

// Primitive Color System - Blue Palette
const BLUE_COLORS: Record<string, string> = {
  'blue-50': '#E6E8FF',
  'blue-100': '#C0C5FF',
  'blue-200': '#94A3FF',
  'blue-300': '#667FFF',
  'blue-400': '#4062FF',
  'blue-500': '#004FFF', // Primary
  'blue-600': '#0040F1',
  'blue-700': '#0035E2',
  'blue-800': '#002AD6',
  'blue-900': '#0014C4',
};

// Primitive Color System - Neutral Palette
const NEUTRAL_COLORS: Record<string, string> = {
  'Neutral0': '#FFFFFF',
  'Neutral100': '#F2F8FC',
  'Neutral200': '#E8EEF2',
  'Neutral300': '#BBC5CC',
  'Neutral400': '#A4ADB2',
  'Neutral500': '#8C9499',
  'Neutral600': '#757B80',
  'Neutral700': '#5E6366',
  'Neutral800': '#464A4D',
  'Neutral900': '#2F3133',
  'Neutral1000': '#17191A',
  'Neutral1100': '#000000',
};

/**
 * HEX 색상을 RGBA 객체로 변환
 */
function hexToRgba(hex: string): { r: number; g: number; b: number; a: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
    a: 1,
  };
}

/**
 * Figma API 클라이언트
 */
class FigmaApiClient {
  private readonly baseUrl = 'https://api.figma.com/v1';
  private readonly accessToken: string;
  private readonly fileKey: string;

  constructor(accessToken: string, fileKey: string) {
    this.accessToken = accessToken;
    this.fileKey = fileKey;
  }

  /**
   * Figma Variables API 호출
   */
  async postVariables(data: FigmaPostVariablesRequest): Promise<FigmaPostVariablesResponse> {
    const url = `${this.baseUrl}/files/${this.fileKey}/variables`;

    console.log('📡 Figma API 요청 시작...');
    console.log(`URL: ${url}`);
    console.log(`데이터 크기: ${JSON.stringify(data).length} bytes`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Figma-Token': this.accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Figma API 에러 (${response.status}): ${errorText}`
      );
    }

    const result = await response.json();
    console.log('✅ API 요청 성공!');
    return result;
  }

  /**
   * 기존 Variables 조회
   */
  async getLocalVariables(): Promise<any> {
    const url = `${this.baseUrl}/files/${this.fileKey}/variables/local`;

    console.log('📡 기존 Variables 조회 중...');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Figma-Token': this.accessToken,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Figma API 에러 (${response.status}): ${errorText}`
      );
    }

    const result = await response.json();
    console.log('✅ Variables 조회 완료!');
    return result;
  }
}

/**
 * Primitive Collection 생성 요청 데이터 구성
 */
function buildPrimitiveCollectionRequest(): FigmaPostVariablesRequest {
  const collectionTempId = 'temp-collection-primitive';
  const modeTempId = 'temp-mode-default';

  // 1. Collection 생성
  const variableCollections: FigmaVariableCollection[] = [
    {
      action: 'CREATE',
      id: collectionTempId,
      name: 'Primitive',
      initialModeId: modeTempId,
      hiddenFromPublishing: false,
    },
  ];

  // 2. Default Mode 생성
  const variableModes: FigmaVariableMode[] = [
    {
      action: 'CREATE',
      id: modeTempId,
      name: 'Default',
      variableCollectionId: collectionTempId,
    },
  ];

  // 3. Variables 생성 (Blue + Neutral)
  const variables: FigmaVariable[] = [];
  const variableModeValues: FigmaVariableModeValue[] = [];

  // Blue 색상 추가
  Object.entries(BLUE_COLORS).forEach(([name, hexColor], index) => {
    const varTempId = `temp-var-${name}`;

    variables.push({
      action: 'CREATE',
      id: varTempId,
      name,
      variableCollectionId: collectionTempId,
      resolvedType: 'COLOR',
      scopes: ['ALL_FILLS', 'ALL_STROKES', 'TEXT_FILL'],
      description: name === 'blue-500' ? 'Primary blue color' : `Blue ${name.split('-')[1]} shade`,
    });

    variableModeValues.push({
      variableId: varTempId,
      modeId: modeTempId,
      value: hexToRgba(hexColor),
    });
  });

  // Neutral 색상 추가
  Object.entries(NEUTRAL_COLORS).forEach(([name, hexColor], index) => {
    const varTempId = `temp-var-${name}`;

    variables.push({
      action: 'CREATE',
      id: varTempId,
      name,
      variableCollectionId: collectionTempId,
      resolvedType: 'COLOR',
      scopes: ['ALL_FILLS', 'ALL_STROKES', 'TEXT_FILL'],
      description:
        name === 'Neutral0' ? 'White' :
        name === 'Neutral1100' ? 'Black' :
        `Neutral ${name.replace('Neutral', '')} shade`,
    });

    variableModeValues.push({
      variableId: varTempId,
      modeId: modeTempId,
      value: hexToRgba(hexColor),
    });
  });

  return {
    variableCollections,
    variableModes,
    variables,
    variableModeValues,
  };
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('🎨 Figma Primitive Collection 생성 시작\n');

  // 환경 변수 검증
  const accessToken = process.env.FIGMA_ACCESS_TOKEN;
  const fileKey = process.env.FIGMA_FILE_KEY;

  if (!accessToken) {
    throw new Error('❌ FIGMA_ACCESS_TOKEN 환경 변수가 설정되지 않았습니다.');
  }

  if (!fileKey) {
    throw new Error('❌ FIGMA_FILE_KEY 환경 변수가 설정되지 않았습니다.');
  }

  console.log(`📁 Figma File Key: ${fileKey}`);
  console.log(`🔑 Access Token: ${accessToken.slice(0, 10)}...`);
  console.log('');

  // Figma API 클라이언트 생성
  const client = new FigmaApiClient(accessToken, fileKey);

  try {
    // 기존 Variables 조회 (선택사항)
    console.log('📋 기존 Variables 확인 중...\n');
    const existingVariables = await client.getLocalVariables();

    if (existingVariables.meta?.variableCollections) {
      const collections = Object.values(existingVariables.meta.variableCollections) as any[];
      const primitiveExists = collections.some((c: any) => c.name === 'Primitive');

      if (primitiveExists) {
        console.log('⚠️  경고: "Primitive" Collection이 이미 존재합니다!');
        console.log('계속 진행하면 중복 생성될 수 있습니다.\n');
      }
    }

    // Primitive Collection 생성
    console.log('🏗️  Primitive Collection 생성 중...\n');
    const requestData = buildPrimitiveCollectionRequest();

    console.log('📊 생성할 항목:');
    console.log(`  - Collections: ${requestData.variableCollections?.length || 0}개`);
    console.log(`  - Modes: ${requestData.variableModes?.length || 0}개`);
    console.log(`  - Variables: ${requestData.variables?.length || 0}개`);
    console.log(`    • Blue: ${Object.keys(BLUE_COLORS).length}개`);
    console.log(`    • Neutral: ${Object.keys(NEUTRAL_COLORS).length}개`);
    console.log(`  - Mode Values: ${requestData.variableModeValues?.length || 0}개\n`);

    // API 호출
    const response = await client.postVariables(requestData);

    // 결과 출력
    console.log('\n✨ Primitive Collection 생성 완료!\n');
    console.log('🎯 생성된 ID 매핑:');
    console.log(JSON.stringify(response.tempIdToRealId, null, 2));
    console.log('\n🔗 Figma에서 확인:');
    console.log(`https://www.figma.com/file/${fileKey}`);
    console.log('\n💡 다음 단계:');
    console.log('  1. Figma를 열고 Variables 패널 확인');
    console.log('  2. "Primitive" Collection에서 모든 색상 확인');
    console.log('  3. 컴포넌트에 Variables 적용 시작');

  } catch (error) {
    console.error('\n❌ 에러 발생:', error);
    throw error;
  }
}

// 스크립트 실행
if (require.main === module) {
  main()
    .then(() => {
      console.log('\n✅ 스크립트 실행 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ 스크립트 실행 실패:', error.message);
      process.exit(1);
    });
}

export { FigmaApiClient, buildPrimitiveCollectionRequest, hexToRgba };
