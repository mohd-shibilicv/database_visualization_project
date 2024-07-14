import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface FilterSelectProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, options, onChange }) => (
    <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full capitalize">
            <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                {options
                    .filter(option => option !== null && option !== undefined && option !== '')
                    .map(option => (
                        <SelectItem key={option} value={option}>
                            {option || 'N/A'}
                        </SelectItem>
                    ))}
            </SelectGroup>
        </SelectContent>
    </Select>
);