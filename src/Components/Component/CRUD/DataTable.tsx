import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Align = "left" | "center" | "right";

interface Column<T> {
    key: keyof T | string;
    label: string;
    width?: string;
    align?: Align;
    render?: (row: T, index: number) => React.ReactNode;
}


interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    page?: number;
    itemsPerPage?: number;
    total?: number;
    onPageChange?: (page: number) => void;
    loading?: boolean;
    error?: string;
    rowKey?: (row: T, index: number) => React.Key;
    emptyMessage?: string;
}

const alignClass: Record<Align, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
};

const SkeletonCell = () => (
    <div className="h-4 bg-gray-200 rounded animate-pulse" />
);

export default function DataTable<T>({
    data,
    columns,
    page = 1,
    itemsPerPage = 10,
    total,
    onPageChange,
    loading = false,
    error,
    rowKey,
    emptyMessage = "Tidak ada data",
}: DataTableProps<T>) {
    const isPaginated = total !== undefined && onPageChange;
    const totalPages = isPaginated
        ? Math.ceil((total ?? 0) / itemsPerPage)
        : 1;

    const from = (page - 1) * itemsPerPage + 1;
    const to = isPaginated
        ? Math.min(page * itemsPerPage, total!)
        : data.length;

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* HEADER */}
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    className={`px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 ${alignClass[col.align || "left"]
                                        }`}
                                    style={{ width: col.width }}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {error ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center p-6 text-red-500 font-medium"
                                >
                                    {error}
                                </td>
                            </tr>
                        ) : loading ? (
                            [...Array(itemsPerPage)].map((_, i) => (
                                <tr key={i}>
                                    {columns.map((_, j) => (
                                        <td key={j} className="px-6 py-4">
                                            <SkeletonCell />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center p-6 text-gray-500"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, index) => (
                                <tr
                                    key={rowKey ? rowKey(row, index) : index}
                                    className="hover:bg-gray-50 transition"
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={String(col.key)}
                                            className={`px-6 py-4 text-sm text-gray-700 ${alignClass[col.align || "left"]
                                                }`}
                                            style={{ width: col.width }}
                                        >
                                            {col.render
                                                ? col.render(row, index)
                                                : (row as any)[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            {isPaginated && (
                <div className="flex justify-between items-center p-4 border-t border-gray-300 text-sm text-gray-600">
                    <div>
                        Menampilkan {from} - {to} dari {total}
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => onPageChange?.(Math.max(1, page - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded-lg bg-white disabled:opacity-50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <span>
                            {page} / {totalPages}
                        </span>

                        <button
                            onClick={() =>
                                onPageChange?.(Math.min(totalPages, page + 1))
                            }
                            disabled={page === totalPages}
                            className="px-3 py-1 border rounded-lg bg-white disabled:opacity-50"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
