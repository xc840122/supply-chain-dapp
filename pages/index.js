import React, { useContext, useState, useEffect } from 'react'
import {
  Table,
  Form,
  Services,
  Profile,
  GetShipment,
  CompleteShipment,
  StartShipment,
} from '@/Components/index';
import { TrackingContext } from '@/Context/TrackingContext';

export default function index() {
  const {
    currentAccount,
    createShipment,
    getAllShipments,
    getShipment,
    completeShipment,
    startShipment,
    getShipmentCount,
  } = useContext(TrackingContext);

  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModel, setStartModel] = useState(false);
  const [completeModel, setCompleteModel] = useState(false);
  const [getModel, setGetModel] = useState(false);
  // Data state
  const [allShipments, setAllShipments] = useState();

  // useEffect(() => {
  //   const getCampaignData = getAllShipments();

  //   return async () => {
  //     const allData = await getCampaignData;
  //     setAllShipments(allData);
  //   };
  // }, []);

  useEffect(() => {
    const fetchShipments = async () => {
      const allData = await getAllShipments();
      setAllShipments(allData || []);
    };

    fetchShipments();

  }, []);


  return (
    <>
      <Services
        setOpenProfile={setOpenProfile}
        setStartModel={setStartModel}
        setCompleteModel={setCompleteModel}
        setGetModel={setGetModel}
      />
      <Table
        setCreateShipmentModel={setCreateShipmentModel}
        allShipments={allShipments}
      />
      <Form
        createShipmentModel={createShipmentModel}
        setCreateShipmentModel={setCreateShipmentModel}
        createShipment={createShipment}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentAccount={currentAccount}
        getShipmentCount={getShipmentCount}
      />
      <CompleteShipment
        completeModel={completeModel}
        setCompleteModel={setCompleteModel}
        completeShipment={completeShipment}
      />
      <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />
      <StartShipment
        startModel={startModel}
        setStartModel={setStartModel}
        startShipment={startShipment}
      />
    </>
  )
}
