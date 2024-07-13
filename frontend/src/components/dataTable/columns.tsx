import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { formatData } from "./utils/formatData"
import { DataItem } from "../../types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

export const columns: ColumnDef<DataItem>[] = [
  {
    accessorKey: "end_year",
    header: ({ column }) => <DataTableColumnHeader column={column} title="End Year" />,
    cell: ({ row }) => formatData(row.getValue("end_year"), ""),
  },
  {
    accessorKey: "intensity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Intensity" />,
    cell: ({ row }) => formatData(row.getValue("intensity"), "number"),
  },
  {
    accessorKey: "sector",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sector" />,
  },
  {
    accessorKey: "topic",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Topic" />,
    cell: ({ row }) => {
      const topic = row.getValue("topic")
      const func = (topic: any) => {
        return <p className="capitalize">{topic}</p>
      }
      return topic ? (
        func(topic)
      ) : (
        'N/A'
      )
    },
  },
  {
    accessorKey: "insight",
    header: "Insight",
    cell: ({ row }) => {
      const insight = row.getValue("insight")
      return insight ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="truncate max-w-[250px]">{formatData(insight, "string")}</TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[400px]">{formatData(insight, "tooltip")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        'N/A'
      )
    },

  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      const url = row.getValue("url")
      return url ? (
        <a href={String(url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link</a>
      ) : (
        'N/A'
      )
    },
  },
  {
    accessorKey: "region",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Region" />,
  },
  {
    accessorKey: "start_year",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Year" />,
    cell: ({ row }) => formatData(row.getValue("start_year"), ""),
  },
  {
    accessorKey: "impact",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Impact" />,
  },
  {
    accessorKey: "added",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Added" />,
    cell: ({ row }) => formatData(row.getValue("added"), "date"),
  },
  {
    accessorKey: "published",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Published" />,
    cell: ({ row }) => formatData(row.getValue("published"), "date"),
  },
  {
    accessorKey: "country",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
  },
  {
    accessorKey: "relevance",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Relevance" />,
    cell: ({ row }) => formatData(row.getValue("relevance"), "number"),
  },
  {
    accessorKey: "pestle",
    header: ({ column }) => <DataTableColumnHeader column={column} title="PESTLE" />,
  },
  {
    accessorKey: "source",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Source" />,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title")
      return title ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="truncate max-w-[250px]">{formatData(title, "string")}</TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[400px]">{formatData(title, "tooltip")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        'N/A'
      )
    },
    
  },
  {
    accessorKey: "likelihood",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Likelihood" />,
  },
  {
    accessorKey: "swot",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SWOT" />,
    cell: ({ row }) => {
      const swot = row.getValue("swot")
      const func = (swot: any) => {
        switch (swot) {
          case "Threats":
            return <p className="px-2 py-3 bg-red-50 dark:bg-transparent text-red-600 dark:text-red-500 rounded-[10px]">Threats</p>
          case "Weaknesses":
            return <p className="px-2 py-3 bg-yellow-50 dark:bg-transparent text-yellow-600 dark:text-yellow-500 rounded-[10px]">Weaknesses</p>
          case "Strengths":
            return <p className="px-2 py-3 bg-indigo-50 dark:bg-transparent text-indigo-600 dark:text-indigo-500 rounded-[10px]">Strengths</p>
          default:
            return <p className="px-2 py-3 bg-green-50 dark:bg-transparent text-green-600 dark:text-green-500 rounded-[10px]">Opportunities</p>
        }
      }
      return swot ? (
        func(swot)
      ) : (
        'N/A'
      )
    },
  },
]