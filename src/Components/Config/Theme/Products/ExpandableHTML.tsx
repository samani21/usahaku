import React, { useState } from 'react';


const ExpandableHTML = ({
    htmlContent,
    className = "",
    maxHeight = "max-h-[300px] min-h-[150px]" // Tinggi maksimal scroll
}: {
    htmlContent: any;
    className: string;
    maxLines: string;
    maxHeight?: string;
}) => {
    return (
        <div
            className={`
        ${className} 
        ${maxHeight} 
        overflow-y-auto 
        pr-2
        no-scrollbar
        /* Styling Scrollbar (Opsional) */
        scrollbar-thin 
        scrollbar-thumb-slate-300 
        dark:scrollbar-thumb-slate-600
        /* Selector untuk list agar muncul nomor/bullet */
        [&_ol]:list-decimal [&_ol]:ml-5 [&_ul]:list-disc [&_ul]:ml-5
        [&_p]:mb-3
      `}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default ExpandableHTML;