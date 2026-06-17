import { useEffect, useRef, useState } from 'react';
import './Ui3.css';
import iphone from '../assets/UI/step03_iphoneMockup.png';
import linear from '../assets/UI/step03_linearbg.png';

const routeFeatures = [
    {
        number: '1',
        title: 'Pick-up',
        description: '포장 주문한 음식을 직접 찾으러 갈 때',
    },
    {
        number: '2',
        title: 'Nearby',
        description: '식사 전후로 주변 장소를 함께 찾고 싶을 때',
    },
    {
        number: '3',
        title: 'Route',
        description: '복잡한 지도보다 간단한 이동 요약이 필요할 때',
    },
];

export default function Ui3() {
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
                rootMargin: '0px 0px -14% 0px',
                threshold: 0.14,
            },
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, []);

    return (
        <main className={`ui3${isVisible ? ' ui3--visible' : ''}`} ref={pageRef}>
            <section className="ui3__stage" aria-labelledby="ui3-title">
                <div className="ui3__canvas">
                    <p className="ui3__step">Step 03</p>

                    <div className="ui3__visual">
                        <img className="ui3__linear" src={linear} alt="" aria-hidden="true" />
                        <img className="ui3__iphone" src={iphone} alt="Naru route and nearby screens" />
                    </div>

                    <div className="ui3__copy">
                        <h1 id="ui3-title">
                            먹고 싶은 곳까지,
                            <br />
                            길을 잃지 않도록
                        </h1>
                        <p className="ui3__lead">
                            외국인 관광객에게 음식 경험은 주문에서 끝나지 않습니다. 포장 주문한 음식을 찾으러 가거나, 식사 전후로 주변 장소를 탐색해야 하는 순간이 이어집니다. 나루는 복잡한 지도 대신 검색, 추천, 루트 카드를 제공해 음식 경험 이후의 이동까지 자연스럽게 연결합니다.
                        </p>

                        <div className="ui3__features">
                            {routeFeatures.map((feature, index) => (
                                <article className="ui3__feature" key={feature.title} style={{ '--ui3-feature-index': index }}>
                                    <span>{feature.number}</span>
                                    <div>
                                        <h2>{feature.title}</h2>
                                        <p>{feature.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
