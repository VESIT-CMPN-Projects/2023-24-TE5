import React, { useEffect, useState } from 'react'
import { Typography, Card, Button } from '@material-tailwind/react';
import PatientListComponent from './patientListComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';


function ManageUserPatient() {

  const [patientList, setPatientList] = useState(null);

  const navigate = useNavigate();
  const date = new Date();

  const handleItemClick = (id) => {
    console.log(id);
    navigate(`/user/patient-info/${id}`);
  }

  const { token } = useAuth();

  useEffect(() => {
    const getPatientList = async () => {
      const axiosConfig = {
        headers: {
          'authorization': `Bearer ${token}`
        }
      };

      try {
        const response = await axios.get("http://localhost:8080/user/manage-patients", axiosConfig);
        setPatientList(response.data.patients);
      }
      catch (error) {
        console.log(error)
      }
    }
    getPatientList();
  }, [])


  return (
    <>
      <Card className="h-[98vh] w-full p-8 shadow-xl shadow-blue-gray-900/5 overflow-y-auto scroll-auto">
        <Typography variant="h3" className="text-center" color="blue-gray">
          Patient List
        </Typography>
        <div>
          <Typography variant="h5" className="text-right" color="blue-gray">
            No of Patients Created
          </Typography>
          <Typography variant="h6" className="text-right" color="blue-gray font-normal">
            {patientList == null ? 0 : patientList.length}
          </Typography>
        </div>
        <hr class="my-4 border-t border-gray-400" />

        {patientList &&
          patientList.map((item) => (
            <PatientListComponent {...item} handleItemClick={handleItemClick} />
          ))
        }
      </Card>
    </>
  )
}

export default ManageUserPatient;