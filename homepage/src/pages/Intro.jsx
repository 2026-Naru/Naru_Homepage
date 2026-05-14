import hero from '../assets/hero.png'
import introBackground from '../assets/intro_background.jpg'
import './Intro.css'

export default function Intro() {
  return (
    <main
      className="intro"
      style={{ backgroundImage: `url(${introBackground})` }}
    >
      <nav className="intro__nav" aria-label="Naru sections">
        <a href="#delivery">Delivery</a>
        <a href="#exchange">Exchange</a>
        <a href="#explore">Explore</a>
      </nav>

      <section className="intro__hero" aria-labelledby="intro-title">
        <div className="intro__copy">
          <h1 id="intro-title">NARU</h1>
          <p>
            외국인을 위한 한국 배달 경험
            <br />
            2025 미림 소프트웨어 챌린지 동상 수상작
          </p>
        </div>

        <img
          src={hero}
          alt="NARU mobile app mockup"
          className="intro__mockup"
        />
      </section>

      <aside className="intro__overview" id="delivery">
        <h2>OverView</h2>
        <p>
          나루는 한국을 방문한 외국인이 언어와 결제 문제 없이
          배달 음식을 주문하고, 환율과 이동 정보를 함께 확인할
          수 있도록 설계한 모바일 서비스입니다.
        </p>
      </aside>
    </main>
  )
}
