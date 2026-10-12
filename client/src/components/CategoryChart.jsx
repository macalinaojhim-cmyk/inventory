import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
"#6366F1", // Indigo
"#14B8A6", // Teal
"#F59E0B", // Amber
"#EF4444", // Red
"#8B5CF6", // Violet
"#06B6D4", // Cyan
"#EC4899", // Pink
"#84CC16", // Lime
"#F97316", // Orange
"#3B82F6", // Blue
"#10B981", // Emerald
"#A855F7", // Purple
"#E11D48", // Rose
"#0D9488", // Dark Teal
"#D946EF", // Fuchsia
"#65A30D", // Dark Lime
"#2563EB", // Dark Blue
"#CA8A04", // Dark Yellow
"#DC2626", // Dark Red
"#7C3AED", // Dark Violet
"#0891B2", // Dark Cyan
"#EA580C", // Dark Orange
"#4F46E5", // Deep Indigo
"#059669", // Dark Emerald
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