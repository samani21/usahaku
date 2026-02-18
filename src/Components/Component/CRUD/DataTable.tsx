import React from "react";
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";

interface Column<T> {
    key: keyof T;
    label?: string;
    width?: string;
    align?: "left" | "center" | "right";
    render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    page: number;
    itemsPerPage: number;
    total: number;
    onPageChange: (page: number) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    loading?: boolean;
    error?: string;
}
const SkeletonCell = () => (
    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
);
export default function DataTable<T extends { id: any }>({
    data,
    columns,
    page,
    itemsPerPage,
    total,
    onPageChange,
    onEdit,
    onDelete,
    loading,
    error
}: DataTableProps<T>) {
    const totalPages = Math.ceil(total / itemsPerPage);

    const renderPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, page - 2);
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 border rounded-lg text-sm ${page === i ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            pages.push(
                <span key="dots" className="px-2">
                    ...
                </span>
            );
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className={`px-3 py-1 border rounded-lg text-sm ${page === totalPages ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    const from = (page - 1) * itemsPerPage + 1;
    const to = Math.min(page * itemsPerPage, total);

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    className={`px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 text-${col.align || "left"}`}
                                >
                                    {col.label}
                                </th>
                            ))}
                            {(onEdit || onDelete) && (
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Aksi</th>
                            )}
                        </tr>
                    </thead>

                    {
                        error ?
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="text-center text-gray-500 p-6 font-bold" colSpan={columns?.length}>{error}</td>
                                </tr>
                            </tbody> :
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading
                                    ? [...Array(itemsPerPage)].map((_, idx) => (
                                        <tr key={idx} className="animate-pulse">
                                            {columns.map((col, i) => (
                                                <td key={i} className="px-6 py-4">
                                                    <SkeletonCell />
                                                </td>
                                            ))}

                                            {(onEdit || onDelete) && (
                                                <td className="px-6 py-4 text-center">
                                                    <div className="w-12 mx-auto">
                                                        <SkeletonCell />
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                    : data.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-50 transition">
                                            {columns.map((col) => (
                                                <td
                                                    key={String(col.key)}
                                                    className={`px-6 py-4 text-sm text-${col.align || "left"} text-gray-700`}
                                                    width={col?.width}
                                                >
                                                    {col.render ? col.render(row) : String(row[col.key])}
                                                </td>
                                            ))}

                                            {(onEdit || onDelete) && (
                                                <td className="px-6 py-4 text-center space-x-2">
                                                    {onEdit && (
                                                        <button
                                                            onClick={() => onEdit(row)}
                                                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition cursor-pointer"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {onDelete && (
                                                        <button
                                                            onClick={() => onDelete(row)}
                                                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition cursor-pointer"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                            </tbody>
                    }

                </table>
            </div>

            <div className="flex justify-between items-center p-4 border-t border-gray-200 text-sm text-gray-600">
                <div>
                    Menampilkan {from} - {to} dari {total}
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onPageChange(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="flex items-center px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {renderPageNumbers()}

                    <button
                        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="flex items-center px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
