import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    // eslint-disable-next-line prettier/prettier
    YAxis
} from 'recharts';

function PositiveNegativeBarChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="pv" fill="#34c38f" />
                <Bar dataKey="uv" fill="#1c84ee" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default PositiveNegativeBarChart;
