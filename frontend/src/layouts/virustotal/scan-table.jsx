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
        data: {
            id = null,
            attributes: {
                status = null,
                results = {},
                stats: {
                    harmless = 0,
                    malicious = 0,
                    suspicious = 0,
                    undetected = 0,
                    timeout = 0,
                } = {},
                date = null,
            } = {},
        } = {},
        meta: {
            url_info: {
                url = '',
            } = {},
        } = {},

    } = analyses

    return !id ? '' : (
        <>
            <div className="grid md:grid-cols-2 overflow-clip overflow-y-auto gap-2">
                <div>
                    <h4 className='font-semibold border-y border-slate-500 m-0 flex gap-2 py-1'>
                        {
                            status === 'in-progress' || status === 'queued' ? <CircularProgress size="1.2rem" /> : ''
                        }
                        <span>
                            URL Security analysis: {url}
                        </span>
                    </h4>
                    <p className='italic font-light text-gray-600 m-0'>
                        ID: {id}
                    </p>
                    <p className='italic font-light text-gray-600 m-0'>
                        Status: {status.toUpperCase()}
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
