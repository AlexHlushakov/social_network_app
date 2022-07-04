import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function PaginationControlled(props) {
    const [page, setPage] = React.useState(props.currentPage);
    const handleChange = (event, value) => {
        setPage(value);
        props.onPageChanged(value);
    };
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);

    return (
        <Stack spacing={2}>
            <Pagination style={{
                display: "block",
                margin: "20px auto"
            }} showFirstButton showLastButton count={pagesCount} page={page} onChange={handleChange} />
        </Stack>
    );
}
