import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface AnalyticsCardsProps {
    totalInsights: number;
    uniqueTopics: number;
    uniqueSectors: number;
    timeSpan: string;
}

export const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({
    totalInsights,
    uniqueTopics,
    uniqueSectors,
    timeSpan,
}) => (
    <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Insights</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalInsights}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Topics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{uniqueTopics}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Sectors</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{uniqueSectors}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Span</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{timeSpan}</div>
            </CardContent>
        </Card>
    </div>
);