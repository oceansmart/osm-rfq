/**
 * Mock 일기 데이터 생성 및 로컬스토리지 등록 스크립트
 *
 * 사용법:
 * 1. 개발 서버 실행 (npm run dev)
 * 2. 브라우저 콘솔에서 이 스크립트 실행
 *
 * 또는 HTML 파일로 만들어서 직접 실행
 */

// Emotion Enum (enum.ts와 동일)
const Emotion = {
  HAPPY: 'HAPPY',
  SAD: 'SAD',
  ANGRY: 'ANGRY',
  SURPRISE: 'SURPRISE',
  ETC: 'ETC',
};

/**
 * Mock 일기 데이터 생성
 * @param {number} count - 생성할 데이터 개수
 * @returns {Array} 일기 데이터 배열
 */
function generateMockDiaries(count = 36) {
  const emotions = [Emotion.HAPPY, Emotion.SAD, Emotion.ANGRY, Emotion.SURPRISE];
  const titles = {
    HAPPY: [
      '행복한 하루',
      '즐거운 주말',
      '기쁜 소식',
      '행복한 순간',
      '웃음 가득한 날',
      '즐거운 여행',
      '행복한 만남',
      '기분 좋은 아침',
      '즐거운 저녁',
    ],
    SAD: [
      '슬픈 하루',
      '우울한 날',
      '슬픈 이야기',
      '눈물의 기록',
      '아쉬운 순간',
      '슬픈 추억',
      '우울한 저녁',
      '슬픈 기억',
      '아픈 마음',
    ],
    ANGRY: [
      '화나는 일',
      '짜증나는 하루',
      '분노의 기록',
      '화가 난 순간',
      '억울한 일',
      '짜증나는 상황',
      '화난 하루',
      '분한 마음',
      '속상한 일',
    ],
    SURPRISE: [
      '놀라운 발견',
      '깜짝 놀란 일',
      '예상치 못한 일',
      '놀라운 소식',
      '깜짝 이벤트',
      '놀라운 순간',
      '예기치 않은 만남',
      '놀라운 경험',
      '깜짝 선물',
    ],
  };

  const contents = {
    HAPPY: [
      '오늘은 정말 행복한 날이었다',
      '좋은 일이 가득한 하루였다',
      '기분이 너무 좋았다',
      '행복한 시간을 보냈다',
      '즐거운 경험을 했다',
    ],
    SAD: [
      '슬픈 일이 있었다',
      '우울한 기분이었다',
      '마음이 아팠다',
      '슬픈 일을 겪었다',
      '눈물이 났다',
    ],
    ANGRY: [
      '오늘 화가 났다',
      '짜증나는 일이 있었다',
      '화가 나서 참기 힘들었다',
      '분한 일을 겪었다',
      '속상한 일이 있었다',
    ],
    SURPRISE: [
      '놀라운 일이 생겼다',
      '깜짝 놀랐다',
      '예상치 못한 일이 일어났다',
      '놀라운 경험을 했다',
      '정말 놀라웠다',
    ],
  };

  const diaries = [];
  const today = new Date();

  for (let i = 1; i <= count; i++) {
    // 감정을 순환하며 할당
    const emotion = emotions[(i - 1) % emotions.length];

    // 해당 감정의 제목과 내용 중 랜덤 선택
    const titleList = titles[emotion];
    const contentList = contents[emotion];
    const title = titleList[(i - 1) % titleList.length];
    const content = contentList[(i - 1) % contentList.length];

    // 날짜는 오늘부터 역순으로 (최신이 위로)
    const createdDate = new Date(today);
    createdDate.setDate(today.getDate() - (i - 1));

    diaries.push({
      id: i,
      title: `${title} ${i}`,
      content: `${content} (일기 번호: ${i})`,
      emotion: emotion,
      createdAt: createdDate.toISOString(),
    });
  }

  return diaries;
}

/**
 * 로컬스토리지에 일기 데이터 저장
 * @param {Array} diaries - 일기 데이터 배열
 */
function saveDiariesToLocalStorage(diaries) {
  try {
    localStorage.setItem('diaries', JSON.stringify(diaries));
    console.log(`✅ ${diaries.length}개의 일기 데이터가 로컬스토리지에 저장되었습니다.`);
    console.log('📊 데이터 미리보기:');
    console.table(diaries.slice(0, 5));
    return true;
  } catch (error) {
    console.error('❌ 로컬스토리지 저장 실패:', error);
    return false;
  }
}

/**
 * 로컬스토리지에서 일기 데이터 조회
 */
function getDiariesFromLocalStorage() {
  try {
    const data = localStorage.getItem('diaries');
    if (data) {
      const diaries = JSON.parse(data);
      console.log(`📖 현재 저장된 일기 개수: ${diaries.length}개`);
      console.table(diaries.slice(0, 5));
      return diaries;
    } else {
      console.log('📭 저장된 일기 데이터가 없습니다.');
      return [];
    }
  } catch (error) {
    console.error('❌ 로컬스토리지 조회 실패:', error);
    return [];
  }
}

/**
 * 로컬스토리지 일기 데이터 삭제
 */
function clearDiariesFromLocalStorage() {
  localStorage.removeItem('diaries');
  console.log('🗑️ 로컬스토리지의 일기 데이터가 삭제되었습니다.');
}

/**
 * 메인 실행 함수
 */
function setupMockDiaries() {
  console.log('🚀 Mock 일기 데이터 생성 시작...');

  // 36개의 Mock 데이터 생성 (페이지네이션 테스트용: 3페이지)
  const mockDiaries = generateMockDiaries(36);

  // 로컬스토리지에 저장
  const success = saveDiariesToLocalStorage(mockDiaries);

  if (success) {
    console.log('✨ Mock 데이터 설정 완료!');
    console.log('📄 페이지네이션 테스트 정보:');
    console.log(`   - 총 데이터 수: ${mockDiaries.length}개`);
    console.log(`   - 페이지당 표시: 12개`);
    console.log(`   - 예상 페이지 수: ${Math.ceil(mockDiaries.length / 12)}페이지`);
    console.log('\n페이지를 새로고침하세요! (F5 또는 Cmd+R)');
  }
}

// 브라우저 환경에서 실행
if (typeof window !== 'undefined') {
  // 전역 함수로 등록
  window.setupMockDiaries = setupMockDiaries;
  window.getDiaries = getDiariesFromLocalStorage;
  window.clearDiaries = clearDiariesFromLocalStorage;

  console.log('📌 사용 가능한 함수:');
  console.log('   - setupMockDiaries(): Mock 데이터 생성 및 저장');
  console.log('   - getDiaries(): 현재 저장된 데이터 조회');
  console.log('   - clearDiaries(): 저장된 데이터 삭제');
}

// Node.js 환경에서 실행 (테스트용)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateMockDiaries,
    saveDiariesToLocalStorage,
    getDiariesFromLocalStorage,
    clearDiariesFromLocalStorage,
    setupMockDiaries,
  };
}
