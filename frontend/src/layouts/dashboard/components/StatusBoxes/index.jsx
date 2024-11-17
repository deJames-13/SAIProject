import { Grid } from '@mui/material'
import { amber } from '@mui/material/colors'
import ComplexStatisticsCard from 'components/Cards/StatisticsCards/ComplexStatisticsCard'
import MDBox from 'components/MDBox'
import React from 'react'
import vtApi from 'states/virustotal/api'
export default function StatusBoxes() {
    const {
        useGetMetaDataMutation
    } = vtApi

    const [getMetaData] = useGetMetaDataMutation()
    const [metaData, setMetaData] = React.useState(null)

    React.useEffect(() => {
        getMetaData().then((res) => {
            setMetaData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    // {"scanned_url":1,"scanned_files":0,"total_scans":1,"stats":{"malicious":1,"harmless":68,"suspicious":1,"undetected":26,"timeout":0}}
    const maliciousPercentage = metaData ? (metaData.stats.malicious / metaData.total_scans) * 100 : 0



    return (
        <>
            {/* Status Boxes */}
            <Grid container spacing={3}>

                {/* URL SCANS COUNT */}
                <Grid item xs={12} md={6} lg={3}>
                    <MDBox mb={1.5}>
                        <ComplexStatisticsCard
                            color="dark"
                            icon="links"
                            title="URL Scanned"
                            count={metaData ? metaData.scanned_url : 0}
                        // percentage={{
                        // color: "success",
                        // amount: "+55%",
                        // label: "than last week",
                        // }}
                        />
                    </MDBox>
                </Grid>

                {/* FILE SCANS COUNT */}
                <Grid item xs={12} md={6} lg={3}>
                    <MDBox mb={1.5}>
                        <ComplexStatisticsCard
                            icon="file_copy"
                            title="File Scanned"
                            count={metaData ? metaData.scanned_files : 0}
                            percentage={{
                                color: amber[500],
                            }}
                        />
                    </MDBox>
                </Grid>

                {/* SAVE REPORTS */}
                <Grid item xs={12} md={6} lg={3}>
                    <MDBox mb={1.5}>
                        <ComplexStatisticsCard
                            color="success"
                            icon="save"
                            title="Total Reports"
                            count={metaData ? metaData.total_scans : 0}
                        // percentage={{
                        // color: "success",
                        // amount: "+1%",
                        // label: "than yesterday",
                        // }}
                        />
                    </MDBox>
                </Grid>

                {/* MALICIOUS DETECTED COUNT */}
                <Grid item xs={12} md={6} lg={3}>
                    <MDBox mb={1.5}>
                        <ComplexStatisticsCard
                            color="primary"
                            icon="dangerous"
                            title="Malicious Threats"
                            count={metaData ? metaData.stats.malicious : 0}
                            percentage={{
                                color: amber[500],
                                ammount: `${maliciousPercentage.toFixed(2)}%`,
                                label: "Malicious Threats detected in total scans",
                            }}
                        />
                    </MDBox>
                </Grid>
            </Grid>
        </>
    )
}
