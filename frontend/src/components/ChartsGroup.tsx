import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell,
    ScatterChart, Scatter,
    ResponsiveContainer
} from 'recharts';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { DataItem, Filters } from '../types';
import { X } from 'lucide-react';

type FilterKeys = 'endYear' | 'topic' | 'sector' | 'region' | 'pestle' | 'source' | 'swot' | 'country';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const createSelectItems = (options: string[]) => {
    return options
        .filter(option => option !== null && option !== undefined && option !== '')
        .map(option => (
            <SelectItem key={option} value={option}>
                {option || 'N/A'}
            </SelectItem>
        ));
};

const FilterSelect: React.FC<{
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}> = ({ label, value, options, onChange }) => (
    <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full capitalize">
            <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                {createSelectItems(options)}
            </SelectGroup>
        </SelectContent>
    </Select>
);

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-black p-2 border border-gray-300 dark:border-gray-800 rounded shadow">
                <p className="font-bold">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} style={{ color: entry.color }} className='capitalize'>
                        {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value ? entry.value : "N/A"}
                        {entry.payload.topic && <span> - {entry.payload.topic}</span>}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const CustomYearTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-black p-2 border border-gray-300 dark:border-gray-800 rounded shadow">
                <p className="font-bold">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} style={{ color: entry.color }} className='capitalize'>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
    </div>
);

const IntensityChart: React.FC<{ data: any[] }> = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type='number' />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="intensity" name="Intensity" fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
);

const LikelihoodVsRelevanceChart: React.FC<{ data: any[] }> = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="likelihood" name="Likelihood" domain={[0, 5]} />
            <YAxis type="number" dataKey="relevance" name="Relevance" domain={[0, 7]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            <Legend />
            <Scatter name="Topics" data={data} fill="#8884d8" />
        </ScatterChart>
    </ResponsiveContainer>
);

const SectorDistributionChart: React.FC<{ data: any[] }> = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
        </PieChart>
    </ResponsiveContainer>
);

const TimelineChart: React.FC<{ data: any[] }> = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="start" name="Start Year" domain={[2000, 2050]} />
            <YAxis type="number" dataKey="end" name="End Year" domain={[2000, 2250]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomYearTooltip />} />
            <Legend />
            <Scatter name="Timeline" data={data} fill="#8884d8" />
        </ScatterChart>
    </ResponsiveContainer>
);

const ChartsGroup: React.FC<{ data: DataItem[] }> = ({ data }) => {
    const initialFilters: Filters = {
        endYear: '',
        topic: '',
        sector: '',
        region: '',
        pestle: '',
        source: '',
        swot: '',
        country: '',
    };

    const [filteredData, setFilteredData] = useState<DataItem[]>(data);
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const [isLoading, setIsLoading] = useState(true);

    const isAnyFilterActive = useMemo(() =>
        Object.values(filters).some(value => value !== ''),
        [filters]
    );

    const getUniqueValues = useCallback((key: keyof DataItem): string[] => {
        return [...new Set(data.map(item => item[key]))].filter(Boolean) as string[];
    }, [data]);

    const endYearOptions = useMemo(() => {
        const years = getUniqueValues('end_year' as keyof DataItem);
        return years.filter(year => {
            const numYear = Number(year);
            return !isNaN(numYear) && numYear >= 2000 && numYear <= 2250;
        }).sort((a, b) => Number(a) - Number(b));
    }, [getUniqueValues]);

    useEffect(() => {
        setIsLoading(true);
        const newFilteredData = data.filter(item => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                if (key === 'endYear') {
                    return item.end_year?.toString() === value;
                }
                return item[key as keyof DataItem]?.toString() === value;
            });
        });
        setFilteredData(newFilteredData);
        setTimeout(() => setIsLoading(false), 500);
    }, [filters, data]);

    const handleFilterChange = useCallback((filterName: FilterKeys) => (value: string) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(initialFilters);
    }, []);

    const intensityData = useMemo(() => {
        const topicIntensities = filteredData.reduce((acc, item) => {
            const key = item.topic || "N/A";
            acc[key] = (acc[key] || 0) + item.intensity;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(topicIntensities)
            .map(([name, intensity]) => ({ name, intensity }))
            .sort((a, b) => b.intensity - a.intensity)
            .slice(0, 10);
    }, [filteredData]);

    const likelihoodVsRelevanceData = useMemo(() =>
        filteredData.map(item => ({
            name: item.topic || item.title.slice(0, 20),
            likelihood: item.likelihood,
            relevance: item.relevance,
            topic: item.topic
        })),
        [filteredData]
    );

    const sectorDistributionData = useMemo(() => {
        const sectorCounts = filteredData.reduce((acc, item) => {
            const key = item.sector || "N/A";
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(sectorCounts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 7);
    }, [filteredData]);

    const timelineData = useMemo(() =>
        filteredData
            .filter(item => item.start_year && item.end_year &&
                item.start_year >= 2000 && item.start_year <= 2050 &&
                item.end_year >= 2000 && item.end_year <= 2250)
            .map(item => ({
                name: item.topic || item.title.slice(0, 20),
                start: item.start_year,
                end: item.end_year
            })),
        [filteredData]
    );

    const renderChart = (title: string, ChartComponent: React.FC<{ data: any[] }>, chartData: any[]) => (
        <Card>
            <CardHeader>{title}</CardHeader>
            <CardContent>
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <ChartComponent data={chartData} />
                )}
            </CardContent>
        </Card>
    );

    return (
        <div className="">
            <motion.div
                className="grid grid-cols-4 gap-4 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {(Object.keys(filters) as FilterKeys[]).map((key) => (
                    <FilterSelect
                        key={key}
                        label={key}
                        value={filters[key] ? filters[key] : ""}
                        options={key === 'endYear' ? endYearOptions : getUniqueValues(key as keyof DataItem)}
                        onChange={handleFilterChange(key)}
                    />
                ))}
                {isAnyFilterActive && (
                    <Button onClick={resetFilters} className="flex items-center justify-center col-span-4 bg-transparent text-black dark:text-white hover:bg-black-100">Reset Filters &nbsp;&nbsp;&nbsp;<X size={18} /> </Button>
                )}
            </motion.div>

            <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {renderChart("Top 10 Topics by Intensity", IntensityChart, intensityData)}
                {renderChart("Likelihood vs Relevance", LikelihoodVsRelevanceChart, likelihoodVsRelevanceData)}
                {renderChart("Sector Distribution", SectorDistributionChart, sectorDistributionData)}
                {renderChart("Timeline", TimelineChart, timelineData)}
            </motion.div>
        </div>
    );
};

export default ChartsGroup;