export const primaryHeaderTemplate = `
  <div class="header-wrapper">
    <header>
      <!-- logo -->
      <div class="logo">
        <a href="#">
          <img src="/assets/images/logos/cmg-medallion-logo.svg" alt="Chipotle Mexican Grill" />
        </a>
      </div>
      
      <!-- nav -->
      <nav class="site-nav">
        <ul class="nav-links">
          <li><a href="#menu">MENU</a></li>
          <li><a href="#">CATERING</a></li>
          <li><a href="#">REWARDS</a></li>
          <li><a href="#">OUR VALUE</a></li>
          <li><a href="#">NUTRITION</a></li>
        </ul>
      </nav>
      
      <!-- actions -->
      <div class="user-actions">
        <div class="user transition" role="button">
          <svg xmlns="http:www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <path d="M24 22a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm8.746 9.396C31.666 30.26 28 28 23.998 28c-4.003 0-7.674 2.262-8.747 5.394-.637 1.86-.016 2.606 1.328 2.606h14.836c1.353 0 1.972-.744 1.331-2.604zm1.93-.092c1.1 3.497-.813 4.696-2.56 4.696H15.877c-1.734 0-3.65-1.2-2.557-4.697C14.675 28.967 19.203 26 23.998 26c4.796 0 9.316 2.967 10.679 7.304z"></path>
          </svg>
          <span class="text">Sign In / Join</span>
          </div>
        <div class="bag transition" role="button" aria-label="Open cart" aria-controls="bag-sidebar">
          <svg xmlns="http:www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" transform="translate(15 10)">
          <path d="M7 9a1 1 0 1 1-2 0V4a4 4 0 1 1 8 0v5a1 1 0 0 1-2 0V4a2 2 0 1 0-4 0v5zM2 7v19h14V7H2zm0-2h14a2 2 0 0 1 2 2v19a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
          </svg>
        </div>
      </div>
    </header>
    
    <!-- 오버레이 -->
    <div id="sidebar-overlay" class="overlay"></div>
  </div>

  <!-- 사이드바를 헤더 밖으로 이동 -->
  <aside class="bag-sidebar" aria-hidden="true" insert>
    <button class="close-btn" aria-label="Close Bag">
      <img src="/assets/images/icons/dark-brown-x.png" alt="Close">
    </button>
  </aside>
`;

export const signInModalTemplate = `
  <!-- 모달 HTML 수정 -->
  <div id="auth-modal" class="modal-overlay hidden">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close-button" aria-label="Close modal">×</button>
        <div class="modal-image">
          <img src="assets/images/logos/medallion-fluted-2x.png" alt="Modal"/>
        </div>
        <div class="modal-title" role="heading">Sign In</div>
      </div>
      <div class="forms-container">
        <!-- 로그인 폼 -->
        <form id="login-form" class="active">
          <div class="input-group">
            <input type="email" id="login-email" placeholder="Email" required>
          </div>
          <div class="input-group">
            <input type="password" id="login-password" placeholder="Password" required>
          </div>
          <button type="submit" class="submit-button">Sign In</button>
          <div class="signup-section">
            <span class="heading">Not a Member?</span>
            <span class="subheading">Join rewards. Get rewarded.</span>
            <button type="button" class="switch-to-signup">Create an Account</button>
          </div>
        </form>

        <!-- 회원가입 폼 -->
        <form id="signup-form">
          <div class="input-group">
            <input type="text" id="signup-firstname" placeholder="이름" required>
          </div>
          <div class="input-group">
            <input type="text" id="signup-lastname" placeholder="성" required>
          </div>
          <div class="input-group">
            <input type="email" id="signup-email" placeholder="이메일" required>
          </div>
          <div class="input-group">
            <input type="password" id="signup-password" placeholder="비밀번호 (6자 이상, 특수문자 포함)" required>
            <div class="password-requirements hidden">
              <p>비밀번호 요구사항:</p>
              <ul>
                <li class="requirement length">최소 6자 이상</li>
                <li class="requirement special">특수문자 포함</li>
              </ul>
            </div>
          </div>
          <button type="submit" class="submit-button">회원가입</button>
          <div class="login-section">
            <p>이미 계정이 있으신가요?</p>
            <button type="button" class="switch-to-login">로그인</button>
          </div>
        </form>
      </div>
    </div>
  </div>
`;
