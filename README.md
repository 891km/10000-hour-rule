# 1만 시간의 법칙 웹페이지

#### 프로젝트 소개

- 본 프로젝트는 ‘1만 시간의 법칙’을 주제로 한 웹페이지 구현을 목표로 제작되었습니다.
- 데스크톱 환경을 우선으로 설계하였으며, 미디어 쿼리를 활용해 모바일 화면까지 최적화된 반응형 레이아웃을 구현하였습니다.
- 시멘틱 마크업과 접근성, SEO 등 웹 품질 요소를 고려하여 제작하였습니다.

#### 관련 링크

- **[배포 URL 🔗](https://891km.github.io/10000-hour-rule)**

- **[시연 영상 🎞️](https://youtu.be/LIBRg75z8n8)**

#### 작성자 및 개발자

- 김민주

<br>

## 요구사항 명세

| 번호 | 내용                             | 비고              |
| ---- | -------------------------------- | ----------------- |
| 1    | 피그마 참고하여 페이지 구현      | 디자인 준수       |
| 2    | 모바일 화면 고려                 | 반응형 적용       |
| 3    | 시멘틱, 접근성, SEO, 네이밍 고려 | 품질 기준         |
| 4    | 모달창 숨김 처리                 | 기능 구현 및 데모 |

<br>

## 프로젝트 구조

```
📂
├─ .gitingore
├─ index.html
├─ README.md
├─ images
└─ styles
    ├─ main.css
    ├─ mobile.css
    └─ reset.css
```

<br>

## 주요 고려 사항

### 1. 반응형 최적화

- `clamp()` 함수를 사용하여 `font-size`가 뷰포트에 따라 유동적으로 적용되도록 하였습니다.
- 유동적 폰트 크기 값을 CSS 변수로 지정하여 스타일 통일을 유지하고, 관리 효율성을 높였습니다.

  ```css
  :root {
    --fs-body-lg-fluid: clamp(2.2rem, 3vw, 3.6rem);
    --fs-body-md-fluid: clamp(1.4rem, 2.4vw, 2.4rem);
    --fs-body-sm-fluid: clamp(1.2rem, 2.4vw, 2.4rem);
  }
  ```

### 2. 접근성 고려

- 입력 필드와 버튼 요소에 대비감이 강한 컬러를 사용하여 '포커스 스타일'을 적용하여 사용자가 쉽게 인지할 수 있도록 하였습니다.
- 버튼 요소에 hover 시에도 포커스 스타일과 동일한 `outline`을 적용하였고, 커서의 이미지를 변경하여 버튼임을 명확히 알 수 있도록 디자인하였습니다.
- 버튼 요소에 공통 클래스를 사용하여 스타일 통일성과 및 유지보수성을 높였습니다.

  ```css
  input:focus,
  :is(button, a):focus-visible,
  .btn:hover {
    outline: 3px solid #ff0f99;
    outline-offset: 1px;
  }

  .btn:hover {
    cursor: url("../images/click.svg") 0 0, pointer;
  }
  ```

### 3. 레거시 브라우저 고려

- `aspect-ratio` 속성을 사용하여 이미지의 비율을 조절하였고, 이를 지원하지 않는 레거시 브라우저를 위해 `padding-top` 방식을 추가하였습니다.

  ```css
  .btn.submit::after {
    content: "";
    display: inline-block;
    width: clamp(4.3rem, 6vw, 6.4rem);

    /* aspect-ratio */
    aspect-ratio: 6.4 / 7.2;

    /* fallback for aspect-ratio */
    height: 0;
    padding-top: calc(clamp(4.3rem, 6vw, 6.4rem) * 6.4 / 7.2);
    object-fit: cover;
  }
  ```

<br>

## 에러와 에러 해결

### 1. 반응형 레이아웃 조정

#### 1-1. 문제 정의

- `.input-container` 내에 `<p>` 요소 3개를 화면 크기에 따라 2줄 또는 3줄로 배치해야 하는 과제가 있었습니다.

  ```html
  <div class="input-container">
    <p>나는 <input /> 전문가가 될 것이다.</p>
    <p>그래서 앞으로 매일 하루에</p>
    <p><input /> 시간씩 훈련할 것이다.</p>
  </div>
  ```

#### 1-2. 문제 해결

- `flex-wrap` 속성을 적용하고 `flex` 값을 조절하여, 화면이 작아질 때 자동으로 줄 바꿈이 이루어지도록 수정했습니다.

  ```css
  .input-container {
    display: flex;
    flex-wrap: wrap;
  }

  .input-container p {
    flex: 0 1 auto;
  }

  .input-container p:nth-child(1) {
    flex: 1 1 100%;
  }
  ```

### 2. 버튼 옆 이미지 삽입

#### 2-1. 문제 정의

- 버튼 오른쪽 바깥에 클릭 이미지를 배치해야 했습니다.
  ![오른쪽 바깥에 클릭 이미지가 위치한 버튼](https://github.com/user-attachments/assets/048b8207-40cd-481f-ba57-4fce2acc19c1)

#### 2-2. 문제 해결

- 버튼 요소에 `::after` 가상 요소를 사용해 이미지를 추가하였고
- `position: absolute`와 `calc`을 이용하여 이미지가 버튼 오른쪽 바깥에 위치하도록 조절하였습니다.

  ```css
  .btn.submit {
    position: relative;
  }

  .btn.submit::after {
    content: "";
    position: absolute;
    left: calc(100% + 0.7rem);
    background: url("../images/click.svg") no-repeat center / contain;
  }
  ```

<br />

## 회고

### Liked (좋았던 점)
- 수업 때 배운 내용을 나름 잘 적용할 수 있었다.

### Learned (배운 점)
- 실습을 통해 `flex` 속성에 대한 이해도가 높아졌다.
- 화면에 보이는 것 외에도 고려해야 할 요소가 많다는 것을 깨달았다.
    - 프로젝트 이후, 우선순위를 둔 체크리스트를 정리하면 좋을 것 같다.

### Lacked (부족했던 점)
- 해상도별로 더 세분화했어도 좋을 것 같다. 모바일 미디어 쿼리만 적용하니, 중간 해상도 구간에서 폰트 크기가 살짝 작아 보인다.
- 버튼 hover 시, 커서 색상이 버튼 컬러와 똑같아 시인성이 떨어졌다.

### Long for (바라는 점)
- 페이지 구조를 먼저 파악한 후 작업을 시작하면 개발 속도가 더 빠를 것 같다.
- 다음부터는 Gitmoji 같은 것을 이용해서 깃허브 커밋도 일관되게 작성하면 좋겠다.
