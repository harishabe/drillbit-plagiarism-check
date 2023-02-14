import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Admin from "../../layouts/Admin";
import styled from 'styled-components';
import { Box, Pagination } from '@mui/material';
import {
  MainHeading,
  CreateDrawer,
  CardView,
  CommonTable,
} from './../../components';
import {
  EditIcon,
} from '../../assets/icon';
import {
  GetExtremeRefData,
} from '../../redux/action/super/SuperAdminAction';
import RefForm from './form/RefForm';
import { PaginationContainer } from '../../style/index';
import { PaginationValue } from '../../utils/PaginationUrl';
import END_POINTS from "../../utils/EndPoints";

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const columns = [
  { id: 'college_name', label: 'Institution name' },
  { id: 'country', label: 'Location' },
  { id: 'start_date', label: 'Start date' },
  { id: 'expiry_date', label: 'Expiry date' },
  { id: 'used_documents', label: 'Document submissions' },
  { id: 'action', label: 'Action' }
];

function createData(college_name, country, start_date, expiry_date, used_documents, action, lid, name, email, instructors, students, documents, state, address, designation, phone, created_date, document_type, grammar, grammar_documents, license_type, product_type, timeZone, folpath, department) {

  return { college_name, country, start_date, expiry_date, used_documents, action, lid, name, email, instructors, students, documents, state, address, designation, phone, created_date, document_type, grammar, grammar_documents, license_type, product_type, timeZone, folpath, department };
}

const ProProduct = ({
  GetExtremeRefData,
  pageDetails,
  extremeData,
  isLoading
}) => {

  const [rows, setRows] = useState([]);
  const [paginationPayload, setPaginationPayload] = useState({
    page: PaginationValue?.page,
    size: PaginationValue?.size,
    field: 'name',
    orderBy: PaginationValue?.orderBy,
  });
  const [editUser, setEditUser] = useState(false);
  const [editUserData, setEditUserData] = useState('');

  useEffect(() => {
    GetExtremeRefData(END_POINTS.RESELLER_PRO_LICENSES, paginationPayload);
  }, [, paginationPayload]);

  useEffect(() => {
    let row = '';
    let arr = [];
    extremeData?.map((data) => {
      row =
        createData(
          data.college_name,
          data.country,
          data.start_date,
          data.expiry_date,
          data.used_documents,
          [
            { 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' }
          ],
          data.lid,
          data.name,
          data.email,
          data.instructors,
          data.students,
          data.documents,
          data.state,
          data.address,
          data.designation,
          data.phone,
          data.created_date,
          data.document_type,
          data.grammar,
          data.grammar_documents,
          data.license_type,
          data.product_type,
          data.timeZone,
          data.folpath,
          data.department,
        );
      arr.push(row);
    });
    setRows([...arr]);
  }, [extremeData]);

  const handleTableSort = (e, column, sortToggle) => {
    if (sortToggle) {
      paginationPayload['field'] = column.id;
      paginationPayload['orderBy'] = 'asc';
    } else {
      paginationPayload['field'] = column.id;
      paginationPayload['orderBy'] = 'desc';
    }
    setPaginationPayload({ ...paginationPayload, paginationPayload });
  };

  const handleChange = (event, value) => {
    event.preventDefault();
    setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
  };

  const handleAction = (event, icon, rowData) => {
    if (icon === 'edit') {
      setEditUser(true);
      setEditUserData(rowData);
    }
  };

  const handleCloseDrawer = (drawerClose) => {
    setEditUser(drawerClose);
  };

  return <>
    <MainHeading title={ `Pro (${pageDetails?.totalElements === undefined ? 0 : pageDetails?.totalElements})` } />

    <Box sx={ { mt: 1, flexGrow: 1 } }>
      <CardView>
        <CommonTable
          isCheckbox={ false }
          isSorting={ true }
          tableHeader={ columns }
          tableData={ rows }
          isLoading={ isLoading }
          charLength={ 11 }
          handleAction={ handleAction }
          handleTableSort={ handleTableSort }
        />
      </CardView>
    </Box>

    {
      editUser &&
      <CreateDrawer
        title="Edit User"
        isShowAddIcon={ false }
        showDrawer={ editUser }
        handleDrawerClose={ handleCloseDrawer }
      >
        <RefForm
          editData={ editUserData }
        />
      </CreateDrawer>
    }

    <AddButtonBottom>
      <CreateDrawer
        title="Create Pro Account"
        isShowAddIcon={ true }
      >
        <RefForm />
      </CreateDrawer>
    </AddButtonBottom>

    <PaginationContainer>
      <Pagination
        count={ pageDetails?.totalPages }
        onChange={ handleChange }
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </PaginationContainer>
  </>
};

const mapStateToProps = (state) => ({
  pageDetails: state?.superAdmin?.ExtrRefData?.page,
  extremeData: state?.superAdmin?.ExtrRefData?._embedded?.licenseDTOList,
  isLoading: state?.superAdmin?.isLoadingExtrRef,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetExtremeRefData: (url, paginationValue) => dispatch(GetExtremeRefData(url, paginationValue)),
  };
};

ProProduct.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(ProProduct);
