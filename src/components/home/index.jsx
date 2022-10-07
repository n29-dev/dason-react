import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMarketData } from '../../features/market/marketSlice';
import BarChart from '../charts/positiveNegativeBarChart';
import Layout from '../globals/layout';
import ShopOverview from './shopOverview';

function Home() {
    const dispatch = useDispatch();
    const { sales: salesData } = useSelector((store) => store);
    const { market: marketData } = useSelector((store) => store);
    const marketButtonsRef = useRef();
    const chartContainer = useRef();
    let marketDatatoggleBtns;

    const periods = {
        all: 0.2,
        oneMonth: 12,
        sixMonth: 2,
        oneWeek: 48,
    };

    // toggle market overview data for different time period
    function updateMarketOverviewData(event) {
        const period = event.currentTarget.getAttribute('data-period');
        dispatch(updateMarketData(periods[period]));
        marketDatatoggleBtns.forEach((btn) => {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
            }
        });
        event.currentTarget.classList.add('active');
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        marketDatatoggleBtns = marketButtonsRef.current.querySelectorAll('button');
        marketDatatoggleBtns.forEach((btn) => btn.addEventListener('click', updateMarketOverviewData));
    }, []);

    return (
        <Layout>
            <div className="grid grid-cols-[66%,_34%] gap-6 mr-6">
                {/* breadcrumbs */}
                <div className="flex justify-between items-center mb-6 col-start-1 col-end-3">
                    <h1 className="text-[18px] font-semibold text-dark-500">Welcome !</h1>
                    <ul className="breadcrumb flex gap-3">
                        <li className="text-[13px] text-dark-500">Dashboard</li>
                        <li className="text-[13px] text-dark-400">Welcome</li>
                    </ul>
                </div>
                {/* sales overview */}
                <div className="grid grid-cols-4 gap-6 col-start-1 col-end-3">
                    <ShopOverview title="Total Sales" amount="$354.5k" badge="+$20.9k" data={salesData} />
                    <ShopOverview title="Total Sales" amount="$354.5k" badge="+$20.9k" data={salesData} />
                    <ShopOverview title="Total Sales" amount="$354.5k" badge="+$20.9k" data={salesData} />
                    <ShopOverview title="Total Sales" amount="$354.5k" badge="+$20.9k" data={salesData} />
                </div>
                {/* market overview */}
                <div className="component-default col-start-1 col-end-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-base text-dark-600 font-semibold mb-6">Market Overview</h2>
                        <div ref={marketButtonsRef} className="flex items-center gap-[5px]">
                            <button
                                className="bg-white-600 text-[12px] leading-[17px] px-3 py-1 rounded active"
                                data-period="all"
                                data-active-style="blue"
                                type="button"
                            >
                                All
                            </button>
                            <button
                                className="bg-white-600 text-[12px] leading-[17px] px-3 py-1 rounded"
                                data-period="oneMonth"
                                data-active-style="blue"
                                type="button"
                            >
                                1M
                            </button>
                            <button
                                className="bg-white-600 text-[12px] leading-[17px] px-3 py-1 rounded"
                                data-period="sixMonth"
                                data-active-style="blue"
                                type="button"
                            >
                                6M
                            </button>
                            <button
                                className="bg-white-600 text-[12px] leading-[17px] px-3 py-1 rounded"
                                data-period="oneWeek"
                                data-active-style="blue"
                                type="button"
                            >
                                1Y
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-end gap-10">
                        <div className="w-[70%] h-[400px]" ref={chartContainer}>
                            <BarChart data={marketData} />
                        </div>
                        <div className="w-[30%] pb-[50px]">
                            <div className="flex justify-between gap-5 items-center pb-4">
                                <div>
                                    <span
                                        className="w-[26px] h-[26px] text-[10px] rounded-full leading-[26px] 
                                text-dark-500 bg-white-500 inline-block text-center"
                                    >
                                        1
                                    </span>
                                    <p className="inline-block text-[11px] text-dark-500 ml-4">Mobile Phones</p>
                                </div>
                                <span
                                    className="text-[8px] text-success bg-success-100 px-2
                                 py-[3px] rounded-md font-medium"
                                >
                                    +5.4%
                                </span>
                            </div>
                            <div className="flex justify-between gap-5 items-center pb-4">
                                <div>
                                    <span
                                        className="w-[26px] h-[26px] text-[10px] rounded-full leading-[26px] 
                                text-dark-500 bg-white-500 inline-block text-center"
                                    >
                                        2
                                    </span>
                                    <p className="inline-block text-[11px] text-dark-500 ml-4">Smart Watch</p>
                                </div>
                                <span
                                    className="text-[8px] text-success bg-success-100 px-2
                                 py-[3px] rounded-md font-medium"
                                >
                                    +1.3%
                                </span>
                            </div>
                            <div className="flex justify-between gap-5 items-center pb-4">
                                <div>
                                    <span
                                        className="w-[26px] h-[26px] text-[10px] rounded-full leading-[26px] 
                                text-dark-500 bg-white-500 inline-block text-center"
                                    >
                                        3
                                    </span>
                                    <p className="inline-block text-[11px] text-dark-500 ml-4">Protable Acoustics</p>
                                </div>
                                <span
                                    className="text-[8px] text-success bg-success-100 px-2
                                 py-[3px] rounded-md font-medium"
                                >
                                    +11.4%
                                </span>
                            </div>
                            <div className="flex justify-between gap-5 items-center pb-4">
                                <div>
                                    <span
                                        className="w-[26px] h-[26px] text-[10px] rounded-full leading-[26px] 
                                text-dark-500 bg-white-500 inline-block text-center"
                                    >
                                        4
                                    </span>
                                    <p className="inline-block text-[11px] text-dark-500 ml-4">Smart Speakers</p>
                                </div>
                                <span
                                    className="text-[8px] text-danger bg-danger-100 px-2
                                 py-[3px] rounded-md font-medium"
                                >
                                    -18.1%
                                </span>
                            </div>
                            <div className="flex justify-between gap-5 items-center pb-4">
                                <div>
                                    <span
                                        className="w-[26px] h-[26px] text-[10px] rounded-full leading-[26px] 
                                text-dark-500 bg-white-500 inline-block text-center"
                                    >
                                        5
                                    </span>
                                    <p className="inline-block text-[11px] text-dark-500 ml-4">Camcorders</p>
                                </div>
                                <span
                                    className="text-[8px] text-danger bg-danger-100 px-2
                                 py-[3px] rounded-md font-medium"
                                >
                                    -7.4%
                                </span>
                            </div>
                            <div className="pt-5">
                                <a className="button flex" href="#">
                                    See All Balances
                                    <span>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
