/**
 * URL Constants
 * OSM RFQ 시스템의 모든 URL 경로 중앙 관리
 */

/**
 * 접근 권한 타입
 */
export type AccessLevel = 'all' | 'user' | 'admin';

/**
 * Route 설정 인터페이스
 */
export interface RouteConfig {
  path: string;
  name: string;
  access: AccessLevel;
  componentPath: string;
}

/**
 * 전체 Routes 맵
 */
export const ROUTES: Record<string, RouteConfig> = {
  LOGIN: {
    path: '/auth/login',
    name: 'Log in',
    access: 'all',
    componentPath: 'frontend/src/components/auth-login',
  },

  DASHBOARD: {
    path: '/',
    name: 'Dashboard',
    access: 'user',
    componentPath: 'frontend/src/components/dashboard',
  },

  RFQ_LIST: {
    path: '/rfq',
    name: 'RFQ Management List',
    access: 'user',
    componentPath: 'frontend/src/components/rfq-list',
  },

  RFQ_DETAIL: {
    path: '/rfq/[id]',
    name: 'RFQ Detail',
    access: 'user',
    componentPath: 'frontend/src/components/rfq-detail/[id]',
  },

  EMAIL_PREVIEW: {
    path: '/rfq/email-preview',
    name: 'Email Preview',
    access: 'user',
    componentPath: 'frontend/src/components/email-preview',
  },

  DRAFT_RATE: {
    path: '/bidding/draft/create',
    name: 'Create Draft Rate',
    access: 'user',
    componentPath: 'frontend/src/components/draft-rate',
  },

  QUOTATION_GENERATOR: {
    path: '/bidding/quotation',
    name: 'Quotation Generator',
    access: 'user',
    componentPath: 'frontend/src/components/quotation-generator',
  },

  EMAIL_COMPOSITION: {
    path: '/bidding/email',
    name: 'Email Composition',
    access: 'user',
    componentPath: 'frontend/src/components/email-composition',
  },
} as const;

/**
 * Helper 함수: 경로에 따른 RouteConfig 가져오기
 */
export function getLayoutConfig(pathname: string): RouteConfig | undefined {
  return Object.values(ROUTES).find(route => {
    // 다이나믹 라우트 처리
    if (route.path.includes('[id]')) {
      const pattern = route.path.replace('[id]', '\\d+');
      return new RegExp(`^${pattern}$`).test(pathname);
    }
    return route.path === pathname;
  });
}

/**
 * Helper 함수: 다이나믹 경로 생성
 */
export function createDynamicPath(routeKey: string, params: Record<string, string | number>): string {
  const route = ROUTES[routeKey as keyof typeof ROUTES];
  if (!route) return '/';

  let path = route.path;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`[${key}]`, String(value));
  });

  return path;
}
