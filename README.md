# 🔄 WebP 이미지 변환기

**무료 온라인 이미지 포맷 변환 도구 - Cloudflare Pages + Google AdSense 최적화**

WebP, JPEG, PNG, GIF 이미지 포맷을 쉽고 빠르게 상호 변환할 수 있는 클라이언트 사이드 웹 애플리케이션입니다. Cloudflare Pages 배포 및 Google AdSense 수익화까지 완벽 지원!

## ✨ 주요 기능

### 🎯 현재 구현된 기능
- ✅ **드래그 앤 드롭** - 이미지 파일을 끌어다 놓아 간편 업로드
- ✅ **다중 파일 처리** - 여러 파일 동시 변환 (배치 처리)
- ✅ **실시간 미리보기** - 원본과 변환된 이미지 비교 보기
- ✅ **품질 조절** - 10%~100% 사용자 정의 압축 품질
- ✅ **포맷 상호 변환** - WebP ↔ JPEG, PNG, GIF 자유 변환
- ✅ **파일 크기 최적화** - 압축률 표시 및 파일 크기 비교
- ✅ **반응형 디자인** - 모바일 및 데스크톱 최적화
- ✅ **보안성** - 모든 처리가 브라우저에서 진행 (서버 업로드 없음)
- ✅ **키보드 단축키** - Ctrl+O(파일 선택), Enter(변환), Ctrl+R(초기화)

### 🔧 지원 기능
| 기능 | 상세 내용 |
|------|-----------|
| **입력 포맷** | WebP, JPEG, JPG, PNG, GIF |
| **출력 포맷** | WebP, JPEG, PNG, GIF |
| **최대 파일 크기** | 10MB per file |
| **배치 처리** | 다중 파일 동시 변환 |
| **품질 설정** | 10% - 100% (JPEG, WebP) |
| **다운로드** | 개별/전체 다운로드 |

## 🚀 사용법

### 1. 파일 업로드
- **드래그 앤 드롭**: 이미지 파일을 변환 박스에 끌어다 놓기
- **파일 선택**: "파일 선택" 버튼 클릭 또는 박스 클릭
- **키보드**: `Ctrl + O` 단축키 사용

### 2. 변환 설정
- **출력 포맷 선택**: WebP, JPEG, PNG, GIF 중 선택
- **품질 조절**: 슬라이더로 10~100% 품질 설정
- **자동 제안**: 입력 포맷에 따른 최적 출력 포맷 자동 제안

### 3. 변환 실행
- **단일 파일**: "변환 시작" 버튼 클릭
- **다중 파일**: "모두 변환" 버튼 클릭
- **키보드**: `Enter` 키로 변환 시작

### 4. 다운로드
- **개별 다운로드**: 변환 완료 후 "다운로드" 버튼
- **일괄 다운로드**: "모두 다운로드" 버튼으로 전체 파일 다운로드

## 📁 프로젝트 구조

```
📦 webp-converter/
├── 📄 index.html                    # 메인 HTML 파일
├── 📄 cloudflare-index.html         # Cloudflare Pages + AdSense 최적화 버전
├── 📄 blog-converter.html           # 블로그용 완전 기능 버전
├── 📄 simple-converter.html         # 블로그용 간소 버전
├── 📁 css/
│   └── 📄 style.css                # 전체 스타일시트
├── 📁 js/
│   └── 📄 converter.js             # 이미지 변환 로직
├── 📄 robots.txt                   # SEO 최적화
├── 📄 sitemap.xml                  # 사이트맵
├── 📄 _redirects                   # Cloudflare Pages 리다이렉트
├── 📄 adsense-setup-guide.md       # Google AdSense 설정 가이드
├── 📄 cloudflare-deploy-guide.md   # Cloudflare Pages 배포 가이드
├── 📄 blog-upload-guide.md         # 블로그 업로드 가이드
└── 📄 README.md                    # 프로젝트 문서
```

## 🔗 주요 진입점 및 URI

### 메인 페이지
- **경로**: `/index.html`
- **기능**: 이미지 변환기 메인 인터페이스
- **매개변수**: 없음

### JavaScript API
```javascript
// 주요 함수들
convertImage(file, targetFormat, quality)  // 개별 이미지 변환
processFiles(files)                        // 파일 배열 처리
downloadBlob(blob, filename)               // 변환된 파일 다운로드
resetApplication()                         // 애플리케이션 초기화
```

## 🛠️ 기술 스택

### Frontend
- **HTML5** - 시맨틱 마크업 및 Canvas API
- **CSS3** - 그래디언트, 애니메이션, 반응형 디자인
- **Vanilla JavaScript** - ES6+ 문법, Promise, Canvas 처리
- **Font Awesome** - 아이콘 시스템
- **Google Fonts (Inter)** - 타이포그래피

### 이미지 처리
- **Canvas API** - 이미지 변환 및 압축
- **FileReader API** - 파일 읽기 및 미리보기
- **Blob API** - 변환된 파일 생성 및 다운로드

### 브라우저 호환성
- **Chrome** 23+ (WebP 완전 지원)
- **Firefox** 65+ (WebP 지원)
- **Safari** 14+ (WebP 지원)
- **Edge** 18+ (WebP 지원)

## 📊 성능 특징

### 압축 효율성
- **WebP**: JPEG 대비 25-35% 용량 감소
- **품질 유지**: 최대 100% 품질 설정 가능
- **실시간 처리**: 클라이언트 사이드 즉시 변환

### 보안성
- **로컬 처리**: 모든 변환이 브라우저에서 실행
- **서버 무전송**: 이미지 파일이 외부로 전송되지 않음
- **개인정보 보호**: 완전한 프라이버시 보장

## 🚀 배포 옵션

### 🌐 **Cloudflare Pages** (추천 ⭐⭐⭐⭐⭐)
- ✅ **무료 글로벌 CDN** - 전 세계 빠른 로딩
- ✅ **자동 SSL 인증서** - HTTPS 보안 적용
- ✅ **무제한 대역폭** - 트래픽 제한 없음
- ✅ **Google AdSense 완벽 호환**
- 📁 **파일 사용**: `cloudflare-index.html`을 `index.html`로 이름 변경
- 📖 **가이드**: `cloudflare-deploy-guide.md` 참고

### 📝 **블로그 플랫폼**
- 🔸 **구글 블로거**: `blog-converter.html` 사용
- 🔸 **티스토리**: `blog-converter.html` 또는 `simple-converter.html`
- 📖 **가이드**: `blog-upload-guide.md` 참고

### 💰 **Google AdSense 수익화**
- 📊 **광고 최적화**: 상단/중간/하단 광고 영역 사전 구성
- 💡 **승인 팁**: 트래픽 확보 후 신청 권장
- 📈 **예상 수익**: 월 방문자 1,000명 기준 $50-200
- 📖 **가이드**: `adsense-setup-guide.md` 참고

## 🔮 향후 개발 계획

### 🎯 추천 개선사항
1. **고급 편집 기능**
   - 이미지 리사이징 및 크롭
   - 회전 및 뒤집기 기능
   - 밝기/대비/채도 조절

2. **추가 포맷 지원**
   - AVIF 포맷 지원
   - HEIC/HEIF 포맷 변환
   - SVG 래스터화

3. **배치 처리 개선**
   - ZIP 파일로 일괄 다운로드
   - 진행률 세부 표시
   - 변환 설정 개별 적용

4. **사용자 경험 향상**
   - 변환 히스토리 저장
   - 즐겨찾기 설정 저장
   - 테마 선택 (다크모드)

5. **성능 최적화**
   - Web Workers를 통한 백그라운드 처리
   - 대용량 파일 스트리밍 처리
   - 메모리 사용량 최적화

## 🎨 디자인 특징

### UI/UX
- **직관적 인터페이스**: 드래그 앤 드롭 시각적 피드백
- **반응형 디자인**: 모바일부터 데스크톱까지 완벽 대응
- **애니메이션**: 부드러운 전환 효과 및 로딩 인디케이터
- **접근성**: 키보드 네비게이션 및 스크린 리더 호환

### 컬러 팔레트
- **Primary**: #667eea (보라-파랑 그래디언트)
- **Secondary**: #764ba2 (진보라)
- **Success**: #48bb78 (녹색)
- **Warning**: #ed8936 (주황)
- **Error**: #f56565 (빨강)

## 📝 라이선스

이 프로젝트는 개인 및 상업적 사용이 자유로운 오픈소스입니다.

## 🤝 기여하기

버그 리포트, 기능 제안, 코드 기여를 환영합니다!

---

**개발 정보**
- 개발 날짜: 2025년 1월
- 버전: 1.0.0
- 언어: Korean (한국어)
- 플랫폼: Web Browser

**연락처**
- 이슈 및 버그 리포트는 GitHub Issues를 이용해주세요.

---
*모든 이미지 처리는 사용자의 브라우저에서 안전하게 실행되며, 개인정보가 완전히 보호됩니다.*