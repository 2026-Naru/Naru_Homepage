import { useEffect, useRef, useState } from 'react';
import './Ui1.css';
import Phoneimg from '../assets/UI/step01_phone.png';

const callouts = [
    {
        id: '01',
        title: '직관적인 알레르기 표시',
        description: '직관적인 알레르기 표시 한국어를 몰라서 잘못 먹는 일을 예방할 수 있어요.',
        side: 'right',
        arrow: 'right',
    },
    {
        id: '02',
        title: '같은 나라 방문객의 리뷰',
        description: '외국인 방문객 리뷰 비슷한 식문화를 가진 사용자 후기를 참고할 수 있습니다.',
        side: 'right',
        arrow: 'right-bottom',
    },
    {
        id: '03',
        title: '배달 ui',
        description: '주문 옵션 구조 사이즈, 구성, 추가 옵션을 단계별로 확인해 선택 실수를 줄입니다.',
        side: 'left',
        arrow: 'left',
    },
];

function LeftArrow() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="201"
            height="114"
            viewBox="0 0 201 114"
            fill="none"
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8ZM43.5617 112L42.1424 112.485L42.4894 113.5H43.5617V112ZM199 113.5H200.5V110.5H199V112V113.5ZM8 8L6.58068 8.48532L42.1424 112.485L43.5617 112L44.9811 111.515L9.41932 7.51468L8 8ZM43.5617 112V113.5H199V112V110.5H43.5617V112Z"
                fill="#FF6B35"
            />
        </svg>
    );
}

function RightArrow() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="218"
            height="116"
            viewBox="0 0 218 116"
            fill="none"
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M217.5 8C217.5 12.4183 213.918 16 209.5 16C205.082 16 201.5 12.4183 201.5 8C201.5 3.58172 205.082 0 209.5 0C213.918 0 217.5 3.58172 217.5 8ZM165.295 114L166.679 114.577L166.294 115.5H165.295V114ZM1.5 115.5H0V112.5H1.5V114V115.5ZM209.5 8L210.884 8.57735L166.679 114.577L165.295 114L163.91 113.423L208.116 7.42265L209.5 8ZM165.295 114V115.5H1.5V114V112.5H165.295V114Z"
                fill="#FF6B35"
            />
        </svg>
    );
}

export function Ui1() {
    const pageRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

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
                rootMargin: '0px 0px -12% 0px',
                threshold: 0.12,
            },
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, []);

    return (
        <main className={`ui1${isVisible ? ' ui1--visible' : ''}`} ref={pageRef}>
            <section className="ui1__stage" aria-labelledby="ui1-title">
                <div className="ui1__copy">
                    <p className="ui1__step">Step 01</p>
                    <p className="ui1__eyebrow">주문 페이지</p>
                    <h1 id="ui1-title">
                        알레르기 정보를
                        <br />
                        한눈에
                    </h1>
                    <p className="ui1__lead">
                        인터뷰에서 반복적으로 나온 불안 요소를 주문 화면 안에서 먼저 확인할 수 있도록 구성했습니다.
                    </p>
                </div>

                <div className="ui1__phone-wrap">
                    <img className="ui1__phone" src={Phoneimg} alt="Naru order page UI screens" />
                </div>

                {callouts.map((callout, index) => (
                    <article
                        className={`ui1__callout ui1__callout--${callout.side} ui1__callout--${callout.arrow}`}
                        key={callout.id}
                        style={{ '--callout-index': index }}
                    >
                        <div className="ui1__arrow">{callout.side === 'left' ? <RightArrow /> : <LeftArrow />}</div>
                        <div className="ui1__callout-text">
                            <div className="ui1__callout-head">
                                <span>{callout.id}</span>
                                <strong>{callout.title}</strong>
                            </div>
                            <p>{callout.description}</p>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default Ui1;
