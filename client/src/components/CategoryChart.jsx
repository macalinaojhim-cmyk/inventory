import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#6366F1",
    "#14B8A6",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4"
];



export default function CategoryChart({ products }) {

    // Count products in each category
    const categoryCounts = products.reduce((acc, product) => {
        const category = product.category || "Uncategorized";

        acc[category] = (acc[category] || 0) + 1;

        return acc;
    }, {});

    // Convert object into chart data
    const chartData = Object.entries(categoryCounts).map(
        ([name, value]) => ({
            name,
            value
        })
    );

    return (
        <div className="category-chart">
            <h2>Stock by Category</h2>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={100}
                        paddingAngle={3}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={entry.name}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}