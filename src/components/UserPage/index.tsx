import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { amber } from '@mui/material/colors'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import Tooltip from '@mui/material/Tooltip'

import { ButtonOptions } from './types'
import { changeIsAuth } from '../../store/isAuth/isAuthSlice'
import { getIsAuthInfo } from '../../store/isAuth/isAuthSelectors'
import { getUserInfo } from '../../store/user/userSelectors'
import {
  useChangeUsersStatusMutation,
  useDeleteUsersMutation,
  useGetUsersQuery,
} from '../../api/authApi'
import { IUsersDataForTable } from '../../types/common'

import styles from './styles.module.scss'


function UserPage(): JSX.Element {
  const [selectionModel, setSelectionModel] = useState<Array<string | number>>(
    [],
  )
  const dispatch = useDispatch()
  
  const {isAuth} = useSelector(getIsAuthInfo)
  const userData = useSelector(getUserInfo)

  const { data, isFetching } = useGetUsersQuery()
  const [deleteUser] = useDeleteUsersMutation()
  const [changeStatus] = useChangeUsersStatusMutation()

  const logoutHandler = (): void => {
    localStorage.removeItem('token')
    dispatch(changeIsAuth({ isAuth: false }))
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'registrationDate', headerName: 'Registration date', width: 150 },
    { field: 'loginDate', headerName: 'Login date', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
    },
  ]

  const usersData: IUsersDataForTable[] | undefined = data?.map(
    ({ _id, name, email, status, registrationDate, loginDate }) => ({
      id: _id,
      name,
      email,
      status,
      registrationDate,
      loginDate,
    }),
  )

  const deleteUsersHandler = async (): Promise<void> => {
    await deleteUser(selectionModel as string[])
    const user = selectionModel.filter((item) => item === userData.id)
    if (user?.length) {
      logoutHandler()
    }
  }

  const changeStatusHandler = async (value: string): Promise<void> => {
    await changeStatus({
      users: selectionModel as string[],
      status: value as 'active' | 'block',
    })
    const user = selectionModel.filter((item) => item === userData.id)
    if (user?.length && value === 'block') {
      logoutHandler()
    }
  }

  const buttonOptions: ButtonOptions[] = [
    {
      id: 1,
      title: 'Block user/users',
      value: 'block',
      icon: <PersonOffIcon />,
      onClick: changeStatusHandler,
    },
    {
      id: 2,
      title: 'Unblock user/users',
      value: 'active',
      icon: <PersonAddIcon />,
      onClick: changeStatusHandler,
    },
  ]

  if (!isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <Container fixed sx={{ maxWidth: 'xl' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'raw',
          justifyContent: 'flexEnd',
        }}
      >
        <Tooltip title="Log out">
          <IconButton onClick={logoutHandler}>
            <LogoutIcon fontSize="large" sx={{ color: amber[500] }} />
          </IconButton>
        </Tooltip>
      </Box>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'raw',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <Tooltip title="Delete user/users">
              <IconButton onClick={deleteUsersHandler}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            {buttonOptions.map(({ id, title, value, icon, onClick }) => {
              return (
                <Tooltip title={title} key={id}>
                  <IconButton onClick={() => onClick(value)}>{icon}</IconButton>
                </Tooltip>
              )
            })}
          </Box>
          <div className={styles.container}>
            {usersData != null && (
              <DataGrid
                rows={usersData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {
                  setSelectionModel(newSelectionModel)
                }}
                selectionModel={selectionModel}
              />
            )}
          </div>
        </>
      )}
    </Container>
  )
}

export default UserPage
