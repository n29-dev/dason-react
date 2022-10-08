/* eslint-disable import/no-unresolved */
import { faAngleDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductImg1 from 'Images/product/img-1.png';
import ProductImg2 from 'Images/product/img-2.png';
import ProductImg3 from 'Images/product/img-3.png';
import ProductImg4 from 'Images/product/img-4.png';
import ProductImg5 from 'Images/product/img-5.png';
import ProductImg6 from 'Images/product/img-6.png';
import ProductImg7 from 'Images/product/img-7.png';
import CustomterAvatar1 from 'Images/users/avatar-2.jpg';
import CustomterAvatar2 from 'Images/users/avatar-4.jpg';
import CustomterAvatar3 from 'Images/users/avatar-5.jpg';
import CustomterAvatar4 from 'Images/users/avatar-6.jpg';
import CustomterAvatar5 from 'Images/users/avatar-7.jpg';
import CustomterAvatar6 from 'Images/users/avatar-8.jpg';
import CustomterAvatar7 from 'Images/users/avatar-9.jpg';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMarketData } from '../../features/market/marketSlice';
import useDropdownToggle from '../../hooks/useDropdownToggle';
import BarChart from '../charts/positiveNegativeBarChart';
import Layout from '../globals/layout';
import Customer from './customer';
import Product from './product';
import ShopOverview from './shopOverview';

function Home() {
    let marketDatatoggleBtns;

    const marketButtonsRef = useRef();
    const [customerListDropdown, setcustomerListDropdown, customerListDropdownRef] = useDropdownToggle(false, {
        outClickClose: true,
    });

    const dispatch = useDispatch();
    const { sales: salesData } = useSelector((store) => store);
    const { market: marketData } = useSelector((store) => store);

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
                        <div className="w-[70%] h-[400px]">
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
                {/* sales by location */}
                <div></div>
                {/* customer list / selling products */}
                <div className="grid grid-cols-[35%,_65%] gap-6 mr-6">
                    {/* customer list */}
                    <div className="component-default p-0">
                        <div
                            className="flex justify-between items-start p-[20px] 
                        border-[#e9e9ef] border-b  divide-solid mb-[20px]"
                        >
                            <h2 className="text-base text-dark-600 font-semibold">Customer List</h2>
                            <div className="relative">
                                <button type="button" onClick={setcustomerListDropdown.toggle}>
                                    All Members
                                    <span className="text-[12px] inline-block ml-1">
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </span>
                                </button>
                                <div
                                    className={`dropdown top-[calc(100%_+_8px)] ${
                                        customerListDropdown ? 'active' : ''
                                    }`}
                                    ref={customerListDropdownRef}
                                >
                                    <ul>
                                        <li>
                                            <button className="dropdown-item" type="button">
                                                Members
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" type="button">
                                                New Members
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" type="button">
                                                Old Members
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="h-[380px]  overflow-y-scroll">
                            <ul>
                                <li>
                                    <Customer name="Randy Matthews" email="Randy@gmail.com" img={CustomterAvatar1} />
                                </li>
                                <li>
                                    <Customer name="Vernon Wood" email="Vernon@gmail.com" img={CustomterAvatar2} />
                                </li>
                                <li>
                                    <Customer name="Howard Rhoades" email="Howard@gmail.com" img={CustomterAvatar3} />
                                </li>
                                <li>
                                    <Customer name="Arthur Zurcher" email="Aurthor@gmail.com" img={CustomterAvatar3} />
                                </li>
                                <li>
                                    <Customer name="Angela Palmer" email="Palmar@gmail.com" img={CustomterAvatar4} />
                                </li>
                                <li>
                                    <Customer name="Dorothy Wimson" email="Dorothy@gmail.com" img={CustomterAvatar5} />
                                </li>
                                <li>
                                    <Customer name="Vernon Wood" email="Vernon@gmail.com" img={CustomterAvatar6} />
                                </li>
                                <li>
                                    <Customer name="Vernon Wood" email="Vernon@gmail.com" img={CustomterAvatar7} />
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* selling products */}
                    <div className="component-default p-0">
                        <div
                            className="flex justify-between items-start p-[20px] mb-[20px] border-b 
                        divide-solid border-[#e9e9ef]"
                        >
                            <h2 className="text-base text-dark-600 font-semibold">Selling List</h2>
                        </div>
                        <div className="h-[380px] overflow-y-scroll px-3">
                            <table>
                                <tbody>
                                    <Product
                                        img={ProductImg1}
                                        title="Light blue T-shirt"
                                        instock={1557}
                                        price={650}
                                        rating={4}
                                        sold={260}
                                    />
                                    <Product
                                        img={ProductImg2}
                                        title="Half sleeve T-shirt"
                                        instock={1557}
                                        price={650}
                                        rating={2}
                                        sold={260}
                                    />

                                    <Product
                                        img={ProductImg3}
                                        title="Black Color T-shirt"
                                        instock={false}
                                        price={650}
                                        rating={2}
                                        sold={260}
                                    />

                                    <Product
                                        img={ProductImg4}
                                        title="Half sleeve T-shirt"
                                        instock={1557}
                                        price={650}
                                        rating={2}
                                        sold={260}
                                    />

                                    <Product
                                        img={ProductImg5}
                                        title="Hoodie (Blue)"
                                        instock={false}
                                        price={650}
                                        rating={0}
                                        sold={260}
                                    />

                                    <Product
                                        img={ProductImg6}
                                        title="Half sleeve T-Shirt"
                                        instock={1557}
                                        price={650}
                                        rating={3}
                                        sold={260}
                                    />
                                    <Product
                                        img={ProductImg7}
                                        title="Green color T-shirt"
                                        instock={1557}
                                        price={650}
                                        rating={5}
                                        sold={260}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
