
import MDBox from 'components/MDBox';
import ReportTable from './report-table';

export default function Reports({ type = 'url' }) {
  return (
    <MDBox display="flex">

      <ReportTable type={type} />

    </MDBox>
  )
}
