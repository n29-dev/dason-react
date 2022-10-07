import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#1c84ee', '#34c38f'];

function SimpleDonutChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={50}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index + Math.random()}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip wrapperClassName="donut-tooltip" />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default SimpleDonutChart;
