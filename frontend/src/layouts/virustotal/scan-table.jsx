import BlockIcon from '@mui/icons-material/Block';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WarningIcon from '@mui/icons-material/Warning';
import { CircularProgress } from '@mui/material';

import MDButton from 'components/MDButton';

import useNotification from 'hooks/notifications/useNotification';
import useFileReportAction from 'hooks/virustotal/useFileReportAction';
import useUrlReportAction from 'hooks/virustotal/useUrlReportAction';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';



const colors = {
    'malicious': 'text-red-500',
    'suspicious': 'text-yellow-500',
    'harmless': 'text-green-700',
    'undetected': 'text-gray-500',
}

const icons = {
    'malicious': <CrisisAlertIcon />,
    'suspicious': <WarningIcon />,
    'harmless': <TaskAltIcon />,
    'undetected': <BlockIcon />,
}

export default function AnalysesTable({ analyses = null }) {
    const statsCategory = ["all", "malicious", "suspicious", "harmless", "undetected", "timeout"]
    const [selectedStat, setSelectedStat] = useState('all');
    const [results, setResults] = useState({});
    const noti = useNotification();
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });


    const {
        createUrlReport,
    } = useUrlReportAction();

    const {
        createFileReport,
    } = useFileReportAction();


    useEffect(() => {
        if (!analyses) return;
        if (selectedStat === 'all') return setResults(analyses?.attributes?.last_analysis_results || {});
        const filteredResults = Object.fromEntries(Object.entries(analyses?.attributes?.last_analysis_results || {}).filter(([key, value]) => value?.category === selectedStat));
        setResults(filteredResults);
    }, [analyses, selectedStat]);

    if (!analyses) return " " || (<>
        <h4 className='font-semibold border-y border-slate-500 m-0 flex gap-2 py-1'>
            <span>
                No analyses available
            </span>
        </h4>
    </>);

    const {
        id = null,
        status = 'ok',
        type,
        attributes: {
            sha1 = '',
            sha256 = '',
            md5 = '',
            ssdeep = '',
            tlsh = '',
            type_description: file_type = 'No file type',
            meaningful_name: file_name = 'No file name',
            size: file_size = 0,
            tags = [],
            url = '',
            categories = {},
            last_analysis_date: date = '',
            last_analysis_results: _results = {},
            last_analysis_stats: {
                harmless = 0,
                malicious = 0,
                suspicious = 0,
                undetected = 0,
                timeout = 0,
            } = {},
            last_http_response_code = 0,
            last_submission_date = '',
            times_submitted = 0,
            total_votes = {},
            title = 'No title',
            html_meta: {
                description = [],
            } = {},
            reputation = 0,
        } = {},
    } = analyses || {};


    const analysisPayload = () => ({
        description: description.join(' '),
        reputation,
        times_submitted,
        last_analysis_stats: {
            harmless,
            malicious,
            suspicious,
            undetected,
            timeout,
        },
        votes: total_votes,
        scan_id: id,
    })

    const urlPayload = () => ({
        title: title || 'No title',
        url: url,
        analysis: analysisPayload(),
    })

    const filePayload = () => ({
        file_name: file_name || 'No name',
        file_type: file_type || 'No type',
        hashes: {
            sha256: id,
            sha1,
            md5,
            ssdeep,
            tlsh,
        },
        analysis: analysisPayload(),
    })

    const handleSave = async () => {
        try {
            const payload = type === 'url' ? urlPayload() : filePayload();
            if (type === 'url')
                await createUrlReport(payload);
            if (type === 'file')
                await createFileReport(payload)
            noti.success('Report saved successfully');
        } catch (error) {
            noti.error('Failed to save report');
        }


    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    };



    return !id ? '' : (
        <>
            <div className="flex w-full justify-end items-center gap-2">
                <MDButton
                    color='success'
                    variant='contained'
                    onClick={handleSave}
                >
                    Save
                </MDButton>
                <MDButton
                    color='info'
                    variant='contained'
                    onClick={reactToPrintFn}
                >
                    Print
                </MDButton>
            </div>
            <div className="p-4" >
                <div className="flex gap-4 items-center">
                    <p className=''>
                        Type:
                    </p>
                    <h4 className='font-semibold m-0'>
                        {type.toUpperCase()}
                    </h4>
                </div>
                <div ref={contentRef} className="print:p-4 grid md:grid-cols-2 overflow-clip overflow-y-auto gap-2">
                    {type == 'url' &&
                        <>
                            <div className=''>
                                <>
                                    <div className="flex gap-4 items-center">
                                        <p className=''>
                                            Title:
                                        </p>
                                        <h4 className='font-semibold m-0'>
                                            {title}
                                        </h4>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <p className=''>
                                            Description:
                                        </p>
                                        <h4 className='font-semibold m-0'>
                                            {description.join(' ')}
                                        </h4>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <p className=''>
                                            URL:
                                        </p>
                                        <h4 className='font-semibold m-0 break-all'>
                                            {url}
                                        </h4>
                                    </div>
                                </>
                            </div>
                        </>
                    }
                    {type == 'file' && <>
                        <div className=''>
                            <>
                                <div className="print:border-y-2 flex gap-4 items-center">
                                    <p className=''>
                                        File Name:
                                    </p>
                                    <h4 className='font-semibold m-0'>
                                        {file_name}
                                    </h4>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <p className=''>
                                        File Type:
                                    </p>
                                    <h4 className='font-semibold m-0'>
                                        {file_type}
                                    </h4>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <p className=''>
                                        Size:
                                    </p>
                                    <h4 className='font-semibold m-0'>
                                        {file_size}
                                    </h4>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <p className=''>
                                        Tags:
                                    </p>
                                    <h4 className='font-semibold m-0'>
                                        {tags.join(', ')}
                                    </h4>
                                </div>
                            </>
                        </div>
                    </>}

                    <div className=''>
                        <div className="flex gap-4 items-center">
                            <p className=''>
                                Status Code:
                            </p>
                            <h4 className='font-semibold m-0'>
                                {last_http_response_code}
                            </h4>
                        </div>
                        <div className="flex gap-4 items-center">
                            <p className=''>
                                Last Submitted:
                            </p>
                            <h4 className='font-semibold m-0'>
                                {formatDate(last_submission_date).toLocaleString()}
                            </h4>
                        </div>
                        <div className="flex gap-4 items-center">
                            <p className=''>
                                Last Analysis:
                            </p>
                            <h4 className='font-semibold m-0'>
                                {formatDate(last_submission_date).toLocaleString()}
                            </h4>
                        </div>
                        <div className="flex gap-4 items-center">
                            <p className=''>
                                Time Submitted:
                            </p>
                            <h4 className='font-semibold m-0'>
                                {times_submitted}
                            </h4>
                        </div>
                    </div>

                    {/* URL ANALYSIS */}
                    <div>
                        <h4 className='print:border-y-2 font-semibold border-y border-slate-500 m-0 flex gap-2 py-1'>
                            {
                                status === 'in-progress' || status === 'queued' ? <CircularProgress size="1.2rem" /> : ''
                            }
                            <span>
                                URL Security analysis
                            </span>
                        </h4>

                        <div className="flex gap-4 items-center">
                            <p className=''>
                                ID:
                            </p>
                            <h4 className='font-semibold m-0 break-all'>
                                {id}
                            </h4>
                        </div>
                        <div className="flex gap-4 items-center">
                            <p className=''>
                                Date:
                            </p>
                            <h4 className='font-semibold m-0'>
                                {formatDate(date).toLocaleString()}
                            </h4>
                        </div>

                        <div className="flex gap-4 items-center">
                            <p className=''>
                                Reputation:
                            </p>
                            <h4 className='font-semibold m-0'>
                                {reputation}
                            </h4>
                        </div>
                        <div className="flex gap-4 items-center">
                            <p className=''>
                                Votes:
                            </p>
                            <h4 className='font-semibold m-0'>
                                {
                                    Object.values(total_votes).reduce((a, b) => a + b, 0)
                                }
                                &nbsp;
                                <span className='font-light italic'>
                                    ({
                                        Object.entries(total_votes).map(([key, value]) => `${key}: ${value}`).join(', ')
                                    })
                                </span>
                            </h4>
                        </div>
                    </div>

                    {/* STATS */}
                    <div>
                        <h4 className='print:border-y-2 font-semibold border-y border-slate-500 m-0 flex gap-2 py-1'>
                            <span>
                                Stats
                            </span>
                        </h4>
                        <div className="grid md:grid-cols-2">
                            <div className='grid grid-cols-3 border-b'>
                                <h4 className='font-semibold border-slate-300 m-0'>
                                    Harmless
                                </h4>
                                <p className=''>
                                    {harmless}
                                </p>
                            </div>
                            <div className='grid grid-cols-3 border-b text-red-400'>
                                <h4 className='font-semibold border-slate-300 m-0 '>
                                    Malicious
                                </h4>
                                <p className=''>
                                    {malicious}
                                </p>
                            </div>
                            <div className='grid grid-cols-3 border-b text-yellow-400' >
                                <h4 className='font-semibold border-slate-300 m-0'>
                                    Suspicious
                                </h4>
                                <p className=''>
                                    {suspicious}
                                </p>
                            </div>
                            <div className='grid grid-cols-3 border-b'>
                                <h4 className='font-semibold border-slate-300 m-0'>
                                    Undetected
                                </h4>
                                <p className=''>
                                    {undetected}
                                </p>
                            </div>
                            <div className='grid grid-cols-3 border-b'>
                                <h4 className='font-semibold border-slate-300 m-0'>
                                    Timeout
                                </h4>
                                <p className=''>
                                    {timeout}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className='border-y border-slate-500 flex flex-col md:flex-row md:justify-between md:items-center'>
                            <h4 className='print:border-y-2 font-semibold  m-0'>
                                Results
                            </h4>
                            <div className='print:hidden'>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        statsCategory.map((stat, index) => (
                                            <div key={index} className='flex gap-2 items-center'>
                                                <input
                                                    type="radio"
                                                    name="stat"
                                                    value={stat}
                                                    checked={selectedStat === stat}
                                                    onChange={() => setSelectedStat(stat)}
                                                />
                                                <label>
                                                    {stat}
                                                </label>
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>
                        </div>
                        <div className="grid md:grid-cols-2">
                            {/* no results */}
                            {
                                Object.keys(results).length === 0 && (
                                    <div className='flex gap-2 items-center'>
                                        <p className='text-red-500'>
                                            No results
                                        </p>
                                    </div>
                                )
                            }
                            {Object.keys(results).map((key, index) => {
                                const color = colors[results[key]?.category];
                                const icon = icons[results[key]?.category];

                                return (
                                    <div key={index} className='grid grid-cols-3 border-b'>
                                        <h4 className='font-semibold border-slate-300 m-0'>
                                            {key}
                                        </h4>
                                        <div className={`flex gap-2 col-span-2 ${color}`}>
                                            <p className=''>
                                                {icon}
                                            </p>
                                            <p className=''>
                                                {results[key]?.category}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="print:hidden">
                        {noti.renderNotifications}
                    </div>
                </div>
            </div>
        </>
    )
}
