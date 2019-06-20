import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice, faChartBar, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

class Start extends Component {

    render() {

        return (
            <div>
                <header className="masthead">
                    <div className="container h-100">
                        <div className="row h-100 align-items-center justify-content-center text-center">
                            <div class="col-lg-10 align-self-end">
                                <h1 id="yisunshin" class="text-white">똑똑한 채식의 시작, 채송</h1>
                                <hr class="divider my-4"/>
                            </div>
                            <div class="col-lg-8 align-self-baseline">
                                <p id="notosans" class="text-white-75 font-weight-light mb-5">
                                    내 몸에 부족한 영양소 한눈에 알고 싶을 때, <br/>
                                    내가 피하는 재료 손쉽게 거르고 싶을 때, <br/>
                                    채송으로 스마트하게 식단관리 시작하세요!
                                </p>
                                <a id="yisunshin" className="btn btn-success text-white" href="login" >회원가입 및 로그인</a>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="page-section-1" id="services">
                    <div className="container">
                        <h2 id="yisunshin" className="text-center mt-0">내 몸에 부족한 영양소 한눈에 알고 싶을 때,</h2>
                        <hr className="divider my-4"/>
                            <p id="notosans" className="text-center text-black-50 mb-4">하루 필수영양소와 섭취한 영양소를 비교해 <br/>
                                영양소의 균형을 맞추기 위한 레시피 추천해드립니다</p>
                            <div className="row">
                                <div className="col-lg-4 col-md-12 text-center">
                                    <div className="mt-5">
                                        <FontAwesomeIcon icon={faPizzaSlice} size="4x" color="#4CAF50" className="mb-3"/>
                                        <h3 className="h4 mb-3">Step 1</h3>
                                        <p id="notosans" className="text-muted mb-0">오늘 먹은 음식을<br/>채송을 통해 손쉽게 기록한다!</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 text-center">
                                    <div className="mt-5">
                                        <FontAwesomeIcon icon={faChartBar} size="4x" color="#4CAF50" className="mb-3"/>
                                        <h3 className="h4 mb-3">Step 2</h3>
                                        <p id="notosans" className="text-muted mb-0">채송그래프를 통해 내 몸에<br/>부족한 영양소를 확인한다!</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 text-center">
                                    <div className="mt-5">
                                        <FontAwesomeIcon icon={faThumbsUp} size="4x" color="#4CAF50" className="mb-3"/>
                                        <h3 className="h4 mb-3">Step 3</h3>
                                        <p id="notosans" className="text-muted mb-0">채송만의 추천 알고리즘으로<br/>내몸에 꼭 맞는 식단을 추천받는다!</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                </section>

                <section class="page-section-2"  id="about">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8 text-center">
                                <h2 id="yisunshin" class="text-white mt-0">내가 피하는 재료 손쉽게 거르고 싶을 때,</h2>
                                <hr class="divider light my-4"/>
                                    <p id="notosans" class="text-white-50">선택한 다섯종류 채식 타입에 따른 자동 필터링 기능과<br/>
                                        다양한 채식 레시피로 지루할 틈 없는 채식라이프!</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="portfolio">
                    <div className="container-fluid p-0">
                        <div className="row no-gutters">
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box" href="#">
                                <img className="img-fluid" src="https://i.imgur.com/qaeo43b.png" alt=""/>
                                    <div className="portfolio-box-caption">
                                        <div id="notosans" className="project-category text-white-75">
                                            5가지 채식타입 세분화
                                        </div>
                                        <div id="notosans" className="project-name">
                                            Pesco / Lacto-ovo / Lacto / Ovo / Vegan
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box" href="#">
                                <img className="img-fluid" src="https://i.imgur.com/wFxmllx.png" alt=""/>
                                    <div className="portfolio-box-caption">
                                        <div id="notosans" className="project-category text-white-75">
                                            다양한 채식 레시피
                                        </div>
                                        <div id="notosans" className="project-name">
                                            지겨운 샐러드는 이제 그만
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box" href="#">
                                <img className="img-fluid" src="https://i.imgur.com/ywFUw4L.png" alt=""/>
                                    <div className="portfolio-box-caption p-3">
                                        <div id="notosans" className="project-category text-white-75">
                                            레시피 스크랩 기능
                                        </div>
                                        <div id="notosans" className="project-name">
                                            오늘 먹은 레시피 또 보고 싶다면
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="page-section-1 bg-light text-black-50">
                    <div class="container text-center">
                        <h2 id="yisunshin" class="mb-4">이제 채송으로 똑똑한 식단관리 시작해볼까요? </h2>
                        <p id="notosans" class="text-center text-black-50 mb-5">
                            개개인의 키와 몸무게 그리고 채식타입에 따른 <br/> 맞춤 서비스를 위해 회원가입이 필요합니다
                        </p>
                    </div>
                </section>


                <footer class="bg-light py-5">
                    <div class="container">
                        <div class="small text-center text-muted">Copyright &copy; 채송</div>
                    </div>
                </footer>

            </div>
        );
    }
}


export default Start;