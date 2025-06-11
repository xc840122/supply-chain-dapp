import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
// Internal imports
import tracking from '../Context/Tracking.json';
const ContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const ContactABI = tracking.abi;

// fetching smart contract
const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(ContractAddress, ContactABI, signerOrProvider);
};

export const TrackingContext = React.createContext();
export const TrackingProvider = ({ children }) => {
  // State variables
  const DappName = 'Tracking DApp';
  const [currentAccount, setCurrentAccount] = useState('');

  const createShipment = async (items) => {
    console.log('Creating shipment with items:', items);
    const { receiver, pickupTime, distance, price } = items;

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        {
          value: ethers.utils.parseUnits(price, 18),
        }
      );
      await createItem.wait();
      console.log('Shipment created successfully:', createItem);
    } catch (error) {
      console.error('Error creating shipment:', error);
    }
  };

  const getAllShipments = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      // const web3Modal = new Web3Modal();
      // const connection = await web3Modal.connect();
      // const provider = new ethers.providers.Web3Provider(connection);
      // const contract = fetchContract(provider);

      const shipments = await contract.getAllShipments();
      console.log('Shipments fetched successfully:', shipments);
      const allShipments = shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        deliveryTime: shipment.deliveryTime.toNumber(),
        distance: shipment.distance.toNumber(),
        isPaid: shipment.isPaid,
        status: shipment.status,
      }));
      console.log('All shipments fetched:', allShipments);
      return allShipments;
    }
    catch (error) {
      console.error('Error fetching all shipments:', error);
    }
  };

  const getShipmentCount = async () => {
    try {
      if (!window.ethereum) {
        console.error('Ethereum object not found. Please install MetaMask.');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipmentCount = await contract.getShipmentCount(accounts[0]);
      return shipmentCount.toNumber();
    } catch (error) {
      console.error('Error fetching shipment count:', error);
    }
  }

  const completeShipment = async (completeShip) => {
    console.log('Completing shipment:', completeShip);
    const { receiver, index } = completeShip;

    try {
      if (!window.ethereum) {
        console.error('Ethereum object not found. Please install MetaMask.');
        return;
      }
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        {
          gasLimit: 300000, // Adjust gas limit as needed
        }
      );
      await transaction.wait();
      console.log('Shipment completed successfully:', transaction);
    } catch (error) {
      console.error('Error completing shipment:', error);
    }
  };

  const getShipment = async (index) => {
    console.log('Fetching shipment at index:', index * 1);
    try {
      if (!window.ethereum) {
        console.error('Ethereum object not found. Please install MetaMask.');
        return;
      }
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipment = await contract.getShipment(accounts[0], index * 1);
      const formattedShipment = {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: shipment[2].toNumber(),
        deliveryTime: shipment[3].toNumber(),
        distance: shipment[4].toNumber(),
        price: ethers.utils.formatEther(shipment[5].toString()),
        status: shipment[6],
        isPaid: shipment[7],
      };
      console.log('Shipment fetched successfully:', formattedShipment);
      return formattedShipment;
    } catch (error) {
      console.error('Error fetching shipment:', error);
    }
  };

  const startShipment = async (startShip) => {
    console.log('Starting shipment:', startShip);
    const { receiver, index } = startShip;

    try {
      if (!window.ethereum) {
        console.error('Ethereum object not found. Please install MetaMask.');
        return;
      }
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1,
      );
      await transaction.wait();
      console.log('Shipment started successfully:', transaction);
    } catch (error) {
      console.error('Error starting shipment:', error);
    }
  }

  // Check wollet connection
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        console.error('Ethereum object not found. Please install MetaMask.');
        return;
      }
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log('Wallet is connected:', accounts[0]);
      } else {
        console.log('No accounts found. Please connect your wallet.');
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  // Connect to the blockchain
  // const connectWallet = async () => {
  //   try {
  //     setIsLoading(true);
  //     const web3Modal = new Web3Modal();
  //     const connection = await web3Modal.connect();
  //     const provider = new ethers.providers.Web3Provider(connection);
  //     const signer = provider.getSigner();
  //     setContract(fetchContract(signer));
  //     const account = await signer.getAddress();
  //     setCurrentAccount(account);
  //   } catch (error) {
  //     console.error('Failed to connect wallet:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Connect wallet function
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        console.error('Ethereum object not found. Please install MetaMask.');
        return;
      }
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  // Get balance function
  const getBalance = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      return ethers.utils.formatEther(balance); // 返回 ETH 单位字符串
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  };



  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipments,
        getShipmentCount,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentCount,
        DappName,
        currentAccount,
        getBalance,
      }}>
      {children}
    </TrackingContext.Provider>
  );
};