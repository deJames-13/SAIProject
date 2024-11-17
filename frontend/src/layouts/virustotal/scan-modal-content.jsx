import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function ScanModalContent({ report, idx, type = 'url' }) {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    return (
        <>
            {/* Print Button */}
            <div className="flex items-center justify-end text-sm mb-2">
                <MDButton className='btn btn-ghost uppercase font-bold' onClick={reactToPrintFn}>
                    Print
                </MDButton>
            </div>
            <div className="p-4 text-lg bg-gray-100 rounded-md" ref={contentRef}>

                {/* Threat Report Summary */}
                <MDBox className="w-full max-w-5xl bg-white shadow-md p-4 rounded-md mb-4">
                    <h2 className="text-2xl font-bold mb-4">Threat Report</h2>
                    <div className="mb-4">
                        <div className="flex gap-4 items-start mb-2">
                            <div className="font-bold text-gray-700">Scan ID:</div>
                            <div className="text-gray-900 break-all w-2/3">{report?.analysis?.scan_id || 'N/A'}</div>
                        </div>
                        <div className="flex gap-4 items-start mb-2">
                            <div className="font-bold text-gray-700">Scan Type:</div>
                            <div className="text-gray-900">{type.toUpperCase()}</div>
                        </div>
                        <div className="flex gap-4 items-start mb-2">
                            <div className="font-bold text-gray-700">Title:</div>
                            {type === 'url' && <div className="text-gray-900">{report?.title || 'N/A'}</div>}
                            {type === 'file' && <div className="text-gray-900">{report?.file_name || 'N/A'}</div>}
                        </div>
                        {type === 'file' && (
                            <div className="flex gap-4 items-start mb-2">
                                <div className="font-bold text-gray-700">File Type:</div>
                                <div className="text-gray-900">{report?.file_type || 'N/A'}</div>
                            </div>
                        )}
                        {type === 'url' && (
                            <div className="flex gap-4 items-start mb-2">
                                <div className="font-bold text-gray-700">URL:</div>
                                <a
                                    href={report?.url}
                                    className="text-blue-600 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {report?.url}
                                </a>
                            </div>
                        )}
                        <div className="flex gap-4 items-start mb-2">
                            <div className="font-bold text-gray-700">Description:</div>
                            <div className="text-gray-900">{report?.analysis?.description || 'N/A'}</div>
                        </div>
                    </div>
                </MDBox>

                {/* Analysis Section */}
                <MDBox className="w-full max-w-5xl bg-white shadow-md p-4 rounded-md mb-4">
                    <h3 className="text-xl font-bold mb-4">Analysis</h3>
                    <div className="flex gap-4 items-start mb-2">
                        <div className="font-bold text-gray-700">Reputation:</div>
                        <div className={`text-gray-900 ${report?.analysis?.reputation < 0 ? 'text-red-600' : ''}`}>
                            {report?.analysis?.reputation}
                        </div>
                    </div>
                    <div className="flex gap-4 items-start mb-2">
                        <div className="font-bold text-gray-700">Times Submitted:</div>
                        <div className="text-gray-900">{report?.analysis?.times_submitted}</div>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <h4 className="font-bold text-gray-700">Votes:</h4>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(report?.analysis?.votes || {}).map(([key, value]) => (
                                <MDBox className="flex gap-4 items-start bg-gray-50 p-2 rounded" key={key + idx}>
                                    <span className="font-bold text-gray-700">{key}:</span>
                                    <span className="text-gray-900">{value}</span>
                                </MDBox>
                            ))}
                        </div>
                    </div>
                </MDBox>

                {/* Last Analysis Stats */}
                <MDBox className="w-full max-w-5xl bg-white shadow-md p-4 rounded-md mb-4">
                    <h3 className="text-xl font-bold mb-4">Last Analysis Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(report?.analysis?.last_analysis_stats || {}).map(([key, value]) => (
                            <MDBox className="flex gap-4 items-start bg-gray-50 p-2 rounded" key={key + idx}>
                                <span className="font-bold text-gray-700 capitalize">{key}:</span>
                                <span className="text-gray-900">{value}</span>
                            </MDBox>
                        ))}
                    </div>
                </MDBox>

                {/* Hashes Section */}
                {type === 'file' && (
                    <MDBox className="w-full max-w-5xl bg-white shadow-md p-4 rounded-md">
                        <h3 className="text-xl font-bold mb-4">Hashes</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(report?.hashes || {}).map(([key, value]) => (
                                <MDBox className="flex gap-4 items-start bg-gray-50 p-2 rounded" key={key + idx}>
                                    <span className="font-bold text-gray-700 uppercase">{key}:</span>
                                    <span className="text-gray-900 break-all">{value}</span>
                                </MDBox>
                            ))}
                        </div>
                    </MDBox>
                )}
            </div>
        </>
    );
}
