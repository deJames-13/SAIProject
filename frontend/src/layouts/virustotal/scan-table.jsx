import BlockIcon from '@mui/icons-material/Block';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WarningIcon from '@mui/icons-material/Warning';
import { CircularProgress } from '@mui/material';

import MDButton from 'components/MDButton';
import useUrlReportAction from 'hooks/virustotal/useUrlReportAction';
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
    const { createReport, renderNotifications } = useUrlReportAction();


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

    const urlPayload = () => ({
        url: url + '1',
        title,
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

    const filePayload = () => ({})

    const handleSave = () => {
        const payload = type === 'url' ? urlPayload() : filePayload();
        if (type === 'url')
            createReport(payload);


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
                    onClick={handleSave}
                >
                    Comments
                </MDButton>
            </div>
            <div className="flex gap-4 items-center">
                <p className=''>
                    Type:
                </p>
                <h4 className='font-semibold m-0'>
                    {type.toUpperCase()}
                </h4>
            </div>
            <div className="grid md:grid-cols-2 overflow-clip overflow-y-auto gap-2">
                {type == 'url' && <> <div className=''>
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
                            <h4 className='font-semibold m-0'>
                                {url}
                            </h4>
                        </div>
                    </>
                </div>
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
                </>}
                <div>
                    <h4 className='font-semibold border-y border-slate-500 m-0 flex gap-2 py-1'>
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
                        <h4 className='font-semibold m-0'>
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
                {renderNotifications}
            </div>
        </>
    )
}
