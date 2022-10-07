import SimpleDonutChart from '../charts/simpleDonutChart';

function ShopOverview({ title, amount, badge, data, increment }) {
    return (
        <div className="flex justify-between items-center component-default">
            <div>
                <p className="text-[13px] text-dark-300 mb-4">{title}</p>
                <h3 className="text-[20px] mb-4 font-semibold text-dark-500">{amount}</h3>
                <p>
                    <span
                        className={`inline-block  text-[10px] py-[2px] px-[4px] rounded-sm ${
                            increment ? 'bg-success-100 text-success' : 'bg-danger-100 text-danger'
                        }`}
                    >
                        {badge}
                    </span>
                    <span className="inline-block ml-1">Since last week</span>
                </p>
            </div>
            <div className="w-[100px] h-[100px]">
                <SimpleDonutChart data={data} />
            </div>
        </div>
    );
}

export default ShopOverview;
