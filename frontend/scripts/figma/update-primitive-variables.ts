/**
 * Figma REST API를 사용하여 기존 Primitive Collection Variables 업데이트
 *
 * @description
 * 이미 생성된 Primitive Collection의 색상 값을 업데이트하는 스크립트
 *
 * @requires
 * - FIGMA_ACCESS_TOKEN: Figma Personal Access Token
 * - FIGMA_FILE_KEY: 대상 Figma 파일 키
 *
 * @usage
 * FIGMA_ACCESS_TOKEN=your_token FIGMA_FILE_KEY=your_file_key npm run figma:update-primitive
 */

import { FigmaApiClient, hexToRgba } from './create-primitive-collection';

interface UpdateVariableValue {
  variableName: string;
  newHexColor: string;
  description?: string;
}

// 업데이트할 색상 목록 (예시)
const VARIABLES_TO_UPDATE: UpdateVariableValue[] = [
  {
    variableName: 'blue-500',
    newHexColor: '#004FFF',
    description: 'Updated primary blue color',
  },
  // 필요한 경우 여기에 추가
];

/**
 * 기존 Primitive Collection의 Variables 업데이트
 */
async function updatePrimitiveVariables() {
  console.log('🔄 Figma Primitive Variables 업데이트 시작\n');

  // 환경 변수 검증
  const accessToken = process.env.FIGMA_ACCESS_TOKEN;
  const fileKey = process.env.FIGMA_FILE_KEY;

  if (!accessToken || !fileKey) {
    throw new Error('❌ FIGMA_ACCESS_TOKEN 또는 FIGMA_FILE_KEY가 설정되지 않았습니다.');
  }

  console.log(`📁 Figma File Key: ${fileKey}`);
  console.log(`🔑 Access Token: ${accessToken.slice(0, 10)}...`);
  console.log('');

  // Figma API 클라이언트 생성
  const client = new FigmaApiClient(accessToken, fileKey);

  try {
    // 1. 기존 Variables 조회
    console.log('📋 기존 Variables 조회 중...\n');
    const existingData = await client.getLocalVariables();

    // 2. Primitive Collection 찾기
    const collections = Object.entries(
      existingData.meta?.variableCollections || {}
    ) as [string, any][];

    const primitiveCollection = collections.find(
      ([_, collection]) => collection.name === 'Primitive'
    );

    if (!primitiveCollection) {
      throw new Error(
        '❌ "Primitive" Collection을 찾을 수 없습니다. 먼저 create-primitive-collection.ts를 실행하세요.'
      );
    }

    const [collectionId, collectionData] = primitiveCollection;
    console.log(`✅ Primitive Collection 발견: ${collectionId}`);
    console.log(`   Mode: ${collectionData.defaultModeId}\n`);

    // 3. 업데이트할 Variables 찾기
    const variables = Object.entries(
      existingData.meta?.variables || {}
    ) as [string, any][];

    const variableModeValues = [];

    for (const updateItem of VARIABLES_TO_UPDATE) {
      const foundVariable = variables.find(
        ([_, variable]) =>
          variable.name === updateItem.variableName &&
          variable.variableCollectionId === collectionId
      );

      if (foundVariable) {
        const [varId, varData] = foundVariable;
        console.log(`🎨 업데이트: ${updateItem.variableName} → ${updateItem.newHexColor}`);

        variableModeValues.push({
          variableId: varId,
          modeId: collectionData.defaultModeId,
          value: hexToRgba(updateItem.newHexColor),
        });
      } else {
        console.warn(`⚠️  경고: "${updateItem.variableName}" Variable을 찾을 수 없습니다.`);
      }
    }

    if (variableModeValues.length === 0) {
      console.log('ℹ️  업데이트할 Variables가 없습니다.');
      return;
    }

    // 4. API 호출
    console.log(`\n📡 ${variableModeValues.length}개 Variables 업데이트 중...\n`);

    const response = await client.postVariables({
      variableModeValues,
    });

    console.log('✨ 업데이트 완료!\n');
    console.log('🔗 Figma에서 확인:');
    console.log(`https://www.figma.com/file/${fileKey}`);

  } catch (error) {
    console.error('\n❌ 에러 발생:', error);
    throw error;
  }
}

// 스크립트 실행
if (require.main === module) {
  updatePrimitiveVariables()
    .then(() => {
      console.log('\n✅ 스크립트 실행 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ 스크립트 실행 실패:', error.message);
      process.exit(1);
    });
}

export { updatePrimitiveVariables };
