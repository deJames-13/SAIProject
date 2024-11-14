import BlockIcon from '@mui/icons-material/Block';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WarningIcon from '@mui/icons-material/Warning';
import { CircularProgress } from '@mui/material';
import React from 'react';

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
    if (!analyses) return <>
        <h4 className='font-semibold border-y border-slate-500 m-0 flex gap-2 py-1'>
            <span>
                No analyses available
            </span>
        </h4>
    </>;
    const {
        id = null,
        status = 'ok',
        type = null,
        attributes: {
            url = '',
            categories = {},
            last_analysis_date: date = '',
            last_analysis_results: results = {},
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
            title = '',
            html_meta: {
                description = [],
            } = {},
            reputation = 0,
        } = {},
    } = analyses

    return !id ? '' : (
        <>
            <div className="grid md:grid-cols-2 overflow-clip overflow-y-auto gap-2">
                <div className=''>
                    <div className="flex gap-4 items-center">
                        <p className='italic font-light m-0'>
                            Title:
                        </p>
                        <h4 className='font-semibold m-0'>
                            {title}
                        </h4>
                    </div>
                    <div className="flex gap-4 items-start">
                        <p className='italic font-light m-0'>
                            Description:
                        </p>
                        <h4 className='font-semibold m-0'>
                            {description.join(' ')}
                        </h4>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className='italic font-light m-0'>
                            URL:
                        </p>
                        <h4 className='font-semibold m-0'>
                            {url}
                        </h4>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className='italic font-light m-0'>
                            Reputation:
                        </p>
                        <h4 className='font-semibold m-0'>
                            {reputation}
                        </h4>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className='italic font-light m-0'>
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
                <div className=''>
                    <div className="flex gap-4 items-center">
                        <p className='italic font-light m-0'>
                            Status Code:
                        </p>
                        <h4 className='font-semibold m-0'>
                            {last_http_response_code}
                        </h4>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className='italic font-light m-0'>
                            Last Submitted:
                        </p>
                        <h4 className='font-semibold m-0'>
                            {Date(last_submission_date)}
                        </h4>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className='italic font-light m-0'>
                            Last Analysis:
                        </p>
                        <h4 className='font-semibold m-0'>
                            {Date(date)}
                        </h4>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className='italic font-light m-0'>
                            Time Submitted:
                        </p>
                        <h4 className='font-semibold m-0'>
                            {times_submitted}
                        </h4>
                    </div>
                </div>

                <div>
                    <h4 className='font-semibold border-y border-slate-500 m-0 flex gap-2 py-1'>
                        {
                            status === 'in-progress' || status === 'queued' ? <CircularProgress size="1.2rem" /> : ''
                        }
                        <span>
                            URL Security analysis
                        </span>
                    </h4>
                    <p className='italic font-light text-gray-600 m-0'>
                        ID: {id}
                    </p>
                    <p className='italic font-light text-gray-600 m-0'>
                        {Date(date)}
                    </p>
                </div>
                <div>
                    <h4 className='font-semibold border-y border-slate-500 m-0 flex gap-2 py-1'>
                        <span>
                            Stats
                        </span>
                    </h4>
                    <div className="grid md:grid-cols-2">
                        <div className='grid grid-cols-3 border-b'>
                            <h4 className='font-semibold border-slate-300 m-0'>
                                Harmless
                            </h4>
                            <p className='italic font-light m-0'>
                                {harmless}
                            </p>
                        </div>
                        <div className='grid grid-cols-3 border-b'>
                            <h4 className='font-semibold border-slate-300 m-0'>
                                Malicious
                            </h4>
                            <p className='italic font-light m-0'>
                                {malicious}
                            </p>
                        </div>
                        <div className='grid grid-cols-3 border-b'>
                            <h4 className='font-semibold border-slate-300 m-0'>
                                Suspicious
                            </h4>
                            <p className='italic font-light m-0'>
                                {suspicious}
                            </p>
                        </div>
                        <div className='grid grid-cols-3 border-b'>
                            <h4 className='font-semibold border-slate-300 m-0'>
                                Undetected
                            </h4>
                            <p className='italic font-light m-0'>
                                {undetected}
                            </p>
                        </div>
                        <div className='grid grid-cols-3 border-b'>
                            <h4 className='font-semibold border-slate-300 m-0'>
                                Timeout
                            </h4>
                            <p className='italic font-light m-0'>
                                {timeout}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="md: col-span-2">
                    <h4 className='font-semibold border-y border-slate-500 m-0'>
                        Results
                    </h4>
                    <div className="grid md:grid-cols-2">
                        {Object.keys(results).map((key, index) => {
                            const color = colors[results[key]?.category];
                            const icon = icons[results[key]?.category];

                            return (
                                <div key={index} className='grid grid-cols-3 border-b'>
                                    <h4 className='font-semibold border-slate-300 m-0'>
                                        {key}
                                    </h4>
                                    <div className={`flex gap-2 col-span-2 ${color}`}>
                                        <p className='italic font-light m-0'>
                                            {icon}
                                        </p>
                                        <p className='italic font-light m-0'>
                                            {results[key]?.category}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
