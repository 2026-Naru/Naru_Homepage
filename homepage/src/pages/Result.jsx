import { useEffect, useRef, useState } from 'react';
import ResultBg from '../assets/result/Result_bg.png';
import Ui1 from './Ui1';
import Ui2 from './Ui2';
import Ui3 from './Ui3';
import FeedBack from './FeedBack';
import './Result.css';

const resultItems = [
    {
        title: '배달',
        subtitle: 'Delivery',
    },
    {
        title: '환전',
        subtitle: 'Exchange',
    },
    {
        title: '길찾기',
        subtitle: 'Explore',
    },
];

export default function Result() {
    const resultRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const target = resultRef.current;

        if (!target) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                rootMargin: '0px 0px -18% 0px',
                threshold: 0.18,
            },
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <section
                className={`result${isVisible ? ' result--visible' : ''}`}
                ref={resultRef}
                aria-labelledby="result-title"
            >
                <img src={ResultBg} alt="" className="result__background" aria-hidden="true" />
                <div className="result__shade" aria-hidden="true" />

                <div className="result__inner">
                    <h2 id="result-title" className="result__title">
                        배달, 환전, 길찾기를 하나의 흐름으로,
                    </h2>

                    <div className="result__features" aria-label="Naru service flow">
                        {resultItems.map((item, index) => (
                            <div
                                className="result__feature"
                                key={item.subtitle}
                                style={{ '--result-index': index }}
                            >
                                <strong>{item.title}</strong>
                                <span>{item.subtitle}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Ui1 />
            <Ui2 />
            <Ui3 />
            <FeedBack />
        </>
    );
}
