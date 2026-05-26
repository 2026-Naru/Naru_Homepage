import { useEffect, useMemo, useRef, useState } from 'react';
import './FeedBack.css';

const STORAGE_KEY = 'naru-feedback-comments';

const defaultComments = [
    { nickname: 'Naru', body: '진짜 멋지다!' },
    { nickname: 'Traveler', body: '한국 여행할 때 꼭 써보고 싶어요.' },
    { nickname: 'Mina', body: '디자인이 선명해서 바로 이해돼요.' },
    { nickname: 'Jay', body: '환전이랑 주문 흐름이 자연스럽네요.' },
    { nickname: 'Soo', body: '길찾기까지 이어지는 게 좋아요.' },
    { nickname: 'Guest', body: '진짜 멋지다!' },
    { nickname: 'Anna', body: '외국인 입장에서 필요한 기능이에요.' },
    { nickname: 'Naru Fan', body: '서비스 컨셉이 잘 보여요.' },
    { nickname: 'Leo', body: '코멘트 카드 느낌도 예뻐요.' },
];

const splitRows = (comments) => {
    const rows = [[], [], []];

    comments.forEach((comment, index) => {
        rows[index % rows.length].push(comment);
    });

    return rows.map((row) => (row.length ? row : comments.slice(0, 3)));
};

const repeatRow = (row, repeatCount) => Array.from({ length: repeatCount }, () => row).flat();

const loadStoredComments = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
};

export default function FeedBack() {
    const pageRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [nickname, setNickname] = useState('');
    const [body, setBody] = useState('');
    const [savedComments, setSavedComments] = useState(loadStoredComments);

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

    const comments = useMemo(() => [...savedComments, ...defaultComments], [savedComments]);
    const rows = useMemo(() => splitRows(comments), [comments]);
    const marqueeRows = useMemo(() => rows.map((row) => repeatRow(row, 4)), [rows]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedNickname = nickname.trim();
        const trimmedBody = body.trim();

        if (!trimmedNickname || !trimmedBody) {
            return;
        }

        const nextComment = {
            nickname: trimmedNickname,
            body: trimmedBody,
            createdAt: new Date().toISOString(),
        };
        const nextComments = [nextComment, ...savedComments].slice(0, 18);

        setSavedComments(nextComments);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextComments));
        setNickname('');
        setBody('');
    };

    return (
        <main className={`feedback${isVisible ? ' feedback--visible' : ''}`} ref={pageRef}>
            <section className="feedback__stage" aria-labelledby="feedback-title">
                <div className="feedback__intro">
                    <h1 id="feedback-title">여러분의 피드백이 나루의 다음 방향이 됩니다</h1>
                    <p>
                        나루를 보며 인상 깊었던 점, 공감한 문제, 더 발전했으면 하는 기능을 자유롭게 남겨주세요.
                        여러분의 의견은 외국인을 위한 더 편리한 한국 음식 경험을 만드는 데 도움이 됩니다.
                        남겨주신 피드백은 서비스의 다음 기능을 고민하고, 실제 사용자가 겪는 불편함을 더 깊이
                        이해하는 데 소중한 자료로 활용됩니다.
                    </p>
                </div>

                <form className="feedback__form" onSubmit={handleSubmit}>
                    <label className="feedback__field">
                        <span>닉네임</span>
                        <input
                            value={nickname}
                            onChange={(event) => setNickname(event.target.value)}
                            maxLength={18}
                            placeholder="닉네임을 입력해주세요"
                            aria-label="닉네임"
                        />
                    </label>

                    <label className="feedback__field feedback__field--textarea">
                        <span>본문 내용</span>
                        <textarea
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                            maxLength={120}
                            placeholder="나루에게 남길 피드백을 적어주세요"
                            aria-label="본문 내용"
                        />
                    </label>

                    <button className="feedback__submit" type="submit">
                        제출
                    </button>
                </form>

                <div className="feedback__wall" aria-label="피드백 코멘트">
                    {marqueeRows.map((row, rowIndex) => (
                        <div
                            className={`feedback__marquee feedback__marquee--${rowIndex === 1 ? 'right' : 'left'}`}
                            key={`feedback-row-${rowIndex}`}
                        >
                            <div className="feedback__track">
                                {[...row, ...row].map((comment, index) => (
                                    <article
                                        className={`feedback__card${index % 2 === 0 ? ' feedback__card--filled' : ''}`}
                                        key={`${comment.nickname}-${comment.body}-${rowIndex}-${index}`}
                                    >
                                        <strong>{comment.body}</strong>
                                        <span>{comment.nickname}</span>
                                    </article>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
