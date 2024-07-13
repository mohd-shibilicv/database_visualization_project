import { useEffect, useState } from 'react'
import { fetchData } from '../../services/api'
import { DataItem } from '../../types'
import { columns } from './columns'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table"
import { DataTableToolbar } from './DataTableToolbar'
import { DataTableContent } from './DataTableContent'
import { DataTablePagination } from './DataTablePagination'

export function DataTable() {
  const [data, setData] = useState<DataItem[]>([]);
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetchData()
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };
  
    fetchAllData();
  }, [])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4 my-3">
      <DataTableToolbar table={table} />
      <DataTableContent table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}