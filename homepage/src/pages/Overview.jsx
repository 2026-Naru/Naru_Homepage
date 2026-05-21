import { useEffect, useRef, useState } from 'react'
import Language from '../assets/overview/Language.png'
import Payment from '../assets/overview/Payment.png'
import Exchange from '../assets/overview/Exchange.png'
import Research from './Research'
import './Overview.css'

const problemImages = [
  {
    src: Language,
    alt: 'Language problem card',
  },
  {
    src: Payment,
    alt: 'Payment problem card',
  },
  {
    src: Exchange,
    alt: 'Exchange problem card',
  },
]

export default function Overview() {
  const overviewRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const target = overviewRef.current

    if (!target) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        rootMargin: '0px 0px -18% 0px',
        threshold: 0.22,
      },
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <main
        className={`overview-page${isVisible ? ' overview-page--visible' : ''}`}
        ref={overviewRef}
      >
        <section className="overview-page__content" aria-labelledby="overview-title">
          <div className="overview-page__copy">
            <p className="overview-page__eyebrow">Overview</p>

            <h1 id="overview-title">
              한국인에게 쉬운 주문이,
              <br />
              <span>외국인에게는 어렵습니다.</span>
            </h1>

            <p className="overview-page__lead">
              한국의 배달 문화는 빠르고 편리하지만,
              <br />
              외국인 관광객에게는 주문 전부터 여러 장벽이 생깁니다.
            </p>

            <div className="overview-page__background">
              <h2>PROJECT BACKGROUND</h2>
              <p>
                나루는 위탁 가정 경험을 통해 매년 한국을 방문하는 입양 가정과 만남을 이어오며,
                외국인 양부모님들이 한국에서 배달 음식을 주문할 때 언어 장벽, 해외 결제 불가,
                환전 문제로 어려움을 겪는 모습을 자주 보았습니다.
              </p>
              <p>
                이 경험을 바탕으로 저희 팀은 외국인도{' '}
                <span className="overview-page__highlight">
                  <span className="overview-page__highlight-line">
                    한국 음식을 쉽고 편리하게 즐길 수 있도록
                  </span>
                  <br />
                  <span className="overview-page__highlight-line overview-page__highlight-line--second">
                    환전과 배달 서비스
                  </span>
                </span>
                를 하나로 연결한 플랫폼을 기획하게 되었습니다.
              </p>
            </div>
          </div>

          <div className="overview-page__visuals" aria-label="Order barriers">
            {problemImages.map((image, index) => (
              <img
                className="overview-page__card"
                src={image.src}
                alt={image.alt}
                key={image.alt}
                style={{ '--card-index': index }}
              />
            ))}
          </div>
        </section>
      </main>

      <Research />
    </>
  )
}
