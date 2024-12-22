 Protein Road 🥗

단백질 식단 관리를 위한 맛집 찾기 앱

## 주요 기능

### 🗺️ 지도 기반 맛집 탐색
- 네이버 맵 API를 활용한 맛집 위치 표시
- 맞춤형 마커 아이콘으로 정보 상태 표시
  - 영양정보 있음
  - 영양정보 분석 중
  - 영양정보 없음

### 📊 영양 정보 제공
- 메뉴별 상세 영양 성분 정보
  - 칼로리
  - 단백질
  - 탄수화물
  - 지방
- 국가 영양성분 데이터베이스 기반 정보 제공

### 👥 커뮤니티 기반 정보 수집
- 사용자 관심도 기반 영양정보 분석 요청
- 10명 이상 관심 등록 시 전문기관 영양 분석 진행
- 실시간 관심도 현황 표시

## 기술 스택

### Frontend
- React Native + Expo
- TypeScript
- React Navigation
- Reanimated
- Naver Maps API

### Backend
- AWS Lambda
- DynamoDB
- API Gateway
- S3

### Database
- SQLite (로컬)
  - 레스토랑 정보
  - 메뉴 정보
  - 영양 성분 데이터

## 프로젝트 구조
tree
protein-road/
├── app/
│ ├── (tabs)/
│ │ ├── layout.tsx
│ │ ├── index.tsx
│ │ └── Map.tsx
│ └── (screens)/
├── components/
│ ├── map/
│ │ ├── CustomMarker.tsx
│ │ ├── CustomBottomSheet.tsx
│ │ ├── CustomMenu.tsx
│ │ └── CustomMenuNotfound.tsx
│ └── render/
│ ├── MapMarkerRenderer.tsx
│ ├── BannerRenderer.tsx
│ └── ContentRenderer.tsx
├── utils/
│ └── database.ts
├── store/
│ └── useProteinStore.ts
└── assets/
├── contents/
├── fonts/
└── lotties/

## 환경 설정

의존성 설치
npm install
개발 서버 실행
npx expo prebuild
iOS 시뮬레이터 실행
npx expo run:ios
안드로이드 에뮬레이터 실행
npx expo run:android


### 필수 환경 변수
NAVER_MAP_CLIENT_ID=your_client_id
AWS_API_ENDPOINT=your_api_endpoint

### 개발 환경 요구사항
- Node.js 16.x 이상
- Expo CLI
- iOS 시뮬레이터 또는 안드로이드 에뮬레이터
- Xcode (iOS 빌드용)
- Android Studio (안드로이드 빌드용)

## 라이선스
MIT License
