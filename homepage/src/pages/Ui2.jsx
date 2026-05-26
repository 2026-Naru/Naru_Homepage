import { useEffect, useRef, useState } from 'react';
import './Ui2.css';
import Union from '../assets/UI/step02_union.svg';
import rightiphone from '../assets/UI/step02_iphoneMockup.png';
import addition1 from '../assets/UI/step02_addition1.png';
import addition2 from '../assets/UI/step02_addition2.png';
import addition3 from '../assets/UI/step02_addition3.png';
import addition4 from '../assets/UI/step02_addition4.png';

const steps = [
    {
        id: '01',
        title: '실시간 환율 확인',
        description: '외화 기준 금액과 원화 결제 금액을 함께 확인합니다.',
    },
    {
        id: '02',
        title: '나루 머니 잔액',
        description: '환전한 금액을 앱 안의 결제 수단처럼 보여주어 결제 흐름을 단순화했습니다.',
    },
    {
        id: '03',
        title: '주문 요약 확인',
        description: '메뉴, 배달비, 총 결제 금액을 결제 전 한 번 더 확인합니다.',
    },
];

export default function Ui2() {
    const pageRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const target = pageRef.current;

        if (!target) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                rootMargin: '0px 0px -14% 0px',
                threshold: 0.14,
            },
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const updateScale = () => {
            const nextScale = Math.min(1, (window.innerWidth - 32) / 1440, window.innerHeight / 813);
            setScale(Math.max(0.62, nextScale));
        };

        updateScale();
        window.addEventListener('resize', updateScale);

        return () => window.removeEventListener('resize', updateScale);
    }, []);

    return (
        <main className={`ui2${isVisible ? ' ui2--visible' : ''}`} ref={pageRef}>
            <section className="ui2__stage" aria-labelledby="ui2-title">
                <div className="ui2__canvas" style={{ '--ui2-scale': scale }}>
                    <img className="ui2__union-fallback" src={Union} alt="" aria-hidden="true" />
                    <svg
                        className="ui2__route"
                        width="1022"
                        height="452"
                        viewBox="0 0 1022 452"
                        fill="none"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path
                            className="ui2__route-path"
                            d="M1260 38H244C131.9 38 41 122.2 41 226C41 329.8 131.9 414 244 414H832"
                        />
                    </svg>

                    <div className="ui2__copy">
                        <p className="ui2__step">Step 02</p>
                        <h1 id="ui2-title">환전부터 결제까지 한 번에</h1>
                        <p className="ui2__lead">
                            원화 가격과 환전 금액을 함께 보여주어 결제 전 이해를 돕고, 나루 머니로 간단하게 결제 흐름을 완성합니다.
                        </p>

                        <div className="ui2__list">
                            {steps.map((step, index) => (
                                <article className="ui2__item" key={step.id} style={{ '--ui2-item-index': index }}>
                                    <strong>{step.id}</strong>
                                    <div>
                                        <h2>{step.title}</h2>
                                        <p>{step.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="ui2__visual-copy">
                        <p>결제 페이지</p>
                        <strong>
                            외국인 사용자가 원화 가격을 이해하고, 전시용 나루 머니로<br />
                            결제 흐름을 자연스럽게 경험할 수 있도록 구성했습니다.
                        </strong>
                    </div>

                    <div className="ui2__mockups" aria-label="Payment flow screens">
                        <img className="ui2__phone ui2__phone--addition2" src={addition2} alt="Map and store payment screen" />
                        <img className="ui2__phone ui2__phone--addition1" src={addition1} alt="Order payment method screen" />
                        <img className="ui2__phone ui2__phone--addition3" src={addition3} alt="Order confirmation screen" />
                        <img className="ui2__phone ui2__phone--addition4" src={addition4} alt="Payment completed screen" />
                    </div>

                    <img className="ui2__right-phone" src={rightiphone} alt="MY Naru wallet screen" />
                </div>
            </section>
        </main>
    );
}
