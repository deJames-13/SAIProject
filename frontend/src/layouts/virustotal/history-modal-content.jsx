import React from 'react';

export default function HistoryModalContent({ history }) {
    console.log(JSON.stringify(history, null, 2));

    return (
        <div className="p-4 text-lg bg-gray-100 rounded-md">
            {/* History Details Section */}
            <div className="w-full max-w-5xl bg-white shadow-md p-4 rounded-md mb-4">
                <h2 className="text-2xl font-bold mb-4">Scan History Details</h2>
                <div className="flex gap-4 items-start mb-2">
                    <div className="font-bold text-gray-700">Title:</div>
                    <div className="text-gray-900">{history?.title || 'N/A'}</div>
                </div>
                <div className="flex gap-4 items-start mb-2">
                    <div className="font-bold text-gray-700">Message:</div>
                    <div className="text-gray-900 break-all">{history?.message || 'N/A'}</div>
                </div>
                <div className="flex gap-4 items-start mb-2">
                    <div className="font-bold text-gray-700">Scan Type:</div>
                    <div className="text-gray-900 capitalize">{history?.scan_type || 'N/A'}</div>
                </div>
                <div className="flex gap-4 items-start mb-2">
                    <div className="font-bold text-gray-700">Scan Date:</div>
                    <div className="text-gray-900">{new Date(history?.scan_date).toLocaleString() || 'N/A'}</div>
                </div>
                <div className="flex gap-4 items-start mb-2">
                    <div className="font-bold text-gray-700">Timestamp:</div>
                    <div className="text-gray-900">{new Date(history?.timestamp).toLocaleString() || 'N/A'}</div>
                </div>
                <div className="flex gap-4 items-start mb-2">
                    <div className="font-bold text-gray-700">Permalink:</div>
                    <a
                        href={history?.permalink}
                        className="text-blue-600 hover:underline break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {history?.permalink || 'N/A'}
                    </a>
                </div>
            </div>

            {/* Scan Stats Section */}
            <div className="w-full max-w-5xl bg-white shadow-md p-4 rounded-md mb-4">
                <h3 className="text-xl font-bold mb-4">Scan Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(history?.scan_stats || {}).map(([key, value]) => (
                        <div
                            className="flex gap-4 items-start bg-gray-50 p-2 rounded"
                            key={`stats-${key}`}
                        >
                            <span className="font-bold text-gray-700 capitalize">{key}:</span>
                            <span className="text-gray-900">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scan Votes Section */}
            <div className="w-full max-w-5xl bg-white shadow-md p-4 rounded-md">
                <h3 className="text-xl font-bold mb-4">Scan Votes</h3>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(history?.scan_votes || {}).map(([key, value]) => (
                        <div
                            className="flex gap-4 items-start bg-gray-50 p-2 rounded"
                            key={`votes-${key}`}
                        >
                            <span className="font-bold text-gray-700 capitalize">{key}:</span>
                            <span className="text-gray-900">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
