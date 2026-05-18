import Map from "../assets/Research/Map.svg";
import './Research.css';

export default function Research() {
    const area = [
        {
            title : "강남",
            description : "직장인, 한국 거주 외국인이 많아 배달앱 사용 경험 보유"
        },
        {
            title: "성수",
            description : "관광객과 유학생 등 젊은 외국인 방문 비중 높음"
        },
        {
            title: "명동",
            description: "외국인 관광객 밀집 지역으로 다양한 연령층 분포"
        }
    ]

    const feature = [
        {
            title: "Language",
            description: "메뉴와 옵션을 이해하기 쉽게 제공"
        },
        {
            title: "Payment",
            description: "해외 결제 장벽을 전시용 결제 흐름으로 단순화"
        },
        {
            title: "Exchange",
            description: "실시간 환율과 잔액을 함께 확인"
        }
    ]

    const result = [
        {
            num : 1,
            description : "가족 단위 외국인 관광객은 배달 음식 수요가 높지만, 주문 과정에서 자주 어려움을 겪었습니다."
        },
        {
            num : 2,
            description: "한국어 중심의 UI와 주소 입력 방식 때문에 주문을 중도에 포기하는 경우가 있었습니다."
        },
        {
            num: 3, 
            description: "한국어로만 제공되는 매장 정보와 메뉴 설명은 음식 선택을 어렵게 만들었습니다."
        }
    ];

    return (
        <section className="research">
            <div className="research-inner">
                <div className="leftsection">
                    <h2 className="section-title">User Research</h2>
                    <p className="section-sub">명동 · 성수 · 강남에서 외국인 방문객 21팀을 대상으로 진행한 설문 결과</p>

                    <div className="map-title">
                        <img src={Map} alt="지도" className="map-img" />
                        <div className="area-list">
                            {area.map((a, idx) => (
                                <div className="area-item" key={idx}>
                                    <h4 className="area-name">{a.title}</h4>
                                    <p className="area-desc">{a.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h3 className="research-result-heading">Research Result</h3>
                    <div className="result-list">
                        {result.map((r) => (
                            <div className="result-item" key={r.num}>
                                <div className="result-num">0{r.num}</div>
                                <div className="result-box">
                                    <p>{r.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rightsection">
                    <h2 className="section-title">Project Goal</h2>
                    <h3 className="goal">
                        <span className="orange">외국인이</span> 한국음식을
                        <br /> 막힘 없이 주문하도록
                    </h3>
                    <p className="goal-desc">
                        저희는 실제 인터뷰와 설문을 통해 외국인 관광객이 배달앱에서 가장 자주 막히는
                        지점이 언어, 결제, 환전이라는 점을 확인했습니다. 나루는 이 문제를 하나의 주문 흐름
                        안에서 해결해, 외국인도 한국 음식을 더 쉽고 편리하게 경험할 수 있도록 하는 것을 목표로 합니다.
                    </p>

                    <div className="feature-list">
                        {feature.map((f, i) => (
                            <div className="feature-item" key={i}>
                                <button className="feature-btn">{f.title}</button>
                                <p className="feature-desc">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}